<?php
/**
 * @file
 * pgc_config.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function pgc_config_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_accordion_text|node|gift_type|form';
  $field_group->group_name = 'group_accordion_text';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'gift_type';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Accordion Text',
    'weight' => '19',
    'children' => array(
      0 => 'field_accordion_collapsed_text',
      1 => 'field_accordion_expanded_text',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-accordion-text field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_accordion_text|node|gift_type|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_accordion_wrapper|field_collection_item|field_accordion|default';
  $field_group->group_name = 'group_accordion_wrapper';
  $field_group->entity_type = 'field_collection_item';
  $field_group->bundle = 'field_accordion';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Accordion Wrapper',
    'weight' => '0',
    'children' => array(
      0 => 'field_accordion_title',
      1 => 'field_accordion_body',
    ),
    'format_type' => 'accordion',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-accordion-wrapper field-group-accordion',
        'effect' => 'bounceslide',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_accordion_wrapper|field_collection_item|field_accordion|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_thumbnail|node|general_content|form';
  $field_group->group_name = 'group_thumbnail';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'general_content';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Thumbnail',
    'weight' => '6',
    'children' => array(
      0 => 'field_thumbnail_image',
      1 => 'field_thumbnail_width',
      2 => 'field_thumbnail_height',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-thumbnail field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_thumbnail|node|general_content|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_thumbnail|node|gift_type|form';
  $field_group->group_name = 'group_thumbnail';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'gift_type';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Thumbnail',
    'weight' => '6',
    'children' => array(
      0 => 'field_thumbnail_image',
      1 => 'field_thumbnail_width',
      2 => 'field_thumbnail_height',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-thumbnail field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_thumbnail|node|gift_type|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_thumbnail|node|landing_page|form';
  $field_group->group_name = 'group_thumbnail';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'landing_page';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Thumbnail',
    'weight' => '6',
    'children' => array(
      0 => 'field_thumbnail_image',
      1 => 'field_thumbnail_width',
      2 => 'field_thumbnail_height',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-thumbnail field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_thumbnail|node|landing_page|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_thumbnail|node|webform|form';
  $field_group->group_name = 'group_thumbnail';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'webform';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Thumbnail',
    'weight' => '6',
    'children' => array(
      0 => 'field_thumbnail_image',
      1 => 'field_thumbnail_width',
      2 => 'field_thumbnail_height',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-thumbnail field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_thumbnail|node|webform|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Accordion Text');
  t('Accordion Wrapper');
  t('Thumbnail');

  return $field_groups;
}
