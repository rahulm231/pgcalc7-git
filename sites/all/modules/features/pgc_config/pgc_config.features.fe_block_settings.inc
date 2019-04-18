<?php
/**
 * @file
 * pgc_config.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function pgc_config_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['pgc_resource_block-pgc_resource_block'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'pgc_resource_block',
    'module' => 'pgc_resource_block',
    'node_types' => array(
      0 => 'general_content',
      1 => 'gift_type',
      2 => 'landing_page',
      3 => 'newsletter_article',
    ),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'humboldt2' => array(
        'region' => 'content_inline_blocks',
        'status' => 1,
        'theme' => 'humboldt2',
        'weight' => 1,
      ),
      'pgcalc_master' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'pgcalc_master',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
