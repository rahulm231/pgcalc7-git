<?php
/**
 * template.php stub
 *
**/

function marietta_updated_theme_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function marietta_updated_theme_js_alter(&$js){	
  unset($js['misc/jquery.js']); 
  unset($js['misc/jquery.once.js']); 
}