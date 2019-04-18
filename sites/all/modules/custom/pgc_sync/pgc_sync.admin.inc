<?php

/**
 * Displays a list of all nodes, sorted by the changed date descending
 */
function pgc_sync_node_select_form($form, &$form_state) {
  $result = db_select('node', 'n')
    ->fields('n')
    ->condition('type', 'contact', '!=')
    ->condition('type', 'newsletter_article', '!=')
    ->condition('type', 'webform', '!=')
    ->orderBy('changed', 'DESC')
    ->execute();

  $nodes = array();
  while($record = $result->fetchAssoc()) {
    // Make sure the changes are changes we can sync
    $node = node_load($record['nid']);
    $revisions = node_revision_list($node);
    $sync_fields = pgc_sync_get_sync_fields($node->type);
    if(count($revisions) == 1) {
      $node->sync_status = 'new';
      $nodes[] = $node;
    }
    else if(count($sync_fields)) {
      $keys = array_keys($revisions);
      if(isset($keys[1])) {
        $form['#tree'] = true;
        $changed_fields = pgc_sync_get_changed_fields($node->nid);
        if(count($changed_fields)) {
          $node->sync_status = 'updated';
          $nodes[] = $node;
        }
      }
    }
  }

  if(count($nodes)) {
    $form['info'] = array(
      '#markup' => 'Select the content you wish to sync.
      On the next page, you will select which fields should be considered during sync and override detection.<br />',
    );
    $form['#tree'] = true;

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => 'Please enter your name for the sync log:',
      '#required' => true,
    );

    $form['nodes'] = array(
      '#theme' => 'pgc_sync_updated_nodes_table',
    );

    foreach($nodes as $node) {
      $form['nodes'][$node->nid]['sync'] = array(
        '#type' => 'radio',
        '#attributes' => array('name' => array('nid')),
        '#return_value' => $node->nid,
      );
      $form['nodes'][$node->nid]['title'] = array(
        '#markup' => l($node->title, 'node/'.$node->nid, array('attributes' => array('target' => '_blank'))),
      );
      $form['nodes'][$node->nid]['type'] = array(
        '#markup' => $node->type,
      );
      $form['nodes'][$node->nid]['sync_status'] = array(
        '#markup' => $node->sync_status,
      );
      $form['nodes'][$node->nid]['updated'] = array(
        '#markup' => format_date($node->changed, 'medium'),
      );
    }
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Next',
    );
  } else {
    drupal_set_message("No content has been changed since last sync.
    If you want to sync a node which does not appear on this page, visit the node and re-save it.");
  }

  return $form;
}

function pgc_sync_node_select_form_submit($form, $form_state) {
  if(isset($form_state['input']['nid'])) {
    $sync_nid = $form_state['input']['nid'];
    $name = $form_state['input']['name'];
    $_SESSION['sync_name'] = $name;
    $_SESSION['sync_nid'] = $sync_nid;
    // Updated node, go to site selection form
    drupal_goto('admin/pgc-sync/nodes/sites');
  } else {
    drupal_set_message('No content was selected to sync.', 'error');
    $form_state['redirect'] = FALSE;
  }
}

function pgc_sync_node_sites_form($form, $form_state) {
  $domains = pgc_sync_get_domains();
  $domains = array_keys($domains);
  $node = node_load($_SESSION['sync_nid']);
  $form['title'] = array(
    '#markup' => '<strong>Node title:</strong> '.$node->title.'<br />',
  );

  $form['sites'] = array(
    '#type' => 'checkboxes',
    '#title' => 'Synchronize sites',
    '#required' => true,
    '#description' => 'Choose the sites you wish to sync to.',
    '#options' => drupal_map_assoc($domains),
    '#default_value' => $domains,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Choose fields >',
  );

  return $form;
}

function pgc_sync_node_sites_form_submit($form, $form_state) {
  $sites = array();
  $domains = pgc_sync_get_domains();
  foreach($form_state['input']['sites'] as $key=>$val) {
    if($key == $val) {
      $sites[$key] = $domains[$key];
    }
  }
  $sync_nid = $_SESSION['sync_nid'];
  $sync_name = $_SESSION['sync_name'];
  $node = node_load($sync_nid);
  $revisions = node_revision_list($node);
  // New node, go directly to import
  if(count($revisions) == 1) {
    $sync_result = pgc_sync_execute_sync($sync_nid, $node, $sites);
    $sync_id = pgc_sync_log_sync($sync_nid, $sync_result, $sync_name);
    pgc_sync_create_revision($sync_nid);
    drupal_goto('admin/pgc-sync/log/nodes/'.$sync_id);
  }
  // Updated node, go to field selection form
  else {
    $_SESSION['sync_sites'] = $sites;
    drupal_goto('admin/pgc-sync/nodes/fields/'.$_SESSION['sync_nid']);
  }
}

function pgc_sync_node_fields_form($form, $form_state, $nid) {
  $node = node_load($nid);
  $sync_fields = pgc_sync_get_sync_fields($node->type);
  if(count($sync_fields)) {
    $form['#tree'] = true;
    $changed_fields = pgc_sync_get_changed_fields($node->nid);
    if(count($changed_fields)) {

      $form['title'] = array(
        '#markup' => '<strong>Node title:</strong> '.$node->title.'<br />',
      );

      $form['nid'] = array(
        '#type' => 'hidden',
        '#value' => $nid,
      );

      $form['fields'] = array(
        '#type' => 'checkboxes',
        '#title' => 'Synchronize fields',
        '#required' => true,
        '#description' => 'Choose the fields you wish to sync. If you exclude a changed field, you run sync again and select it, then force the changes to it on a site-by-site basis.',
        '#options' => drupal_map_assoc($changed_fields),
        '#default_value' => $changed_fields,
      );

      $form['submit'] = array(
        '#type' => 'submit',
        '#value' => 'Begin Sync',
      );

      return $form;

    } else {
      drupal_set_message('No syncable fields have been changed.', 'error');
    }
  }
  else {
    drupal_set_message('No fields are configured for synchronization on this content type', 'error');
  }
}

function pgc_sync_node_fields_form_submit($form, $form_state) {
  $nid = $form_state['input']['nid'];
  $sync_fields = array();
  // We need to track fields which were changed but not synced on this run
  // This way we can push their original version into the second most recent
  // revision, preserving the revision history.
  $changed_fields = pgc_sync_get_changed_fields($nid);
  $changed_unsynced = array();
  foreach($form_state['input']['fields'] as $field => $val) {
    if($field == $val)
      $sync_fields[] = $field;
    elseif(in_array($field, $changed_fields))
      $changed_unsynced[] = $field;
  }

  $sync_data = pgc_sync_build_sync_data($nid, $sync_fields);
  
  // #PGCS-264 - replacing current process with batch process in order to work it for a larger number of sites //
  /*  
  $sync_result = pgc_sync_execute_sync($nid, $sync_data, $_SESSION['sync_sites']);
  $sync_id = pgc_sync_log_sync($nid, $sync_result, $_SESSION['sync_name']);
  pgc_sync_create_revision($nid, $changed_unsynced);
  drupal_goto('admin/pgc-sync/log/nodes/'.$sync_id);
   */
  $_SESSION['changed_unsynced'] = $changed_unsynced;
  batch_set(pgc_sync_node_batch($form, $form_state, $sync_data)); 
  batch_process('admin/pgc-sync/log/nodes/redirect/'.$nid);
  
  // #PGCS-264 - Ends Here //
}

//#PGCS-264 - Starts
function pgc_sync_node_log_redirect($nid){
  if(isset($_SESSION['sync_results']) && $_SESSION['sync_results']!=''){
    $sync_id = pgc_sync_log_sync($nid, $_SESSION['sync_results'], $_SESSION['sync_name']);
	if(isset($_SESSION['changed_unsynced']) && $_SESSION['changed_unsynced']!=''){
	  pgc_sync_create_revision($nid, $_SESSION['changed_unsynced']);
	  unset($_SESSION['sync_results']);	
	  unset($_SESSION['changed_unsynced']);	
	  drupal_goto('admin/pgc-sync/log/nodes/'.$sync_id); 
	}else{
	  drupal_set_message('The was a problem with synchronization!', 'error');
	  drupal_goto('admin/pgc-sync');
	}    
  }else{
  	drupal_set_message('The was a problem with synchronization!', 'error');
	drupal_goto('admin/pgc-sync');
  }
}

// #PGCS-264 - Ends

function theme_pgc_sync_updated_nodes_table($vars) {
  $element = $vars['element'];
  $rows = array();
  $header = array(
    'sync' => t('Sync'),
    'title' => t('Title'),
    'type' => t('Type'),
    'sync_status' => t('Status'),
    'updated' => t('Updated')
  );
  foreach (element_children($element) as $key) {
    $row = array();
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
    }
    $rows[] = $row;
  }
  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'nodes'),
  ));
}

function pgc_sync_node_log($sync_id) {
  $result = db_select('pgc_node_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();

  $result = db_select('pgc_node_sync_items', 'n')
    ->fields('n')
    ->condition('sync_id', $sync_id, '=')
    ->execute();
  $sync_items = array();
  while($sync_item = $result->fetchAssoc()) {
    foreach($sync_item as $key => $val) {
      $sync_items[$sync_item['site_name']][$sync_item['field']][$key] = $val;
    }
  }
  $node = node_load($sync_info['nid']);
  $sync_info['uuid'] = $node->uuid;
  $revisions = node_revision_list($node);
  if(count($revisions) > 1) {
    $keys = array_keys($revisions);
    $sync_info['old_vid'] = $keys[1];
  }

  drupal_add_css(drupal_get_path('module', 'pgc_sync').'/css/pgc-sync-node-log.css');
  return theme('pgc_sync_node_log', array('sync_info' => $sync_info, 'sync_items' => $sync_items));
}

function pgc_sync_node_log_archive() {
  $result = db_select('pgc_node_sync', 'n')
    ->fields('n')
    ->orderBy('timestamp', 'DESC')
    ->execute();

  $header = array(
    array('data' => 'Title'),
    array('data' => 'Type'),
    array('data' => 'Syncer'),
    array('data' => 'Date'),
    array('data' => 'Status')
  );

  $records = array();
  while($sync_info = $result->fetchAssoc()) {
    $records[] = array(
      array('data' => l($sync_info['title'], 'admin/pgc-sync/log/nodes/'.$sync_info['id'])),
      array('data' => $sync_info['type']),
      array('data' => $sync_info['name']),
      array('data' => format_date($sync_info['timestamp'], 'medium')),
      array('data' => pgc_sync_get_status_string($sync_info['status'])),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $records));
}

function pgc_sync_load_sync_record($sync_id) {
  $result = db_select('pgc_node_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();
  return $sync_info;
}

function pgc_sync_force_skip_fields_form($form, $form_state, $sync_id, $site_name) {
  $sync_info = pgc_sync_load_sync_record($sync_id);
  $result = db_select('pgc_node_sync_items', 'n')
    ->fields('n')
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site_name, '=')
    ->condition('status', 2, '=')
    ->execute();

  $form['title'] = array(
    '#markup' => '<strong>Select fields to skip and force update</strong><br /><br />',
  );

  $form['fields']['force'] = array(
    '#prefix' => '<div style="float:left;margin-right:10px;"><strong>Force fields:</strong>',
    '#suffix' => '</div>',
  );
  $form['fields']['skip'] = array(
    '#prefix' => '<div style="float:left;"><strong>Skip fields:</strong>',
    '#suffix' => '</div><div style="clear:both;"></div>',
  );

  while($sync_item = $result->fetchAssoc()) {
    $form['fields']['force'][$sync_item['field']] = array(
      '#type' => 'checkbox',
      '#title' => $sync_item['field'],
    );
    $form['fields']['skip'][$sync_item['field']] = array(
      '#type' => 'checkbox',
      '#title' => $sync_item['field'],
    );
  }

  if(isset($form['fields'])) {
    $form['#tree'] = true;

    $form['sync_id'] = array(
      '#type' => 'hidden',
      '#value' => $sync_id,
    );

    $form['vid'] = array(
      '#type' => 'hidden',
      '#value' => $sync_info['vid'],
    );

    $form['nid'] = array(
      '#type' => 'hidden',
      '#value' => $sync_info['nid'],
    );

    $form['site_name'] = array(
      '#type' => 'hidden',
      '#value' => $site_name,
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Update',
    );
    drupal_add_js(drupal_get_path('module', 'pgc_sync').'/js/pgc-sync-force-skip.js');
  } else {
    drupal_set_message('No unsynced fields available to force.', 'error');
  }

  return $form;
}


function pgc_sync_force_skip_fields_form_validate($form, $form_state) {
  $force_fields = array();
  $skip_fields = array();
  foreach($form_state['input']['fields']['force'] as $field_name => $val) {
    if($val)
      $force_fields[] = $field_name;
  }
  foreach($form_state['input']['fields']['skip'] as $field_name => $val) {
    if($val)
      $skip_fields[] = $field_name;
  }
  if(!count($force_fields) && !count($skip_fields)) {
    form_set_error('fields', 'Please select at least one field to force or skip.');
  }
}

function pgc_sync_force_skip_fields_form_submit($form, $form_state) {
  $force_fields = array();
  $sync_id = $form_state['input']['sync_id'];
  $site_name = $form_state['input']['site_name'];
  $vid = $form_state['input']['vid'];
  $nid = $form_state['input']['nid'];
  $rev = node_load($nid, $vid, true);
  $node = node_load($nid);
  $uuid = $node->uuid;

  foreach($form_state['input']['fields']['skip'] as $field_name => $val) {
    if($val) {
      db_update('pgc_node_sync_items') // Table name no longer needs {}
        ->fields(array(
          'status' => PGC_SYNC_SKIPPED
        ))
        ->condition('sync_id', $sync_id, '=')
        ->condition('field', $field_name, '=')
        ->condition('site_name', $site_name, '=')
        ->execute();
    }
  }

  foreach($form_state['input']['fields']['force'] as $field_name => $val) {
    if($val) {
      if($field_name == 'title')
        $force_fields[$field_name] = $rev->{$field_name};
      else if($field_name == 'status')
        $force_fields[$field_name] = $rev->{$field_name};
      else if($field_name == 'summary')
        $force_fields[$field_name] = $rev->body[LANGUAGE_NONE][0]['summary'];
      else
        $force_fields[$field_name] = $rev->{$field_name}[LANGUAGE_NONE][0]['value'];
    }
  }

  $sync_data = array();
  $sync_data['force'] = true;
  $sync_data['uuid'] = $uuid;
  $sync_data['fields'] = $force_fields;

  $result = pgc_sync_execute_sync($nid, $sync_data, $site_name);
  if($result[$site_name]->status == 'success') {
    foreach($force_fields as $field_name => $val) {
      db_update('pgc_node_sync_items') // Table name no longer needs {}
        ->fields(array(
          'status' => PGC_SYNC_FORCED
        ))
        ->condition('sync_id', $sync_id, '=')
        ->condition('field', $field_name, '=')
        ->condition('site_name', $site_name, '=')
        ->execute();
    }
    $result = db_select('pgc_node_sync_items', 'p')
      ->fields('p')
      ->condition('p.sync_id', $sync_id, '=')
      ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
      ->execute();
    $need_review = $result->rowCount();

    if($need_review === 0) {
      db_update('pgc_node_sync') // Table name no longer needs {}
        ->fields(array(
          'status' => PGC_SYNC_COMPLETED
        ))
        ->condition('id', $sync_id, '=')
        ->execute();
    }

    drupal_set_message('Fields successfully forced/skipped.');
    drupal_goto('admin/pgc-sync/log/nodes/'.$sync_id);
  } else {
    drupal_set_message('Problem connecting to site. Please try again or ensure configuration is correct.', 'error');
  }
}

function pgc_sync_mark_log_complete($sync_id, $site_name) {
  db_update('pgc_node_sync_items') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_COMPLETED
    ))
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site_name, '=')
    ->condition('status', PGC_SYNC_NEEDS_REVIEW, '=')
    ->execute();
	
  // #PGCS-264 - Starts here
  /*
  db_update('pgc_node_sync') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_COMPLETED
    ))
    ->condition('id', $sync_id, '=')
    ->execute();
  */
  // Adding this code here to resolve an issue which was causing all site's status to "complete" when "Mark as complete was clicked for any site" //
  $result = db_select('pgc_node_sync_items', 'pnsi') // Table name no longer needs {}
      ->fields('pnsi', array('sync_id'))
      ->condition('sync_id', $sync_id, '=')
      ->condition('status', PGC_SYNC_NEEDS_REVIEW, '=')
      ->execute();
  
  $num_of_results = $result->rowCount();
  if($num_of_results===0){
    db_update('pgc_node_sync') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_COMPLETED
      ))
      ->condition('id', $sync_id, '=')
      ->execute();	
  }
  // #PGCS-264 - Ends Here
  
  
  drupal_set_message('Log item completed.');
  drupal_goto('admin/pgc-sync/log/nodes/'.$sync_id);
}

/**
 * Displays a list of all new menu items, sorted by the changed date ascending
 */
function pgc_sync_menu_select_form($form, &$form_state) {
  $result = db_select('pgc_sync_menu_log', 'm')
    ->fields('m')
    ->condition('status', '0', '=')
    ->orderBy('timestamp', 'ASC')
    ->execute();

  $menu_items = array();
  while($record = $result->fetchAssoc()) {
    $menu_items[] = $record;
  }

  if(count($menu_items)) {
    $form['info'] = array(
      '#markup' => 'Select the menu item you wish to sync.
      If you have any dependent items, they must be synced in the order of hierarchy.<br />',
    );
    $form['#tree'] = true;

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => 'Please enter your name for the sync log:',
      '#required' => true,
    );

    $form['menu_items'] = array(
      '#theme' => 'pgc_sync_menu_items_table',
    );

    foreach($menu_items as $menu_item) {
      $form['menu_items'][$menu_item['mlid']]['sync'] = array(
        '#type' => 'radio',
        '#attributes' => array('name' => array('mlid')),
        '#return_value' => $menu_item['mlid'],
      );
      $form['menu_items'][$menu_item['mlid']]['title'] = array(
        '#markup' => $menu_item['title']
      );
      $form['menu_items'][$menu_item['mlid']]['status'] = array(
        '#markup' => 'New',
      );
      $form['menu_items'][$menu_item['mlid']]['timestamp'] = array(
        '#markup' => format_date($menu_item['timestamp'], 'medium'),
      );
    }
    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Next',
    );
  } else {
    drupal_set_message("No content has been changed since last sync.
    If you want to sync a node which does not appear on this page, visit the node and re-save it.");
  }

  return $form;
}

function pgc_sync_menu_select_form_submit($form, $form_state) {
  if(isset($form_state['input']['mlid'])) {
    $sync_mlid = $form_state['input']['mlid'];
    $name = $form_state['input']['name'];
    $_SESSION['sync_mlid'] = $sync_mlid;
    $_SESSION['sync_name'] = $name;
    // Go to site selection form
    drupal_goto('admin/pgc-sync/menu/sites');
  } else {
    drupal_set_message('No menu item was selected to sync.', 'error');
    $form_state['redirect'] = FALSE;
  }
}

function theme_pgc_sync_menu_items_table($vars) {
  $element = $vars['element'];
  $rows = array();
  $header = array(
    'sync' => t('Sync'),
    'title' => t('Title'),
    'status' => t('Status'),
    'timestamp' => t('Created')
  );
  foreach (element_children($element) as $key) {
    $row = array();
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
    }
    $rows[] = $row;
  }
  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'menu_items'),
  ));
}

function pgc_sync_menu_sites_form($form, $form_state) {
  $domains = pgc_sync_get_domains();
  $domains = array_keys($domains);
  $menu_item = menu_link_load($_SESSION['sync_mlid']);

  $form['title'] = array(
    '#markup' => '<strong>Menu item title:</strong> '.$menu_item['link_title'].'<br />',
  );

  $form['sites'] = array(
    '#type' => 'checkboxes',
    '#title' => 'Synchronize sites',
    '#required' => true,
    '#description' => 'Choose the sites you wish to sync to.',
    '#options' => drupal_map_assoc($domains),
    '#default_value' => $domains,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Sync >',
  );

  return $form;
}

function pgc_sync_menu_sites_form_submit($form, $form_state) {
  $sites = array();
  $domains = pgc_sync_get_domains();
  foreach($form_state['input']['sites'] as $key=>$val) {
    if($key == $val) {
      $sites[$key] = $domains[$key];
    }
  }
  $sync_mlid = $_SESSION['sync_mlid'];
  $sync_name = $_SESSION['sync_name'];

  $result = db_select('pgc_sync_menu_log', 'm')
    ->fields('m')
    ->condition('mlid', $sync_mlid, '=')
    ->execute();

  while($record = $result->fetchAssoc()) {
    $sync = new stdClass;
    $sync->uuid = $record['uuid'];
    $sync->parent_uuid = $record['parent'];
    $sync->title = $record['title'];
    $sync->weight = $record['weight'];
  }

  if(isset($sync)) {
    $sync_results = pgc_sync_execute_menu_sync($sync, $sites);
    $sync_id = pgc_sync_menu_sync_log($sync_mlid, $sync_name, $sync_results);
    drupal_goto('admin/pgc-sync/log/menu/'.$sync_id);
  } else {
    drupal_set_message('Sync record not found.', 'error');
  }
}

function pgc_sync_menu_log_archive() {
  $result = db_select('pgc_menu_sync', 'n')
    ->fields('n')
    ->orderBy('timestamp', 'DESC')
    ->execute();

  $header = array(
    array('data' => 'Title'),
    array('data' => 'Syncer'),
    array('data' => 'Date'),
    array('data' => 'Status')
  );

  $records = array();
  while($sync_info = $result->fetchAssoc()) {
    $records[] = array(
      array('data' => l($sync_info['title'], 'admin/pgc-sync/log/menu/'.$sync_info['id'])),
      array('data' => $sync_info['name']),
      array('data' => format_date($sync_info['timestamp'], 'medium')),
      array('data' => pgc_sync_get_status_string($sync_info['status'])),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $records));
}

function pgc_sync_menu_log($sync_id) {
  $result = db_select('pgc_menu_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();

  $result = db_select('pgc_menu_sync_items', 'n')
    ->fields('n')
    ->condition('sync_id', $sync_id, '=')
    ->execute();
  $sync_items = array();
  while($sync_item = $result->fetchAssoc()) {
    foreach($sync_item as $key => $val) {
      $sync_items[$sync_item['site_name']][$key] = $val;
    }
  }
  $menu_item = menu_link_load(($sync_info['mlid']));
  drupal_add_css(drupal_get_path('module', 'pgc_sync').'/css/pgc-sync-menu-log.css');
  return theme('pgc_sync_menu_log', array('sync_info' => $sync_info, 'sync_items' => $sync_items));
}

/**
 * Form to sync a variable
 */
function pgc_sync_global_variables_form($form, &$form_state) {
  $variables = variable_get('pgc_variables', '');

  if(strlen($variables)) {
    $variables = unserialize($variables);
    $form['info'] = array(
      '#markup' => 'Select the variable you wish to sync.',
    );
    $form['#tree'] = true;

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => 'Please enter your name for the sync log:',
      '#required' => true,

    );

    $form['variables'] = array(
      '#theme' => 'pgc_sync_variables_table',
    );

    foreach($variables as $key => $variable) {
      $form['variables'][$variable['name']]['sync'] = array(
        '#type' => 'radio',
        '#attributes' => array('name' => array('sync_variable')),
        '#return_value' => $variable['name'],
      );
      $form['variables'][$variable['name']]['variable'] = array(
        '#markup' => $variable['name'],
      );
      $form['variables'][$variable['name']]['value'] = array(
        '#markup' => $variable['value'],
      );
    }

    $form['prev_value'] = array(
      '#type' => 'textfield',
      '#title' => 'Previous value',
      '#description' => 'If you wish to compare the previous value of this variable against the client\'s version, enter
      it here. If no value is provided, the variable will be forced for all sites.',
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Next',
    );
  } else {
    drupal_set_message("No variables were found.");
  }

  return $form;
}

function pgc_sync_global_variables_form_submit($form, $form_state) {
  if(isset($form_state['input']['sync_variable'])) {
    $sync_variable = $form_state['input']['sync_variable'];
    $name = $form_state['input']['name'];
    $_SESSION['sync_name'] = $name;
    $_SESSION['sync_variable'] = $sync_variable;
    if(isset($form_state['input']['prev_value']))
      $_SESSION['sync_prev_value'] = $form_state['input']['prev_value'];

    // Go to site selection form
    drupal_goto('admin/pgc-sync/global-variables/sites');
  } else {
    drupal_set_message('No content was selected to sync.', 'error');
    $form_state['redirect'] = FALSE;
  }
}

function pgc_sync_global_variables_sites_form($form, $form_state) {
  $domains = pgc_sync_get_domains();
  $domains = array_keys($domains);
  $variable = $_SESSION['sync_variable'];
  $form['title'] = array(
    '#markup' => '<strong>Variable title:</strong> '.$variable.'<br />',
  );

  $form['sites'] = array(
    '#type' => 'checkboxes',
    '#title' => 'Synchronize sites',
    '#required' => true,
    '#description' => 'Choose the sites you wish to sync to.',
    '#options' => drupal_map_assoc($domains),
    '#default_value' => $domains,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Sync',
  );

  return $form;
}

function pgc_sync_global_variables_sites_form_submit($form, $form_state) {
  $sites = array();
  $domains = pgc_sync_get_domains();
  foreach($form_state['input']['sites'] as $key=>$val) {
    if($key == $val) {
      $sites[$key] = $domains[$key];
    }
  }
  $sync_variable = $_SESSION['sync_variable'];
  $sync_name = $_SESSION['sync_name'];
  $prev_value = isset($_SESSION['sync_prev_value']) ? $_SESSION['sync_prev_value'] : '';

  $variables = variable_get('pgc_variables');
  $variables = unserialize($variables);
  foreach($variables as $variable) {
    if($variable['name'] == $sync_variable) {
      $sync_variable_value = $variable['value'];
      break;
    }
  }

  $sync_data = new stdClass;
  $sync_data->variable = $sync_variable;
  $sync_data->new_value = $sync_variable_value;
  $sync_data->old_value = $prev_value;
  $sync_result = pgc_sync_execute_variable_sync($sync_data, $sites);
  $sync_id = pgc_sync_log_variable_sync($sync_variable, $sync_variable_value, $prev_value, $sync_result, $sync_name);
  drupal_goto('admin/pgc-sync/log/global-variables/'.$sync_id);
}

function theme_pgc_sync_variables_table($vars) {
  $element = $vars['element'];
  $rows = array();
  $header = array(
    'sync' => t('Sync'),
    'variable' => t('Variable'),
    'value' => t('Value'),
  );
  foreach (element_children($element) as $key) {
    $row = array();
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
    }
    $rows[] = $row;
  }
  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'nodes'),
  ));
}

function pgc_sync_global_variables_log($sync_id) {
  $result = db_select('pgc_global_variable_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();

  $result = db_select('pgc_global_variable_sync_items', 'n')
    ->fields('n')
    ->condition('sync_id', $sync_id, '=')
    ->execute();
  $sync_items = array();
  while($sync_item = $result->fetchAssoc()) {
    foreach($sync_item as $key => $val) {
      $sync_items[$sync_item['site_name']][$key] = $val;
    }
  }
  drupal_add_css(drupal_get_path('module', 'pgc_sync').'/css/pgc-sync-global-variables-log.css');
  return theme('pgc_sync_global_variables_log', array('sync_info' => $sync_info, 'sync_items' => $sync_items));
}

function pgc_sync_global_variables_log_archive() {
  $result = db_select('pgc_global_variable_sync', 'n')
    ->fields('n')
    ->orderBy('timestamp', 'DESC')
    ->execute();

  $header = array(
    array('data' => 'Variable'),
    array('data' => 'Value'),
    array('data' => 'Syncer'),
    array('data' => 'Date'),
    array('data' => 'Status')
  );

  $records = array();
  while($sync_info = $result->fetchAssoc()) {
    $records[] = array(
      array('data' => l($sync_info['variable'], 'admin/pgc-sync/log/global-variables/'.$sync_info['id'])),
      array('data' => $sync_info['value']),
      array('data' => $sync_info['name']),
      array('data' => format_date($sync_info['timestamp'], 'medium')),
      array('data' => pgc_sync_get_status_string($sync_info['status'])),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $records));
}

function pgc_sync_global_variables_force($sync_id, $site) {
  $result = db_select('pgc_global_variable_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();


  $sync_variable = $sync_info['variable'];
  $sync_variable_value = $sync_info['value'];
  $sync_name = $sync_info['name'];

  $sync_data = new stdClass;
  $sync_data->variable = $sync_variable;
  $sync_data->new_value = $sync_variable_value;
  $sync_result = pgc_sync_execute_variable_sync($sync_data, $site);

  if($sync_result[$site]->status == 'success') {
    db_update('pgc_global_variable_sync_items') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_FORCED
      ))
      ->condition('sync_id', $sync_id, '=')
      ->condition('site_name', $site, '=')
      ->execute();

    $result = db_select('pgc_global_variable_sync_items', 'p')
      ->fields('p')
      ->condition('p.sync_id', $sync_id, '=')
      ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
      ->execute();
    $need_review = $result->rowCount();

    if($need_review === 0) {
      db_update('pgc_global_variable_sync') // Table name no longer needs {}
        ->fields(array(
          'status' => PGC_SYNC_COMPLETED
        ))
        ->condition('id', $sync_id, '=')
        ->execute();
    }

    drupal_set_message('Variable successfully force updated.');
  } else {
    drupal_set_message('Unable force variable update.');
  }
  drupal_goto('admin/pgc-sync/log/global-variables/'.$sync_id);
}

function pgc_sync_global_variables_skip($sync_id, $site) {
  db_update('pgc_global_variable_sync_items') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_SKIPPED
    ))
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site, '=')
    ->execute();

  $result = db_select('pgc_global_variable_sync_items', 'p')
    ->fields('p')
    ->condition('p.sync_id', $sync_id, '=')
    ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
    ->execute();
  $need_review = $result->rowCount();

  if($need_review === 0) {
    db_update('pgc_global_variable_sync') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_COMPLETED
      ))
      ->condition('id', $sync_id, '=')
      ->execute();
  }

  drupal_set_message('Variable successfully skipped.');
  drupal_goto('admin/pgc-sync/log/global-variables/'.$sync_id);
}

function pgc_sync_global_variables_complete($sync_id, $site) {
  db_update('pgc_global_variable_sync_items') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_COMPLETED
    ))
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site, '=')
    ->execute();

  $result = db_select('pgc_global_variable_sync_items', 'p')
    ->fields('p')
    ->condition('p.sync_id', $sync_id, '=')
    ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
    ->execute();
  $need_review = $result->rowCount();

  if($need_review === 0) {
    db_update('pgc_global_variable_sync') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_COMPLETED
      ))
      ->condition('id', $sync_id, '=')
      ->execute();
  }

  drupal_set_message('Variable successfully skipped.');
  drupal_goto('admin/pgc-sync/log/global-variables/'.$sync_id);
}

/**
 * Form to sync an example variable
 */
function pgc_sync_example_variables_form($form, &$form_state) {
  $result = db_select('pgc_ex_variables', 'n')
    ->fields('n')
    ->orderBy('name')
    ->execute();

  if($result->rowCount() > 0) {
    $form['info'] = array(
      '#markup' => 'Select the variable you wish to sync.',
    );
    $form['#tree'] = true;

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => 'Please enter your name for the sync log:',
      '#required' => true,
      '#value' => isset($form_state['values']['name']) ? $form_state['values']['name'] : '',
    );

    $form['variables'] = array(
      '#theme' => 'pgc_sync_example_variables_table',
    );

    while($variable = $result->fetchAssoc()) {
      $form['variables'][$variable['name']]['sync'] = array(
        '#type' => 'radio',
        '#attributes' => array('name' => array('sync_variable')),
        '#return_value' => $variable['name'],
      );
      $form['variables'][$variable['name']]['variable'] = array(
        '#markup' => $variable['name'],
      );
      $form['variables'][$variable['name']]['value'] = array(
        '#markup' => $variable['value'],
      );
      $form['variables'][$variable['name']]['formula'] = array(
        '#markup' => $variable['formula'],
      );
      $form['variables'][$variable['name']]['decimals'] = array(
        '#markup' => $variable['decimals'],
      );
    }

    $form['previous_note'] = array(
      '#markup' => '<br /><strong>Only one of the following fields will apply. If you are updating a formula, the previous formula will be considered. If you are updating a value, the previous value will be considered.</strong>',
    );

    $form['prev_value'] = array(
      '#type' => 'textfield',
      '#title' => 'Previous value',
      '#description' => 'If you wish to compare the previous value of this variable against the client\'s version, enter
      it here. If no value or formula is provided, the variable will be forced for all sites.',
    );

    $form['prev_formula'] = array(
      '#type' => 'textarea',
      '#title' => 'Previous formula',
      '#description' => 'If you wish to compare the previous formula of this variable against the client\'s version, enter
      it here. If no value or formula is provided, the variable will be forced for all sites.',
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Next',
    );
  } else {
    drupal_set_message("No variables were found.");
  }

  return $form;
}

function pgc_sync_example_variables_form_submit($form, $form_state) {
  if(isset($form_state['input']['sync_variable'])) {
    $sync_variable = $form_state['input']['sync_variable'];
    $name = $form_state['input']['name'];
    $_SESSION['sync_ex_name'] = $name;
    $_SESSION['sync_ex_variable'] = $sync_variable;
    if(isset($form_state['input']['prev_value']))
      $_SESSION['sync_ex_prev_value'] = $form_state['input']['prev_value'];
    if(isset($form_state['input']['prev_formula']))
      $_SESSION['sync_ex_prev_formula'] = $form_state['input']['prev_formula'];

    // Go to site selection form
    drupal_goto('admin/pgc-sync/example-variables/sites');
  } else {
    drupal_set_message('No content was selected to sync.', 'error');
    $form_state['redirect'] = FALSE;
  }
}

function pgc_sync_example_variables_sites_form($form, $form_state) {
  $domains = pgc_sync_get_domains();
  $domains = array_keys($domains);


  if(isset($_SESSION['sync_ex_variable'])) {
    $variable = $_SESSION['sync_ex_variable'];
    $form['title'] = array(
      '#markup' => '<strong>Variable title:</strong> '.$variable.'<br />',
    );

    $form['sites'] = array(
      '#type' => 'checkboxes',
      '#title' => 'Synchronize sites',
      '#required' => true,
      '#description' => 'Choose the sites you wish to sync to.',
      '#options' => drupal_map_assoc($domains),
      '#default_value' => $domains,
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Sync',
    );
  } else {
    drupal_goto('admin/pgc-sync/example-variables');
  }

  return $form;
}

function pgc_sync_example_variables_sites_form_submit($form, $form_state) {
  $sites = array();
  $domains = pgc_sync_get_domains();
  foreach($form_state['input']['sites'] as $key=>$val) {
    if($key == $val) {
      $sites[$key] = $domains[$key];
    }
  }
  $sync_variable = $_SESSION['sync_ex_variable'];
  $sync_name = $_SESSION['sync_ex_name'];
  $prev_value = isset($_SESSION['sync_ex_prev_value']) ? $_SESSION['sync_ex_prev_value'] : '';
  $prev_formula = isset($_SESSION['sync_ex_prev_formula']) ? $_SESSION['sync_ex_prev_formula'] : '';

  $result = db_select('pgc_ex_variables', 'p')
    ->fields('p')
    ->condition('name', $sync_variable, '=')
    ->range(0,1)
    ->execute();
  $variable = $result->fetchAssoc();

  $sync_data = new stdClass;
  $sync_data->variable = $sync_variable;
  if(strlen($variable['formula'])) {
    $sync_data->new_formula = $variable['formula'];
    if(strlen($prev_formula))
      $sync_data->prev_formula = $prev_formula;
  }
  else if(strlen($variable['value'])) {
    $sync_data->new_value = $variable['value'];
    if(strlen($prev_value))
      $sync_data->prev_value = $prev_value;
  }

  $sync_data->decimals = $variable['decimals'];
  $sync_data->weight = $variable['weight'];
  $sync_data->comment = $variable['comment'];

  $sync_result = pgc_sync_execute_ex_variable_sync($sync_data, $sites);
  $sync_id = pgc_sync_log_ex_variable_sync($sync_data, $sync_result, $sync_name);
  unset($_SESSION['sync_ex_prev_value']);
  unset($_SESSION['sync_ex_prev_formula']);
  unset($_SESSION['sync_ex_name']);
  unset($_SESSION['sync_ex_variable']);
  drupal_goto('admin/pgc-sync/log/example-variables/'.$sync_id);
}

function theme_pgc_sync_example_variables_table($vars) {
  $element = $vars['element'];
  $rows = array();
  $header = array(
    'sync' => t('Sync'),
    'variable' => t('Variable'),
    'value' => t('Value'),
    'formula' => t('Formula'),
    'decimals' => t('Decimals'),
  );
  foreach (element_children($element) as $key) {
    $row = array();
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
    }
    $rows[] = $row;
  }
  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'nodes'),
  ));
}

function pgc_sync_example_variables_log($sync_id) {
  $result = db_select('pgc_example_variable_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $sync_info = $result->fetchAssoc();

  $result = db_select('pgc_example_variable_sync_items', 'n')
    ->fields('n')
    ->condition('sync_id', $sync_id, '=')
    ->execute();
  $sync_items = array();
  while($sync_item = $result->fetchAssoc()) {
    foreach($sync_item as $key => $val) {
      $sync_items[$sync_item['site_name']][$key] = $val;
    }
  }
  drupal_add_css(drupal_get_path('module', 'pgc_sync').'/css/pgc-sync-example-variables-log.css');
  return theme('pgc_sync_example_variables_log', array('sync_info' => $sync_info, 'sync_items' => $sync_items));
}

function pgc_sync_example_variables_log_archive() {
  $result = db_select('pgc_example_variable_sync', 'n')
    ->fields('n')
    ->orderBy('timestamp', 'DESC')
    ->execute();

  $header = array(
    array('data' => 'Variable'),
    array('data' => 'Value'),
    array('data' => 'Formula'),
    array('data' => 'Syncer'),
    array('data' => 'Date'),
    array('data' => 'Status')
  );

  $records = array();
  while($sync_info = $result->fetchAssoc()) {
    $records[] = array(
      array('data' => l($sync_info['variable'], 'admin/pgc-sync/log/example-variables/'.$sync_info['id'])),
      array('data' => $sync_info['value']),
      array('data' => $sync_info['formula']),
      array('data' => $sync_info['name']),
      array('data' => format_date($sync_info['timestamp'], 'medium')),
      array('data' => pgc_sync_get_status_string($sync_info['status'])),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $records));
}

function pgc_sync_example_variables_force($sync_id, $site) {
  $result = db_select('pgc_example_variable_sync', 'n')
    ->fields('n')
    ->condition('id', $sync_id, '=')
    ->range(0,1)
    ->execute();
  $variable = $result->fetchAssoc();

  $sync_data = new stdClass;
  $sync_data->variable = $variable['variable'];
  if(strlen($variable['formula'])) {
    $sync_data->new_formula = $variable['formula'];
  }
  else if(strlen($variable['value'])) {
    $sync_data->new_value = $variable['value'];
  }

  $sync_data->decimals = $variable['decimals'];
  $sync_data->weight = $variable['weight'];
  $sync_data->comment = $variable['comment'];

  $sync_result = pgc_sync_execute_ex_variable_sync($sync_data, $site);

  if($sync_result[$site]->status == 'success') {
    db_update('pgc_example_variable_sync_items') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_FORCED
      ))
      ->condition('sync_id', $sync_id, '=')
      ->condition('site_name', $site, '=')
      ->execute();

    $result = db_select('pgc_example_variable_sync_items', 'p')
      ->fields('p')
      ->condition('p.sync_id', $sync_id, '=')
      ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
      ->execute();
    $need_review = $result->rowCount();

    if($need_review === 0) {
      db_update('pgc_example_variable_sync') // Table name no longer needs {}
        ->fields(array(
          'status' => PGC_SYNC_COMPLETED
        ))
        ->condition('id', $sync_id, '=')
        ->execute();
    }

    drupal_set_message('Variable successfully force updated.');
  } else {
    drupal_set_message('Unable force variable update.');
  }
  drupal_goto('admin/pgc-sync/log/example-variables/'.$sync_id);
}

function pgc_sync_example_variables_skip($sync_id, $site) {
  db_update('pgc_example_variable_sync_items') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_SKIPPED
    ))
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site, '=')
    ->execute();

  $result = db_select('pgc_example_variable_sync_items', 'p')
    ->fields('p')
    ->condition('p.sync_id', $sync_id, '=')
    ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
    ->execute();
  $need_review = $result->rowCount();

  if($need_review === 0) {
    db_update('pgc_example_variable_sync') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_COMPLETED
      ))
      ->condition('id', $sync_id, '=')
      ->execute();
  }

  drupal_set_message('Variable successfully skipped.');
  drupal_goto('admin/pgc-sync/log/example-variables/'.$sync_id);
}

function pgc_sync_example_variables_complete($sync_id, $site) {
  db_update('pgc_example_variable_sync_items') // Table name no longer needs {}
    ->fields(array(
      'status' => PGC_SYNC_COMPLETED
    ))
    ->condition('sync_id', $sync_id, '=')
    ->condition('site_name', $site, '=')
    ->execute();

  $result = db_select('pgc_example_variable_sync_items', 'p')
    ->fields('p')
    ->condition('p.sync_id', $sync_id, '=')
    ->condition('p.status', PGC_SYNC_NEEDS_REVIEW, '=')
    ->execute();
  $need_review = $result->rowCount();

  if($need_review === 0) {
    db_update('pgc_example_variable_sync') // Table name no longer needs {}
      ->fields(array(
        'status' => PGC_SYNC_COMPLETED
      ))
      ->condition('id', $sync_id, '=')
      ->execute();
  }

  drupal_set_message('Variable successfully skipped.');
  drupal_goto('admin/pgc-sync/log/example-variables/'.$sync_id);
}