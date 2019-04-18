<?php
/**
 * template.php stub
 *
**/

function bentley2_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function bentley2_js_alter(&$js){	
  unset($js['misc/jquery.js']); 
  unset($js['misc/jquery.once.js']); 
  unset($js['misc/drupal.js']); 
}