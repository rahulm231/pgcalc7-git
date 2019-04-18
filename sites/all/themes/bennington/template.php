<?php
/**
 * template.php stub
 *
**/

function bennington_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function bennington_js_alter(&$js){
  	
  unset($js['misc/jquery.js']); 
  unset($js['misc/jquery.once.js']); 
  unset($js['misc/drupal.js']);
 /* unset($js['sites/all/themes/pgcalc_master/js/titlebar.js']); 
  unset($js['sites/all/themes/pgcalc_master/js/gifttypes.js']); 
   */
}