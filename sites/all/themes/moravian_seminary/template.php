<?php
/**
 * template.php stub
 *
**/

function moravian_seminary_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function moravian_seminary_js_alter(&$js){
  unset($js['misc/jquery.js']); 		
  unset($js[drupal_get_path('theme', 'pgcalc_master').'/js/titlebar.js']); 
  unset($js[drupal_get_path('theme', 'pgcalc_master').'/js/gifttypes.js']); 
}