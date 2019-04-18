<?php

/**
 * @file
 * Forms for the Push to Git admin pages.
 */

/**
 * Form callback for admin/config/push-to-git.
 */
function push_to_git_config_form() {
  $form['ptg_repo_path'] = array(
    '#type' => 'textfield',
    '#title' => 'Local repository path',
    '#description' => 'The absolute path to the folder you want to manage (e.g. /var/www/htdocs)',
    '#default_value' => variable_get('ptg_repo_path', ''),
  );
  $form['ptg_email'] = array(
    '#type' => 'textfield',
    '#title' => 'Repository Maintainer',
    '#description' => 'The email address of the person responsible for creating pull requests.',
    '#default_value' => variable_get('ptg_email', 'apalmer@pgcalc.com'),
  );
  // LS-3 - starts //
  $form['ptg_prod_ip'] = array(
    '#type' => 'textfield',
    '#title' => 'IP Address',
    '#description' => 'IP Address of Production Server (Old Production - 192.237.215.237, New Production - 162.209.69.4)',
    '#default_value' => variable_get('ptg_prod_ip', ''),
  );
  // LS-3 - ends
  return system_settings_form($form);
}

/**
 * Form callback for admin/push-to-git.
 */
function push_to_git_form($form, $form_state) {
  $form['push'] = array(
    '#type' => 'fieldset',
    '#title' => 'Changed & created files to be pushed',
  );
  $repo_path = _push_to_git_repo_path();
  if (!$repo_path) {
    $form['push']['error'] = array(
      '#markup' => t('Please correct the errors reported above.'),
    );
  }
  elseif (($diff_list = push_to_git_diff_list($repo_path)) === FALSE) {
    $form['push']['error'] = array(
      '#markup' => t('An error occurred while checking the git repository. There is more information in the system log.'),
    );
  }
  elseif (count($diff_list)) {

    $form['push']['repo_path'] = array(
      '#markup' => t('New, changed, and deleted files in %dir', array('%dir' => $repo_path)),
    );
    $form['push']['contents'] = array(
      '#markup' => theme('ptg_diff_list', array('files' => $diff_list)),
    );
    $form['push']['submit'] = array(
      '#type' => 'submit',
      '#value' => 'Push to Git',
    );
  }
  else {
    $form['push']['nothing'] = array(
      '#markup' => 'No files have been changed.',
    );
    // Master site does not use a branch, so no pull requests.
    $site_system_name = variable_get('site_system_name');
    if ($site_system_name != 'pgcalc_master') {
      $form['pullrequest'] = array(
        '#type' => 'fieldset',
        '#title' => 'Push to Production',
      );
      $form['pullrequest']['info'] = array(
        '#markup' => '<p>When you are ready to move changes to production, clicking the button below will push your theme customizations to GitHub.</p>',
      );
      $args = array(
        '!DevtoProd' => l(t('Migrate Development DB to Production'), 'http://jenkins.pgcalc.com:8080/job/Migrate%20Development%20DB%20to%20Production/'),
        '!BuildtoProd' => l(t('Build to Prod'), 'http://jenkins.pgcalc.com:8080/job/Build%20to%20Prod/'),
        '%site_system_name' => $site_system_name,
        '%email' => variable_get('ptg_email', 'apalmer@pgcalc.com'),
        '!config' => l(t('configuration page'), 'admin/config/push-to-git'),
      );
      $form['pullrequest']['db'] = array(
        '#markup' => '<p>' . t('If you have new or modified pages for this site, and want to push those to production as well, then use the !DevtoProd Jenkins task. The <strong>site_system_name</strong> is %site_system_name.', $args) . '</p>',
      );
      $form['pullrequest']['config'] = array(
        '#markup' => '<p>' . t('When you deploy to production, an e-mail will be sent to %email. If you want to update this, first visit the Push to Git !config.', $args) . '</p>',
      );
      $form['pullrequest']['build'] = array(
        '#markup' => '<p>' . t('After pushing your updates to GitHub, you can use the !BuildtoProd Jenkins task to push your updates to the production server. The <strong>site_system_name</strong> is %site_system_name.', $args) . '</p>',
      );
      $form['pullrequest']['submit'] = array(
        '#type' => 'submit',
        '#value' => 'Deploy to Production',
      );
    }
  }
  return $form;
}

/**
 * Form submit function.
 */
function push_to_git_form_submit($form, $form_state) {
  // The pull request button is available only if all changes have
  // already been pushed to git.
  if (isset($form['pullrequest'])) {
    if ($form_state['values']['db']) {
      $move_database = TRUE;
    }
    else {
      $move_database = FALSE;
    }
    $result = push_to_git_pull_request($move_database);
  }
  else {
    $result = push_to_git_push();
  }

  drupal_set_message($result[0], $result[1]);
}
