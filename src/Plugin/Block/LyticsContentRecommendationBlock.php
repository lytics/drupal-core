<?php

namespace Drupal\lytics\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'Content Recommendation' Block from Lytics.
 *
 * @Block(
 *   id = "lytics_content_recommendation_block",
 *   admin_label = @Translation("Lytics Content Recommendation"),
 *   category = @Translation("Lytics"),
 * )
 */
class LyticsContentRecommendationBlock extends BlockBase implements BlockPluginInterface
{

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    $config = $this->getConfiguration();
    $textString = !empty($config['text_block']) ? $config['text_block'] : 'No recommendations available.';

    return [
      '#markup' => '
        <div class="rec-container">' . $textString . '</div>
      ',
      '#attached' => [
        'library' => [
          'lytics/lytics-js',
          'lytics/lytics-styles',
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state)
  {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();

    $form['text_block'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Content Recommendation Text'),
      '#description' => $this->t('Enter the text or HTML for content recommendations.'),
      '#default_value' => $config['text_block'] ?? '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state)
  {
    $this->setConfigurationValue('text_block', $form_state->getValue('text_block'));
  }
}
