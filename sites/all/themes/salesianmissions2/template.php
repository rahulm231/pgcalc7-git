<?php
/**
 * template.php stub
 *
**/

function salesianmissions2_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function salesianmissions2_js_alter(&$js){	
      unset($js['misc/jquery.js']); 
    }