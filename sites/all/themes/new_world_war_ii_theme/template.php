<?php
/**
 * template.php stub
 *
**/

function new_world_war_ii_theme_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function new_world_war_ii_theme_preprocess_html(&$variables) {
  drupal_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array('type' => 'external'));
}


function new_world_war_ii_theme_js_alter(&$js){
  if(strpos(current_path(), 'pgc-print/')===FALSE){
    unset($js['misc/jquery.js']);
    unset($js['misc/drupal.js']);
  }
    unset($js['sites/all/themes/pgcalc_master/js/titlebar.js']);
    unset($js['sites/all/themes/pgcalc_master/js/gifttypes.js']);
    unset($js['sites/all/modules/custom/pgc_misc_blocks/js/mobilenav.js']);
  
  /*
  unset($js['misc/jquery.once.js']);  
  unset($js['sites/all/modules/custom/pgc_misc_blocks/js/mobilenav.js']);
  unset($js['sites/all/themes/pgcalc_master/js/titlebar.js']);
  unset($js['sites/all/themes/pgcalc_master/js/gifttypes.js']);
   */
}