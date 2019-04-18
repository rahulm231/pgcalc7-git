<?php
/**
 * template.php stub
 *
**/

function father_bill_s_new_site_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function father_bill_s_new_site_js_alter(&$js){	
  unset($js['misc/jquery.js']); 
}