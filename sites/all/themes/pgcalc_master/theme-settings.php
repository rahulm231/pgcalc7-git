<?php
/**
 * Implementation of THEMEHOOK_settings() function.
 *
 * @param $saved_settings
 *   array An array of saved settings for this theme.
 * @return
 *   array A form array.
 */
function pgcalc_master_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['regions'] = array(
    '#type' => 'fieldset',
    '#title' => 'Region settings',
    '#weight' => -5,
  );
  $form['regions']['redefine'] = array(
    '#markup' => '<div style="color:#f00; font-weight:bold; margin-bottom:10px;">Redefining regions will cause any customizations you\'ve made to a template since ingestion to be lost!</div><a class="button" href="/admin/site-ingestor/region-selector/'.arg(3).'">Redefine theme regions</a>',
  );

  $form['styles'] = array(
    '#type' => 'fieldset',
    '#title' => 'Style settings',
    '#weight' => -3,
  );
  $form['styles']['redefine'] = array(
    '#markup' => '<a class="button" href="/admin/site-ingestor/style-builder/'.arg(3).'/edit">Edit theme styles</a>',
  );
  /* PGCS-445 */ 
  $form['mobilenavbar'] = array(
    '#type' => 'fieldset',
    '#title' => 'Mobile Nav Bar',
    '#weight' => -2,
  );
 
 $form['mobilenavbar']['pgcalc_master_font_awesome'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add Font Awesome Library.'),
    '#default_value' => theme_get_setting('pgcalc_master_font_awesome'),
    '#description' => t('If open and close buttons are not loaded for mobile nav bar, that might be because theme is missing "Font awesome library", check this option to load "Font awesome library".'),
  );
  /* PGCS-445 */ 

  $form['tweaks'] = array(
    '#type' => 'fieldset',
    '#title' => 'Fine tuning',
    '#weight' => -1,
  );
  $form['tweaks']['pgcalc_master_tweak_padding'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add padding.'),
    '#default_value' => theme_get_setting('pgcalc_master_tweak_padding'),
    '#description' => t('If the last photo in a row on a gift-type page is larger than the others, try setting this. If that photo wraps to the next row, then try un-setting this option.'),
  );

  $form['rawhtml'] = array(
    '#type' => 'fieldset',
    '#title' => 'Raw HTML',
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#weight' => -1,
  );
  $args = array(
    '%edit_button' => 'Edit HTML',
    '!region' => '<a href="/admin/site-ingestor/region-selector/' . arg(3) . '">Redefine theme regions</a>',
    '!replace_code' => '<code>{{?php echo $custom_html; ?}}</code>',
  );
  $form['rawhtml']['pgcalc_master_custom_html'] = array(
    '#type' => 'textarea',
    '#title' => t('Custom HTML'),
    '#default_value' => theme_get_setting('pgcalc_master_custom_html'),
    '#description' => t('Paste raw HTML here. Use %edit_button on the !region page to insert the code !replace_code wherever you want this HTML to be placed.', $args),
  );

}

?>
