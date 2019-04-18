<?php
/**
 * template.php stub
 *
**/

function case_western__css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

 function case_western__js_alter(&$js){	
      unset($js['misc/jquery.js']); 
      unset($js['misc/jquery.once.js']); 
  }