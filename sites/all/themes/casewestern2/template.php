<?php
/**
 * template.php stub
 *
**/

function casewestern2_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function casewestern2_breadcrumb(&$variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
  	$breadcrumb[] = drupal_get_title();
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $output .= '<div class="pg-breadcrumb-links">' . implode(' » ', $breadcrumb) . '</div>';
    return $output;
  }
}