<?php
function pgc_variables_config_form($form, $form_state){
  $form['#tree'] = TRUE;
  $form['variables_fieldset'] = array(
    '#type' => 'fieldset',
    '#title' => t('Variables'),
    '#prefix' => '<div id="variables-fieldset-wrapper">',
    '#suffix' => '</div>',
  );

  if(empty($form_state['variables'])) {
    drupal_set_message("Note: You must press save after editing variable values.
    Variable names may only contain letters, numbers, underscores, and dashes to avoid conflicts
    with other filters.");
    $variables = variable_get('pgc_variables', null);
    if($variables == null) {
      $variables = array();
      $variables[] = array('name'=>'','value'=>'');
    } else {
      $variables = unserialize($variables);
      $form_state['variables'] = $variables;
    }
  }
  else {
    $variables = $form_state['variables'];
  }

  for ($i = 0; $i < count($variables); $i++) {
    $form['variables_fieldset']['variable'][$i]['container-open'] = array(
      '#markup' => '<div class="container-inline">'
    );
    $form['variables_fieldset']['variable'][$i]['name'] = array(
      '#type' => 'textfield',
      '#title' => t('Variable:'),
      '#value' => $variables[$i]['name']
    );
    $form['variables_fieldset']['variable'][$i]['value'] = array(
      '#type' => 'textfield',
      '#title' => t('Value:'),
      '#value' =>  $variables[$i]['value']
    );
    $form['variables_fieldset']['variable'][$i]['delete'] = array(
      '#type' => 'submit',
      '#name' => 'delete_'.$i,
      '#value' => t('Delete'),
      '#submit' => array('pgc_variables_add_more_delete_one'),
      '#ajax' => array(
        'callback' => 'pgc_variables_add_more_callback',
        'wrapper' => 'variables-fieldset-wrapper',
      ),
    );
    $form['variables_fieldset']['variable'][$i]['container-close'] = array(
      '#markup' => '</div>'
     );
  }
  $form['variables_fieldset']['add_variable'] = array(
    '#type' => 'submit',
    '#value' => t('Add one more'),
    '#submit' => array('pgc_variables_add_more_add_one'),
    '#ajax' => array(
      'callback' => 'pgc_variables_add_more_callback',
      'wrapper' => 'variables-fieldset-wrapper',
    ),
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  return $form;
}

/**
 * Callback for both ajax-enabled buttons.
 *
 * Selects and returns the fieldset with the variables in it.
 */
function pgc_variables_add_more_callback($form, $form_state) {
  return $form['variables_fieldset'];
}

/**
 * Submit handler for the "add-one-more" button.
 *
 * Increments the max counter and causes a rebuild.
 */
function pgc_variables_add_more_add_one($form, &$form_state) {
  $variables = array();
  foreach($form_state['input']['variables_fieldset']['variable'] as $variable) {
    $variables[] = array('name' => $variable['name'], 'value' => $variable['value']);
  }
  $variables[] = array('name' => '', 'value' => '');
  $form_state['variables'] = $variables;
  $form_state['rebuild'] = TRUE;
}

/**
 * Submit handler for the "delete" button.
 *
 * Deletes a specific variable from the form
 */
function pgc_variables_add_more_delete_one($form, &$form_state) {
  if(count($form_state['input']['variables_fieldset']['variable']) == 1) {
    drupal_set_message("At least one variable must be set", 'error');
  } else {
    $del_name = $form_state['triggering_element']['#name'];
    $del_index = substr($del_name, strpos($del_name, '_')+1);
    $variables = array();
    foreach($form_state['input']['variables_fieldset']['variable'] as $variable) {
      $variables[] = array('name' => $variable['name'], 'value' => $variable['value']);
    }
    unset($variables[$del_index]);
    $form_state['variables'] = array_values($variables);
    $form_state['rebuild'] = TRUE;
  }
}

/**
 * Final submit handler.
 *
 * Reports what values were finally set.
 */
function pgc_variables_config_form_submit($form, &$form_state) {
  $variables = array();
  foreach($form_state['input']['variables_fieldset']['variable'] as $variable) {
    if(strlen($variable['name']))
      $variables[] = array('name' => $variable['name'], 'value' => $variable['value']);
  }

  if(count($variables)) {
    variable_set('pgc_variables', serialize($variables));
  }

  drupal_set_message('Variables saved.');
}

/**
 * Calculated table variables
 * @param $form
 * @param $form_state
 * @return mixed
 */
function pgc_variables_calculated_config_form($form, $form_state){
  drupal_set_message("Note: You must press save after editing variable values.");

  $values = variable_get('pgc_variables_calculated', null);

  if(strlen($values)) {
    $values = unserialize($values);
  }
  $form['#tree'] = TRUE;

  $form['gar_table'] = array(
    '#type' => 'textfield',
    '#title' => 'GAR Table',
    '#default_value' => isset($values['gar_table']) ? $values['gar_table'] : 'acgacurrent.gar',
  );

  $form['ga'] = array(
    '#type' => 'fieldset',
    '#title' => 'Gift Annuity',
    '#collapsible' => true,
  );

  $form['ga']['gift_amount'] = array(
    '#type' => 'textfield',
    '#title' => 'Gift Amount:',
    '#default_value' => isset($values['ga_gift_amount']) ? $values['ga_gift_amount'] : '',
    '#size' => 10,
    '#description' => 'Variable: ga_gift_amount',
    '#maxlength' => 10,
    '#required' => TRUE,
  );

  /*
   * One life GA
   */
  $form['ga']['sa'] = array(
    '#type' => 'fieldset',
    '#title' => 'Single Life',
    '#description' => 'Variable patterns:<br /> <strong>Age:</strong> ga_sa_age_#<br /><strong>Payment Rate:</strong> ga_sa_rate_#<strong><br />Payment Amount:</strong> ga_sa_payamt_#<br /><strong>Tax Free Amount:</strong> ga_sa_taxfree_#<br /><strong>IRS Discount Rate:</strong> ga_sa_irsrate_#<br /><strong>Charitable Deduction:</strong> ga_sa_deduction_#<br /><br />',
    '#collapsible' => true,
    '#collapsed' => true,
  );

  for($i = 1; $i <= 10; $i++) {
    $form['ga']['sa']['age_'.$i] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i,
      '#default_value' => isset($values['ga_sa_age_'.$i]) ? $values['ga_sa_age_'.$i] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#prefix' => '<div class="container-inline">',
      '#suffix' => '</div>',
    );
  }

  /*
   * Two life GA
   */
  $form['ga']['da'] = array(
    '#type' => 'fieldset',
    '#title' => 'Two Lives',
    '#collapsible' => true,
    '#collapsed' => true,
    '#description' => 'Variable patterns:<br /> <strong>Age A:</strong> ga_da_age_#_a<br /><strong>Age B:</strong> ga_da_age_#_b<br /><strong>Payment Rate:</strong> ga_da_rate_#<strong><br />Payment Amount:</strong> ga_da_payamt_#<br /><strong>Tax Free Amount:</strong> ga_da_taxfree_#<br /><strong>IRS Discount Rate:</strong> ga_da_irsrate_#<br /><strong>Charitable Deduction:</strong> ga_da_irsrate_#<br /><br />',
  );

  for($i = 1; $i <= 10; $i++) {
    $form['ga']['da']['age_'.$i.'_a'] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i.' A',
      '#default_value' => isset($values['ga_da_age_'.$i.'_a']) ? $values['ga_da_age_'.$i.'_a'] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#prefix' => '<div class="container-inline">',
      '#suffix' => '&nbsp;',
    );
    $form['ga']['da']['age_'.$i.'_b'] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i.' B',
      '#default_value' => isset($values['ga_da_age_'.$i.'_b']) ? $values['ga_da_age_'.$i.'_b'] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#suffix' => '</div>',
    );
  }

  $form['dga'] = array(
    '#type' => 'fieldset',
    '#title' => 'Deferred Gift Annuity',
    '#collapsible' => true,
  );

  $form['dga']['gift_amount'] = array(
    '#type' => 'textfield',
    '#title' => 'Gift Amount:',
    '#default_value' => isset($values['dga_gift_amount']) ? $values['dga_gift_amount'] : '',
    '#description' => 'Variable: dga_gift_amount',
    '#size' => 10,
    '#maxlength' => 10,
    '#required' => TRUE,
  );

  /*
   * One life DGA
   */
  $form['dga']['sa'] = array(
    '#type' => 'fieldset',
    '#title' => 'Single Life',
    '#collapsible' => true,
    '#collapsed' => true,
    '#description' => 'Variable patterns:<br /><strong>Age A:</strong> dga_sa_age_#<br /><strong>Years Deferred:</strong> dga_sa_years_#<br /><strong>Payment Rate:</strong> dga_sa_rate_#<strong><br />Payment Amount:</strong> dga_sa_payamt_#<br /><strong>Tax Free Amount:</strong> dga_sa_taxfree_#<br /><strong>IRS Discount Rate:</strong> dga_sa_irsrate_#<br /><strong>Charitable Deduction:</strong> dga_sa_deduction_#<br /><br />',
  );

  for($i = 1; $i <= 10; $i++) {
    $form['dga']['sa']['age_'.$i] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i,
      '#default_value' => isset($values['dga_sa_age_'.$i]) ? $values['dga_sa_age_'.$i] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#prefix' => '<div class="container-inline">',
      '#suffix' => '&nbsp;',
    );
    $form['dga']['sa']['years_'.$i] = array(
      '#type' => 'textfield',
      '#title' => 'Years Deferred '.$i,
      '#default_value' => isset($values['dga_sa_years_'.$i]) ? $values['dga_sa_years_'.$i] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#suffix' => '</div>',
    );
  }

  /*
   * Two life DGA
   */
  $form['dga']['da'] = array(
    '#type' => 'fieldset',
    '#title' => 'Two Lives',
    '#collapsible' => true,
    '#collapsed' => true,
    '#description' => 'Variable patterns:<br /> <strong>Age A:</strong> dga_da_age_#_a<br /><strong>Age B:</strong> dga_da_age_#_b<br /><strong>Years Deferred:</strong> dga_da_years_#<br /><strong>Payment Rate:</strong> dga_da_rate_#<strong><br />Payment Amount:</strong> dga_da_payamt_#<br /><strong>Tax Free Amount:</strong> dga_da_taxfree_#<br /><strong>IRS Discount Rate:</strong> dga_da_irsrate_#<br /><strong>Charitable Deduction:</strong> dga_da_deduction_#<br /><br />',
  );

  for($i = 1; $i <= 10; $i++) {
    $form['dga']['da']['age_'.$i.'_a'] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i.' A',
      '#default_value' => isset($values['dga_da_age_'.$i.'_a']) ? $values['dga_da_age_'.$i.'_a'] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#prefix' => '<div class="container-inline">',
      '#suffix' => '&nbsp;',
    );
    $form['dga']['da']['age_'.$i.'_b'] = array(
      '#type' => 'textfield',
      '#title' => 'Age '.$i.' B',
      '#default_value' => isset($values['dga_da_age_'.$i.'_b']) ? $values['dga_da_age_'.$i.'_b'] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#suffix' => '&nbsp;',
    );
    $form['dga']['da']['years_'.$i] = array(
      '#type' => 'textfield',
      '#title' => 'Years Deferred '.$i,
      '#default_value' => isset($values['dga_da_years_'.$i]) ? $values['dga_da_years_'.$i] : '',
      '#size' => 3,
      '#maxlength' => 3,
      '#suffix' => '</div>',
    );
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return $form;
}

/**
 * Calculated variables submit handler.
 *
 */
function pgc_variables_calculated_config_form_submit($form, &$form_state) {
  set_time_limit(100);
  $vars = $form_state['values'];
  $errors = false;

  $variables['ga_gift_amount'] = $vars['ga']['gift_amount'];
  /* Calculate one life GAs */
  for($i = 1; $i <= 10; $i++) {
    if(strlen($vars['ga']['sa']['age_'.$i]) && is_numeric($vars['ga']['sa']['age_'.$i])) {
      $result = _pgc_variables_ga_calculation(
        $vars['ga']['gift_amount'],
        $vars['ga']['sa']['age_'.$i],
        -1,
        $vars['gar_table']
      );
      if(!$result) {
        $errors = true;
      } else {
        $variables['ga_sa_age_'.$i] = $vars['ga']['sa']['age_'.$i];
        $variables['ga_sa_rate_'.$i] = $result->PaymentRate;
        $variables['ga_sa_taxfree_'.$i] = $result->TaxFreePortion;
        $variables['ga_sa_irsrate_'.$i] = $result->IRSDiscountRate;
		$variables['ga_sa_deduction_'.$i] = $result->CharitableDeduction;
        $variables['ga_sa_payamt_'.$i] = $result->AnnualPayment;
      }
    }
  }
  /* Calculated two life GAs */
  for($i = 1; $i <= 10; $i++) {
    if(strlen($vars['ga']['da']['age_'.$i.'_a']) && is_numeric($vars['ga']['da']['age_'.$i.'_a']) &&
      strlen($vars['ga']['da']['age_'.$i.'_b']) && is_numeric($vars['ga']['da']['age_'.$i.'_b'])) {
      $result = _pgc_variables_ga_calculation(
        $vars['ga']['gift_amount'],
        $vars['ga']['da']['age_'.$i.'_a'],
        $vars['ga']['da']['age_'.$i.'_b'],
        $vars['gar_table']
      );
      if(!$result) {
        $errors = true;
      } else {
        $variables['ga_da_age_'.$i.'_a'] = $vars['ga']['da']['age_'.$i.'_a'];
        $variables['ga_da_age_'.$i.'_b'] = $vars['ga']['da']['age_'.$i.'_b'];
        $variables['ga_da_rate_'.$i] = $result->PaymentRate;
        $variables['ga_da_taxfree_'.$i] = $result->TaxFreePortion;
        $variables['ga_da_irsrate_'.$i] = $result->IRSDiscountRate;
		$variables['ga_da_deduction_'.$i] = $result->CharitableDeduction;
        $variables['ga_da_payamt_'.$i] = $result->AnnualPayment;
      }
    }
  }


  $variables['dga_gift_amount'] = $vars['dga']['gift_amount'];
  $today = date('m/d/Y');
  /* Calculate one life DGAs */
  for($i = 1; $i <= 10; $i++) {
    if(strlen($vars['dga']['sa']['age_'.$i]) && is_numeric($vars['dga']['sa']['age_'.$i]) &&
      strlen($vars['dga']['sa']['years_'.$i]) && is_numeric($vars['dga']['sa']['years_'.$i])) {
      $years = $vars['dga']['sa']['years_'.$i];
      $result = _pgc_variables_ga_calculation(
        $vars['dga']['gift_amount'],
        $vars['dga']['sa']['age_'.$i],
        -1,
        $vars['gar_table'],
        date("m/d/Y", strtotime('+'.$years.' year', strtotime($today)))
      );
      if(!$result) {
        $errors = true;
      } else {
        $variables['dga_sa_age_'.$i] = $vars['dga']['sa']['age_'.$i];
        $variables['dga_sa_years_'.$i] = $vars['dga']['sa']['years_'.$i];
        $variables['dga_sa_rate_'.$i] = $result->PaymentRate;
        $variables['dga_sa_taxfree_'.$i] = $result->TaxFreePortion;
        $variables['dga_sa_irsrate_'.$i] = $result->IRSDiscountRate;
		$variables['dga_sa_deduction_'.$i] = $result->CharitableDeduction;
        $variables['dga_sa_payamt_'.$i] = $result->AnnualPayment;
      }
    }
  }
  /* Calculated two life GAs */
  for($i = 1; $i <= 10; $i++) {
    if(strlen($vars['dga']['da']['age_'.$i.'_a']) && is_numeric($vars['dga']['da']['age_'.$i.'_a']) &&
      strlen($vars['dga']['da']['age_'.$i.'_b']) && is_numeric($vars['dga']['da']['age_'.$i.'_b'])) {
      $years = $vars['dga']['da']['years_'.$i];
      $result = _pgc_variables_ga_calculation(
        $vars['dga']['gift_amount'],
        $vars['dga']['da']['age_'.$i.'_a'],
        $vars['dga']['da']['age_'.$i.'_b'],
        $vars['gar_table'],
        date("m/d/Y", strtotime('+'.$years.' year', strtotime($today)))
      );
      if(!$result) {
        $errors = true;
      } else {
        $variables['dga_da_age_'.$i.'_a'] = $vars['dga']['da']['age_'.$i.'_a'];
        $variables['dga_da_age_'.$i.'_b'] = $vars['dga']['da']['age_'.$i.'_b'];
        $variables['dga_da_years_'.$i] = $vars['dga']['sa']['years_'.$i];
        $variables['dga_da_rate_'.$i] = $result->PaymentRate;
        $variables['dga_da_taxfree_'.$i] = $result->TaxFreePortion;
        $variables['dga_da_irsrate_'.$i] = $result->IRSDiscountRate;
		$variables['dga_da_deduction_'.$i] = $result->CharitableDeduction;
        $variables['dga_da_payamt_'.$i] = $result->AnnualPayment;
      }
    }
  }

  if($errors)
    drupal_set_message('Error calculating fields', 'error');
  else {
    drupal_set_message('Variables saved.');
    if(count($variables)) {
      variable_set('pgc_variables_calculated', serialize($variables));
    }
  }
}
