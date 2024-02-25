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
    $textString = 'No recommendations available.';

    return [
      '#markup' => '
        <div class="rec-container">' . $textString . '</div>
      ',
      '#attached' => [
        'library' => [
          'lytics/lytics-inline-recommendation',
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

    $form['content_collection'] = [
      '#type' => 'select',
      '#title' => $this->t('Preferred Content Collection'),
      '#description' => $this->t('Select the collection of content to make a recommendation from.'),
      '#options' => [
        'content_with_images' => $this->t('Content With Images'),
        'content_all' => $this->t('All Content'),
      ],
      '#default_value' => $config['content_collection'] ?? 'content_with_images',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state)
  {
    $this->setConfigurationValue('content_collection', $form_state->getValue('content_collection'));
  }
}
