<?php

namespace Drupal\lytics\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\lytics\Entity\LyticsExperience;

class LyticsExperienceController extends ControllerBase
{
  public function manageExperiencesListPage()
  {
    $build = [
      '#markup' => '',
    ];

    $experiences = LyticsExperience::loadMultiple();

    // Build the table
    $headers = [
      'title' => $this->t('Title'),
      'description' => $this->t('Description'),
      'edit' => $this->t('Edit'),
    ];

    $rows = [];
    foreach ($experiences as $experience) {
      $editUrl = Url::fromRoute('lytics.manage_web_experiences.edit', ['lytics_experience' => $experience->id()]);
      $rows[] = [
        'title' => $experience->getTitle(),
        'description' => $experience->getDescription(),
        'edit' => [
          'data' => [
            '#type' => 'link',
            '#title' => $this->t('Edit'),
            '#url' => $editUrl,
          ],
        ],
      ];
    }

    $build['existing_experiences'] = [
      '#theme' => 'table',
      '#header' => $headers,
      '#rows' => $rows,
      '#empty' => $this->t('No experiences found.'),
    ];

    return $build;
  }
}
