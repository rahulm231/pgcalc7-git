<?php
/**
 * @file
 * pgc_config.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function pgc_config_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function pgc_config_node_info() {
  $items = array(
    'contact' => array(
      'name' => t('Contact'),
      'base' => 'node_content',
      'description' => t('Contact profile to be displayed on the Contact Us page.'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
    'content_only_pages' => array(
      'name' => t('Content Only Pages'),
      'base' => 'node_content',
      'description' => t('Use this content type to create pages which only have content region and uses their own CSS file.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'general_content' => array(
      'name' => t('General Content'),
      'base' => 'node_content',
      'description' => t('Freeform page, used for bottom level content pages and other pages which need unique content structures. '),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'gift_type' => array(
      'name' => t('Gift Type'),
      'base' => 'node_content',
      'description' => t('Gift type information page with overview, details, and example.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'homepage' => array(
      'name' => t('Homepage'),
      'base' => 'node_content',
      'description' => t('There should only be one published homepage node with the path "home".'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'landing_page' => array(
      'name' => t('Section Landing Page'),
      'base' => 'node_content',
      'description' => t('Section landing page with a header image, body text, and automatically generated links to all child pages.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'newsletter_article' => array(
      'name' => t('Newsletter Article'),
      'base' => 'node_content',
      'description' => t('Add a new newsletter article to the archive. Supports Full HTML.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'webform' => array(
      'name' => t('Webform'),
      'base' => 'node_content',
      'description' => t('Create a new form or questionnaire accessible to users. Submission results and statistics are recorded and accessible to privileged users.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
