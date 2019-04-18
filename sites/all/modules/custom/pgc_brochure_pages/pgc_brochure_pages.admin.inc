<?php

function pgc_brochure_pages_config_form($form, &$form_state) {
	global $base_url;
	
	$form['pgc_borchure'] = array(
      '#type' => 'fieldset',
      '#title' => t('Brochure page settings'),
      '#collapsible' => FALSE, // Added
      '#collapsed' => FALSE,  // Added
    );
	
	$form['pgc_borchure']['pgc_borchure_logo'] = array(
	  '#title' => t('Brochure logo'), 
	  '#type' => 'managed_file', 
	  '#description' => t('The uploaded icon will be displayed on Brochure Pages.'), 
	  '#upload_location' => 'public://pgc_borchure_logo/', 
	  '#default_value' => variable_get('pgc_borchure_logo'), 
	);

	$form['#submit'][] = 'pgc_brochure_pages_config_form_submit';
	return system_settings_form($form);
}

function pgc_brochure_pages_config_form_submit($form, &$form_state) {
  	
  if (isset($form_state['values']['pgc_borchure_logo'])) {
	$file = file_load($form_state['values']['pgc_borchure_logo']);
	if ($file) {
	  $file->status = FILE_STATUS_PERMANENT;
	  file_save($file);
	}
  }else {
	$file = file_load(variable_get('pgc_borchure_logo', ''));
	if ($file->fid){
	  file_delete($file, TRUE);
	}
  }
  
 // variable_set('menu_rebuild_needed', TRUE);
  
}