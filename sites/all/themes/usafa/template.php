<?php
/**
 * template.php stub
 *
**/

function usafa_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function usafa_preprocess_html(&$variables) {
  drupal_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array('type' => 'external'));
}