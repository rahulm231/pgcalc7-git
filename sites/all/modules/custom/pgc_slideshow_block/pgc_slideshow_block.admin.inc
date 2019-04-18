<?php 

function pgc_slideshow_block_config_form($form, &$form_state){
	
  $form['pgc_slideshow_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Slideshow Settings'),
    '#collapsible' => TRUE, // Added
    '#collapsed' => FALSE,  // Added
  );
	
  $form['pgc_slideshow_settings']['pgc_slideshow_interval'] = array(
	'#type' => 'textfield',
    '#title' => t('Slideshow Interval'),
    '#default_value' => variable_get('pgc_slideshow_interval',4000),
    '#description' => t('Time between slide transitions, in milliseconds.'),
  );
  
  return system_settings_form($form);
}