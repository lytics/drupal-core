<?php

namespace Drupal\lytics\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class SettingsForm extends ConfigFormBase
{

  protected function getEditableConfigNames()
  {
    return ['lytics.settings'];
  }

  public function getFormId()
  {
    return 'lytics_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $config = $this->config('lytics.settings');
    $existingToken = $config->get('apitoken');

    // Handle on by default
    $enableTagDefaultValue = $config->get('enable_tag');
    if ($enableTagDefaultValue === NULL) {
      $enableTagDefaultValue = TRUE; // Default to true if not yet configured.
    }

    $form['apitoken'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Access Token'),
      '#description' => $this->t('Enter Lytics Access Token. Additional guidance on creating and managing Lytics Access Tokens is available in our <a href=":href" target="_blank">documentation</a>.', [':href' => 'https://docs.lytics.com/docs/access-tokens#creating-a-new-api-token']),
      '#default_value' => $existingToken,
      '#required' => TRUE,
      '#attributes' => ['class' => ['js-password-field']],
    ];

    // Display saved account details if available
    if ($config->get('account_id') && $config->get('account_name') && $config->get('domain')) {
      $form['account_details'] = [
        '#type' => 'details',
        '#title' => $this->t('Account Details'),
        '#open' => TRUE,
        'account_name' => [
          '#type' => 'item',
          '#title' => $this->t('Account Name'),
          '#markup' => $config->get('account_name'),
        ],
        'account_id' => [
          '#type' => 'item',
          '#title' => $this->t('Account ID'),
          '#markup' => $config->get('account_id'),
        ],
        'domain' => [
          '#type' => 'item',
          '#title' => $this->t('Domain'),
          '#markup' => $config->get('domain'),
        ],
      ];
    }

    $tagConfig = $config->get('tag_config');
    $prettyJson = $tagConfig ? json_encode(json_decode($tagConfig, TRUE), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) : '';

    $form['tag_configuration'] = [
      '#type' => 'details',
      '#title' => $this->t('Tag Configuration'),
      '#open' => true,
      'enable_tag' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Enable Tag'),
        '#default_value' => $enableTagDefaultValue,
        '#description' => $this->t('Enable the Lytics JavaScript tag.'),
      ],
      'debug_mode' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Enable Debug Mode'),
        '#default_value' => $config->get('debug_mode'),
        '#description' => $this->t('Enable debug mode for extra logging and non-minifed Lytics tag.'),
      ],
      'ignore_admin_users' => [
        '#type' => 'checkbox',
        '#title' => $this->t('Ignore Admin Users'),
        '#default_value' => $config->get('ignore_admin_users'),
        '#description' => $this->t('When activated Lytics will not be installed for users who are actively logged in to Drupal. This may prevent testing of personalization and recommendation features but also may prevent skewing of analytics data.'),
      ],
      'tag_config' => [
        '#type' => 'textarea',
        '#title' => $this->t('Additional Tag Configuration'),
        '#default_value' => $prettyJson,
        '#description' => $this->t('Enter the configuration in JSON format.'),
        '#rows' => 15,
        '#attributes' => ['placeholder' => json_encode(["pageAnalysis" => ["dataLayerPull" => ["disabled" => true]]], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)],
      ],
    ];

    return parent::buildForm($form, $form_state);
  }

  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    parent::validateForm($form, $form_state);

    $json_input = $form_state->getValue('tag_config');
    if ($json_input && json_decode($json_input) === NULL && json_last_error() !== JSON_ERROR_NONE) {
      $form_state->setErrorByName('tag_config', $this->t('The JSON configuration is not valid JSON.'));
    }

    $token = $form_state->getValue('apitoken');
    $accountDetails = $this->fetchAccountDetails($token);

    if ($accountDetails === FALSE) {
      $form_state->setErrorByName('apitoken', $this->t('Failed to fetch account details for the provided token. Please check the log for more information.'));
    } else {
      $form_state->set('account_details', $accountDetails);
    }
  }

  protected function fetchAccountDetails($token)
  {
    if (empty($token)) {
      return FALSE;
    }

    $client = \Drupal::httpClient();
    try {
      $response = $client->get('https://api.lytics.io/api/account', ['headers' => ['Authorization' => $token]]);
      if ($response->getStatusCode() === 200) {
        $data = json_decode($response->getBody(), TRUE);
        if (isset($data['data']) && count($data['data']) > 0 && isset($data['data'][0]['name'], $data['data'][0]['id'], $data['data'][0]['domain'])) {
          return [
            'name' => $data['data'][0]['name'],
            'id' => $data['data'][0]['id'],
            'domain' => $data['data'][0]['domain'],
          ];
        }
      }
    } catch (\Exception $e) {
      \Drupal::logger('lytics')->error('Failed to fetch account details: @message', ['@message' => $e->getMessage()]);
      return FALSE;
    }
    return FALSE;
  }

  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    $accountDetails = $form_state->get('account_details');

    $config = $this->config('lytics.settings');
    $config->set('apitoken', $form_state->getValue('apitoken'))
      ->set('tag_config', $form_state->getValue('tag_config'))
      ->set('enable_tag', $form_state->getValue('enable_tag'))
      ->set('debug_mode', $form_state->getValue('debug_mode'))
      ->set('ignore_admin_users', $form_state->getValue('ignore_admin_users'))
      ->set('account_name', $accountDetails['name'])
      ->set('account_id', $accountDetails['id'])
      ->set('domain', $accountDetails['domain'])
      ->save();

    parent::submitForm($form, $form_state);
  }
}
