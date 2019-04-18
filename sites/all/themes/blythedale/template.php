<?php
/**
 * template.php stub
 *
**/

function blythedale_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function blythedale_js_alter(&$js){	
  unset($js['misc/jquery.js']); 
  unset($js['misc/jquery.once.js']); 
  unset($js['misc/drupal.js']); 
}