<?php

function pgc_print_setting_config_form($form, &$form_state) {
	global $base_url;
	
	//echo "<pre>"; print_r(file_load(155)); die;
	
	$form['pgc_print'] = array(
      '#type' => 'fieldset',
      '#title' => t('Print preview settings'),
      '#collapsible' => FALSE, // Added
      '#collapsed' => FALSE,  // Added
    );	
	
	$form['pgc_print']['pgc_print_logo'] = array(
	  '#title' => t('Print logo'), 
	  '#type' => 'managed_file', 
	  '#description' => t('The uploaded icon will be displayed on Brochure Pages and Print Preview.'), 
	  '#upload_location' => 'public://pgc_print_logo/', 
	  '#default_value' => variable_get('pgc_print_logo'), 
	);
	
	/*
	if(variable_get('pgc_print_logo')!=''){
		$print_logo = variable_get('pgc_print_logo');
		$file_uri   = file_load($print_logo) -> uri;
		$file_url   = parse_url(file_create_url($file_uri));
		$file_path  = $file_url['path'];
		
		$form['pgc_print']['pgc_print_logo']['#suffix'] = theme('image', array('path' => $file_uri));
	}
	 */

	$form['pgc_print']['pgc_print_border'] = array(
	  '#type' => 'jquery_colorpicker', 
	  '#title' => t('Border color'), 
	  '#default_value' => variable_get('pgc_print_border', $base_url),
	);

	$form['#submit'][] = 'pgc_print_setting_config_form_submit';	
	return system_settings_form($form);
}

function pgc_print_setting_config_form_submit($form, &$form_state) {
	
  if (isset($form_state['values']['pgc_print_logo'])) {
	$file = file_load($form_state['values']['pgc_print_logo']);
	if ($file) {
	  $file->status = FILE_STATUS_PERMANENT;
	  file_save($file);
	}
  }else {
	$file = file_load(variable_get('pgc_print_logo', ''));
	if ($file->fid){
	  file_delete($file, TRUE);
	}
  }
}