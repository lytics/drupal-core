<?php

namespace Drupal\lytics\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a form that configures Lytics settings.
 */
class LyticsSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'lytics.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'lytics_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('lytics.settings');

    $form['enabled'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Lytics Integration'),
      '#default_value' => $config->get('enabled'),
      '#description' => $this->t('Enable or disable Lytics integration.'),
    ];

    // Grouped fields.
    $form['settings'] = [
      '#type' => 'details',
      '#title' => $this->t('Lytics Settings'),
      '#open' => TRUE,
      // Use the #states property to make this group visible only if 'enabled' is checked.
      '#states' => [
        'visible' => [
          ':input[name="enabled"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $form['settings']['tag_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Lytics Tag ID'),
      '#default_value' => $config->get('tag_id'),
      '#description' => $this->t('Enter the unique Lytics tag ID.'),
    ];

    $form['settings']['debug_mode'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Debug Mode'),
      '#default_value' => $config->get('debug_mode'),
      '#description' => $this->t('Load the non-minified version of the Lytics JavaScript for debugging.'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('lytics.settings')
      ->set('enabled', $form_state->getValue('enabled'))
      ->set('tag_id', $form_state->getValue('tag_id'))
      ->set('debug_mode', $form_state->getValue('debug_mode'))
      ->save();

    parent::submitForm($form, $form_state);
  }
}
