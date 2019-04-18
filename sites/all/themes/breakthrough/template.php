<?php
/**
 * template.php stub
 *
**/

function breakthrough_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.theme.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.messages.css']);
  unset($css[drupal_get_path('module', 'system') . '/system.base.css']);
  // ...
}

function breakthrough_preprocess_html(&$vars){
     //$vars['head_title'] = implode(' | ', array(drupal_get_title(), variable_get('site_name'), variable_get('site_slogan')));
    
    if(!drupal_is_front_page()){
        $vars['head_title'] = variable_get('site_name').' | '.drupal_get_title();
    } else {
        $vars['head_title'] = variable_get('site_name');
    }
    
    drupal_set_title($vars['head_title']);
}
