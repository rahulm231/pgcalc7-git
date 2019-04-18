<?php

function pgc_variables_calculated_examples_config_form($form, $form_state){
  drupal_add_css(drupal_get_path('module', 'pgc_variables').'/pgc_variables.examples.css');

  $form['#tree'] = TRUE;

  if(empty($form_state['buckets'])) {
    drupal_set_message("Note: You must press save after editing variable values.
    Variable names may only contain letters, numbers, underscores, and dashes to avoid conflicts
    with other filters.");
    $variables = pgc_variables_load_ex_variables();
    if($variables == null) {
      $buckets = array();
      $buckets['misc'][] = array('name'=>'', 'formula' => '', 'value'=>'', 'comment' => '', 'weight'=>0);
    } else {
      $buckets = pgc_variables_extract_buckets($variables);
      $form_state['buckets'] = $buckets;
    }
  } else {
    $buckets = $form_state['buckets'];
  }

  foreach($buckets as $bucket_name => $bucket) {
    $form[$bucket_name] = array(
      '#title' => $bucket_name,
      '#type' => 'fieldset',
      '#collapsible' => true,
      '#collapsed' => true,
    );

    $form[$bucket_name]['table'] = array(
      '#prefix' => '<div id="table_'.$bucket_name.'">',
      '#suffix' => '</div>',
      '#theme' => 'variable_drag_components',
    );
    
    for ($i = 0; $i < count($bucket); $i++) {
      $form[$bucket_name]['table'][$i]['name'] = array(
        '#type' => 'textfield',
        '#size' => 25,
        '#default_value' => isset($bucket[$i]['name']) ? $bucket[$i]['name'] : '',
      );
      $form[$bucket_name]['table'][$i]['decimals'] = array(
        '#type' => 'textfield',
        '#size' => 2,
        '#default_value' => isset($bucket[$i]['decimals']) ? $bucket[$i]['decimals'] : '',
      );
      if(isset($bucket[$i]['formula'])
        && (strpos($bucket[$i]['formula'], 'GC_PGC') !== false || strpos($bucket[$i]['formula'], 'WS_PGC') !== false)
        && !user_access('administer pgc_variables_ws')) {
        $formula_readonly = array('readonly' => 'readonly');
      } else {
        $formula_readonly = array();
      }
      $form[$bucket_name]['table'][$i]['formula'] = array(
        '#type' => 'textarea',
        '#rows' => 2,
        '#cols' => 60,
        '#attributes' => $formula_readonly,
        '#maxlength' => 1000,
        '#default_value' => isset($bucket[$i]['formula']) ? $bucket[$i]['formula'] : '',
      );
      // Add 'disabled' class to value field if formula is set
      $value_readonly = isset($bucket[$i]['formula']) && strlen($bucket[$i]['formula']) ? array('readonly' => 'readonly') : array();
      $form[$bucket_name]['table'][$i]['value'] = array(
        '#type' => 'textfield',
        '#default_value' => isset($bucket[$i]['value']) ? $bucket[$i]['value'] : '',
        '#attributes' => $value_readonly,
        '#size' => 25,
        '#maxlength' => 1000,
      );
      $form[$bucket_name]['table'][$i]['comment'] = array(
        '#type' => 'textfield',
        '#default_value' => isset($bucket[$i]['comment']) ? $bucket[$i]['comment'] : '',
        '#size' => 40,
        '#maxlength' => 1000,
      );
      $form[$bucket_name]['table'][$i]['delete'] = array(
        '#type' => 'submit',
        '#name' => 'delete_'.$bucket_name.'_'.$i,
        '#value' => t('Delete'),
        '#submit' => array('pgc_variables_examples_add_more_delete_one'),
        '#ajax' => array(
          'callback' => 'pgc_variables_examples_add_more_callback',
          'wrapper' => 'table_'.$bucket_name,
        ),
      );
      $form[$bucket_name]['table'][$i]['weight'] = array(
        '#type' => 'weight',
        '#title' => t('Weight'),
        '#default_value' => isset($bucket[$i]['weight']) ? $bucket[$i]['weight'] : $i,
        '#delta' => 10000,
        '#title_display' => 'invisible',
        '#attributes' => array('class' => array('field-weight')),
      );
    }
    $form[$bucket_name]['add_variable'] = array(
      '#type' => 'submit',
      '#name' => 'add_'.$bucket_name,
      '#value' => t('Add one more'),
      '#submit' => array('pgc_variables_examples_add_more_add_one'),
      '#ajax' => array(
        'callback' => 'pgc_variables_examples_add_more_callback',
        'wrapper' => 'table_'.$bucket_name,
      ),
    );
  }
  $form['submit'] = array(
    '#type' => 'submit',
    '#name' => 'save',
    '#value' => t('Save'),
  );
  return $form;
}

/**
 * Callback for both ajax-enabled buttons.
 *
 * Selects and returns the fieldset with the variables in it.
 */
function pgc_variables_examples_add_more_callback($form, $form_state) {
  $expl = explode('_', $form_state['triggering_element']['#name']);
  $bucket_name = $expl[1];
  return $form[$bucket_name]['table'];
}

/**
 * Submit handler for the "add-one-more" button.
 *
 * Increments the max counter and causes a rebuild.
 */
function pgc_variables_examples_add_more_add_one($form, &$form_state) {
  $variables = array();
  $bucket_name = substr($form_state['triggering_element']['#name'], 4);

  foreach($form_state['input'][$bucket_name]['table'] as $variable) {
    $variables[] = array(
      'name' => $variable['name'],
      'decimals' => $variable['decimals'],
      'value' => $variable['value'],
      'formula' => $variable['formula'],
      'comment' => $variable['comment'],
      'weight' => $variable['weight'],
    );
  }
  usort($variables, "pgc_variables_sort_by_weight");
  $weight = $variables[count($variables)-1]['weight'] + 1;
  $variables[] = array(
    'name' => $bucket_name . '_',
    'decimals' => '',
    'value' => '',
    'formula' => '',
    'comment' => '',
    'weight' => $weight,
  );
  
  $form_state['buckets'][$bucket_name] = $variables;
  $form_state['rebuild'] = TRUE;
}

/**
 * Submit handler for the "delete" button.
 *
 * Deletes a specific variable from the form
 */
function pgc_variables_examples_add_more_delete_one($form, &$form_state) {
  $expl = explode('_', $form_state['triggering_element']['#name']);
  $bucket_name = $expl[1];
  $del_index = $expl[2];
  $variables = array();
  foreach($form_state['input'][$bucket_name]['table'] as $variable) {
    $variables[] = array(
      'name' => $variable['name'],
      'decimals' => $variable['decimals'],
      'value' => $variable['value'],
      'formula' => $variable['formula'],
      'comment' => $variable['comment'],
      'weight' => $variables['weight'],
    );
  }
  unset($variables[$del_index]);
  $form_state['buckets'][$bucket_name] = array_values($variables);
  $form_state['rebuild'] = TRUE;
}

/**
 * Form validator.
 *
 * Calculates all formulas to ensure they return valid responses.
 */
function pgc_variables_calculated_examples_config_form_validate($form, &$form_state) {
  // We don't want to validate every time an AJAX change occurs. When submitting
  // the form
  // - via AJAX: the triggering element will start with 'add_' or // 'delete_'
  // - normally: the triggering element will be 'save'
  // - via drush and drupal_form_submit(): the triggering element will be empty.
  
  $triggering_element = $form_state['triggering_element']['#name'];
  if ($triggering_element == 'save' || empty($triggering_element)) {
    $variables = array();
    $buckets = array();
	// #PGCS-PGCS-790 - Starts
	//foreach ($form_state['values'] as $key => $val) {
	if(!empty($form_state['input']['form_build_id'])){
		$form_state_values = $form_state['input'];
	}else{
		$form_state_values = $form_state['values'];
	}	
    foreach ($form_state_values as $key => $val) {
    // #PGCS-PGCS-790 - Ends
      if (is_array($val) && isset($val['table'])) {
        foreach ($val['table'] as $i => $variable) {
          if (isset($variable['name']) && strlen($variable['name'])) {
            $expl = explode('_', $variable['name']);
            $bucket_name = $expl[0];
            if (in_array($variable['name'], $variables)) {
              form_set_error($bucket_name . '][table][' . $i . '][name',
                'Variable with name <em>' . $variable['name'] . '</em> already exists.
                 Please delete the existing variable or rename the new variable.');
            }
            $variable = array(
              'name' => $variable['name'],
              'decimals' => $variable['decimals'],
              'value' => $variable['value'],
              'formula' => $variable['formula'],
              'comment' => $variable['comment'],
              'weight' => $variable['weight'],
            );

            // We still need to maintain our buckets in case validation fails
            $buckets[$bucket_name][] = $variable;

            if(strlen($variable['formula'])) {
              $formula = $variable['formula'];
              // Check for errors
              if(substr_count($formula, '(') !== substr_count($formula, ')')) {
                form_set_error($bucket_name.'][table]['.$i.'][formula',
                  'Missing parenthesis in variable <em>' . $variable['name'] . '</em>');
                continue;
              } else if (substr_count($formula, '[') !== substr_count($formula, ']')) {
                form_set_error($bucket_name.'][table]['.$i.'][formula',
                  'Missing bracket in variable <em>' . $variable['name'] . '</em>');
                continue;
              } else if(ctype_alpha($formula)) {
                form_set_error($bucket_name.'][table]['.$i.'][formula',
                  'Formula cannot be string in variable: ' . $variable['name'] . '</em>');
                continue;
              }
              $formula_result = pgc_variables_process_formula($variable, $formula, $variables);
              if(isset($formula_result['error']))
                form_set_error($bucket_name.'][table]['.$i.'][formula', $formula_result['error']);
              else
                $variable['value'] = $formula_result['value'];
            }
            $variables[$variable['name']] = $variable;
          }
        }
      }
    }
    if (form_get_errors()) {
      drupal_add_css(drupal_get_path('module', 'pgc_variables').'/pgc_variables.examples.css');
      drupal_set_message('Changes will not be saved until errors are resolved!', 'error');
      $form_state['buckets'] = $buckets;
    } else {
      $form_state['final_variables'] = $variables;
    }
  }
}

function pgc_variables_calculated_examples_config_form_submit($form, &$form_state) {
  db_truncate('pgc_ex_variables')->execute();
  foreach($form_state['final_variables'] as $variable) {
    db_insert('pgc_ex_variables') // Table name no longer needs {}
      ->fields(array(
        'name' => $variable['name'],
        'decimals' => $variable['decimals'],
        'formula' => $variable['formula'],
        'value' => $variable['value'],
        'comment' => $variable['comment'],
        'weight' => $variable['weight'],
      ))
      ->execute();
  }
  drupal_set_message("Variables saved.");
}

// Custom theme output.
function theme_variable_drag_components($vars) {
  $element = $vars['element'];
  drupal_add_tabledrag('variables', 'order', 'sibling', 'field-weight');

  $header = array(
    'name' => t('Name'),
    'value' => t('Value'),
    'formula' => t('Formula'),
    'decimals' => t('Decimals'),
    'comment' => t('Note'),
    'delete' => t('Delete'),
    'weight' => t('Weight'),
  );

  $rows = array();
  foreach (element_children($element) as $key) {
    $row = array();
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
      $row['class'] = array('draggable');
    }
    $rows[] = $row;
  }

  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'attributes' => array('id' => 'variables'),
  ));
}

function pgc_variables_extract_buckets($variables) {
  $buckets = array();
  foreach($variables as $variable) {
    if(strpos($variable['name'], '_')) {
      $bucket = substr($variable['name'], 0, strpos($variable['name'], '_'));
      $buckets[$bucket][] = $variable;
    } else {
      $buckets['misc'][] = $variable;
    }
  }
  foreach($buckets as $id => $val) {
    usort($buckets[$id], "pgc_variables_sort_by_weight");
  }
  return $buckets;
}

function pgc_variables_sort_by_weight($a, $b) {
  if ($a['weight'] == $b['weight']) {
    return 0;
  }
  return ($a['weight'] < $b['weight']) ? -1 : 1;
}

function pgc_variables_ws_call($call, $args) {
  $calc = _pgc_variables_calculation($call, $args);
  if($calc->Status == 'Valid') {
    if(isset($calc->{$args['ReturnField']})) {
      return $calc->{$args['ReturnField']};
    }
    else {
      return array('error' => 'Return field not present in results.');
    }
  }
  else {
    return array(
      'error' => $calc->Status
    );
  }
}

function pgc_variables_import_form() {
  if(isset($_FILES['csv'])) {
    if($_FILES['csv']['error'] != 0)  {
      print $_FILES['csv']['error'];
    }
    else if($_FILES['csv']['type'] == 'text/csv') {
      $file = $_FILES['csv']['tmp_name'];
      $delete = isset($_POST['delete_all']);
      pgc_variables_import_variables($file, $delete);
    }
    else {
      print 'File must be csv format.';
    }
  }

  $form = '
  <form action="" method="post"
  enctype="multipart/form-data">
  <label for="file">Import file:</label>
  <input type="file" name="csv" id="file" accept="text/csv"><br/><br />
  <input type="checkbox" name="delete_all" id="delete_all" value="1"> <strong>Delete all existing variables</strong><br/><br/>
  <button type="submit" name="submit" value="Submit">Import</button>
  </form>';

  return $form;
}

function pgc_variables_import_variables($file, $delete_all = false) {
  $file = fopen($file,'r');
  $variables = array();
  while(! feof($file))
  {
    $row = fgetcsv($file);
    if(strlen($row[0])) {
      $variable_name = str_replace('[', '', $row[0]);
      $variable_name = str_replace(']', '', $variable_name);
      $variable['name'] = $variable_name;
      $variable['value'] = $row[1];
      $variable['formula'] = $row[2];
      $variable['comment'] = $row[3];
      if(isset($row[4]))
        $variable['decimals'] = $row[4];
      else
        $variable['decimals'] = '';
      $variables[$variable_name] = $variable;
    }
  }
  fclose($file);

  if(is_array($variables)) {
    if($delete_all) {
      db_truncate('pgc_ex_variables')->execute();
      $weight = 0;
    } else {
      $result = db_select('pgc_ex_variables', 'n')
        ->fields('n')
        ->orderBy('weight', 'DESC')
        ->range(0,1)
        ->execute();
      if($result->rowCount()) {
        $heaviest_variable = $result->fetchAssoc();
        $weight = $heaviest_variable['weight'] + 5;
      } else {
        $weight = 0;
      }
    }
    foreach($variables as $variable) {
      $existing_variable = pgc_variable_get($variable['name']);
      if($delete_all || !is_array($existing_variable)) {
        $add = pgc_variables_add_ex_variable($variable['name'], $variable['formula'], $variable['value'], $variable['decimals'], $weight, $variable['comment']);
        if($add['status'] == 'success') {
          $weight += 5;
        }
        else {
          drupal_set_message('Error processing formula for variable <em>'.$variable['name'].'</em>: ' . $add['error'], 'error');
          drupal_set_message('Imported halted. Please fix the broken formula and try again', 'error');
          return;
        }
      }
      else {
        $update = pgc_variables_update_ex_variable($variable['name'], $variable['formula'], $variable['value'], $variable['decimals'], $existing_variable['weight'], $variable['comment']);
        if($update['status'] == 'error') {
          drupal_set_message('Error processing formula for variable <em>'.$variable['name'].'</em>: ' . $update['error'], 'error');
          drupal_set_message('Imported halted. Please fix the broken formula and try again', 'error');
          return;
        }
      }
    }
    drupal_set_message('Variables successfully imported.');
  } else {
    drupal_set_message('Invalid CSV format. Try exporting as Windows CSV (you can do this on a Mac).', 'error');
  }
}
