<?php

namespace Drupal\Lytics\Controller;

use Drupal\Core\Controller\ControllerBase;

class LyticsController extends ControllerBase {
  public function lyticsHelloWorld() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello From Lytics'),
    ];
  }
}
