<?php
/**
 * template.php stub
 *
**/

function christiancamps_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function christiancamps_js_alter(&$javascript) {
  $javascript['misc/jquery.js']['data'] = "https://code.jquery.com/jquery-1.11.3.min.js";
}
