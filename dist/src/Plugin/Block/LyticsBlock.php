<?php

namespace Drupal\Lytics\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'Lytics' Block.
 *
 * @Block(
 *   id = "lytics_block",
 *   admin_label = @Translation("Hello World Block"),
 *   category = @Translation("Custom"),
 * )
 */
class LyticsHelloWorldBlock extends BlockBase implements BlockPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = $this->getConfiguration();

    // Use the configuration value if set and not empty, otherwise default to "No text available."
    $text_string = !empty($config['text_block']) ? $config['text_block'] : '';

    return [
      '#markup' => '
        <div class="rec-container"></div>
        <div>' . $text_string . '</div>
      ',
      '#attached' => [
        'library' => [
          'hello_world/hello-world-js',
          'hello_world/hello-world-styles',
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    // Default configuration
    $config = $this->getConfiguration();

    // Add a text field to the block configuration form
    $form['text_block'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Sample Text'),
      '#description' => $this->t('Enter the text you want to display in the Lytics block.'),
      '#default_value' => isset($config['text_block']) ? $config['text_block'] : '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    // Save the configuration
    $this->setConfigurationValue('text_block', $form_state->getValue('text_block'));
  }

}
