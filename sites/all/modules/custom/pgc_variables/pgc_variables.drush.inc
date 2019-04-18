<?php

/**
 * @file
 * Drush command(s) for updating PGC variables.
 *
 * Provide a drush command to update the variables. This can be scheduled
 * differently from other cron tasks, in order to make sure that variables are
 * updated on the right schedule and without overloading the web services.
 */

/**
 * Implements hook_drush_command().
 */
function pgc_variables_drush_command() {
  $items = array();

  // Update calculated variables.
  $items['pgc-update-variables'] = array(
    'description' => 'Update calculated variables.',
    'arguments' => array(),
    'options' => array(),
  );

  return $items;
}

/**
 * Command callback.
 *
 * Programmatically submit the forms at admin/custom-variables/examples and
 * admin/custom-variables/calculated-tables .
 */
function drush_pgc_variables_pgc_update_variables() {

  module_load_include('inc', 'pgc_variables', 'pgc_variables.admin.examples');
  $form_state = array();
  $form_state['values']['save'] = 'Save';
  drupal_form_submit('pgc_variables_calculated_examples_config_form', $form_state);

  module_load_include('inc', 'pgc_variables', 'pgc_variables.admin');
  $form_state = array();
  $form_state['values']['op'] = 'Save';
  drupal_form_submit('pgc_variables_calculated_config_form', $form_state);

}
