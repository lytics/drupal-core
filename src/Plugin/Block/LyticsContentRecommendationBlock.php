<?php

namespace Drupal\lytics\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides a 'Content Recommendation' Block from Lytics.
 *
 * @Block(
 *   id = "lytics_content_recommendation_block",
 *   admin_label = @Translation("Lytics Content Recommendation"),
 *   category = @Translation("Lytics"),
 * )
 */
class LyticsContentRecommendationBlock extends BlockBase
{

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    $config = $this->getConfiguration();
    $textString = 'No recommendations available.';

    return [
      '#markup' => '<div class="flex-container justify-between align-stretch flex-wrap gap-medium" id="rec-container">' . $textString . '</div>',
      '#attached' => [
        'library' => [
          'lytics/lytics-inline-recommendation',
          'lytics/lytics-styles',
        ],
        'drupalSettings' => [
          'lytics' => [
            'content_collection_id' => $config['content_collection'],
            'number_of_recommendations' => $config['number_of_recommendations'],
          ],
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

    // Fetch content collection options.
    $options = $this->getContentCollectionOptions();

    // Content Collection Selection
    $form['content_collection'] = [
      '#type' => 'select',
      '#title' => $this->t('Which Content Collection would we recommend from?'),
      '#description' => $this->t('Content Collections allow you to control the rules for what content is recommended. For more detail on how to create and manage Content Collections, visit the <a href=":url" target="_blank">Lytics documentation</a>.', [':url' => 'https://docs.lytics.com/docs/content-collections#building-a-content-collection']),
      '#default_value' => $config['content_collection'] ?? 'content_with_images',
      '#options' => $options,
    ];

    // Number of Recommenations to Show
    $form['number_of_recommendations'] = [
      '#type' => 'select',
      '#title' => $this->t('How many recommendations would you like to show?'),
      '#description' => $this->t('The number of recommendations to show in the block.'),
      '#default_value' => $config['number_of_recommendations'] ?? 3,
      '#options' => [
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 5,
      ],
    ];

    return $form;
  }

  /**
   * Helper function to fetch content collection options.
   */
  public function getContentCollectionOptions()
  {
    // Get main settings for module and set apiToken.
    $config = \Drupal::config('lytics.settings')->get();
    $apiToken = $config['apitoken'];

    // Get available collections.
    $url = 'https://api.lytics.io/v2/segment?table=content&key=' . $apiToken;
    $response = \Drupal::httpClient()->get($url, [
      'headers' => [
        'Authorization' => $config['apitoken'],
      ],
    ]);

    $data = json_decode($response->getBody(), TRUE);
    $options = [];

    foreach ($data['data'] as $collection) {
      $options[$collection['slug_name']] = $collection['name'];
    }

    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state)
  {
    $this->setConfigurationValue('content_collection', $form_state->getValue('content_collection'));
    $this->setConfigurationValue('number_of_recommendations', $form_state->getValue('number_of_recommendations'));
  }
}
