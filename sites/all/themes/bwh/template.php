<?php
/**
 * template.php stub
 *
**/

function bwh_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

/**
 * Implements hook_js_alter().
 *
 * Remove the jQuery library that comes with Drupal because it conflicts with
 * one loaded by the theme.
 */
function bwh_js_alter(&$js) {
  unset($js['misc/jquery.js']);
}

function bwh_webform_view_messages($variables) {
  if($variables['user_limit_exceeded']==1){
  	$contact_phone_number = "617-424-4326";
	$contact_email_address = "kduffy1@bwh.harvard.edu";
	
	$pgc_variables = variable_get('pgc_variables', null);
	$pgc_variables = unserialize($pgc_variables);
	for ($i = 0; $i < count($pgc_variables); $i++) {
	  if($pgc_variables[$i]['name']=='contact_phone_number'){
	  	$contact_phone_number = $pgc_variables[$i]['value'];
	  }
	  if($pgc_variables[$i]['name']=='contact_email_address'){
	  	$contact_email_address = $pgc_variables[$i]['value'];
	  }
	}
	
  	$message = "You have already submitted once. If you have any questions, please contact us at ".$contact_phone_number." or email us at ".$contact_email_address.".";
  	drupal_set_message($message, $type, FALSE);
  }
}