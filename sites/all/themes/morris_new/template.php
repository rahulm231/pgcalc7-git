<?php
/**
 * template.php stub
 *
**/

function morris_new_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function morris_new_js_alter(&$js){	
  unset($js['misc/jquery.js']); 
}

function morris_new_breadcrumb($variables){
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    $breadcrumb[] = drupal_get_title();
    $breadcrumb[0] = l('Giving',NULL);
    return '<div class="breadcrumb">' . implode(' » ', $breadcrumb) . '</div>';
  }
}