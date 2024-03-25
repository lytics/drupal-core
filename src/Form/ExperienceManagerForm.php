<?php

namespace Drupal\lytics\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\lytics\Entity\LyticsExperience;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Component\Serialization\Json;

class ExperienceManagerForm extends FormBase
{

  /**
   * The messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * Constructs a new ExperienceManagerForm object.
   *
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   */
  public function __construct(MessengerInterface $messenger)
  {
    $this->messenger = $messenger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'experience_manager_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, LyticsExperience $lytics_experience = NULL)
  {
    $config = \Drupal::config('lytics.settings');
    $accountID = $config->get('account_id');
    $apitoken = $config->get('apitoken');

    // dump lytics_experience values to see what is available
    // if ($lytics_experience) {
    //   var_dump($lytics_experience->getTitle());
    //   var_dump($lytics_experience->getDescription());
    //   var_dump($lytics_experience->getConfiguration());
    // }

    // Form elements definition.
    $form['id'] = [
      '#type' => 'hidden',
      '#value' => $lytics_experience ? $lytics_experience->id() : NULL,
    ];

    $form['title'] = [
      '#type' => 'hidden',
      '#title' => $this->t('Title'),
      '#required' => TRUE,
      '#default_value' => $lytics_experience ? $lytics_experience->getTitle() : '',
      '#attributes' => [
        'id' => 'edit-title',
      ],
    ];

    $form['description'] = [
      '#type' => 'hidden',
      '#title' => $this->t('Description'),
      '#rows' => 2,
      '#required' => FALSE,
      '#default_value' => $lytics_experience ? $lytics_experience->getDescription() : '',
      '#attributes' => [
        'id' => 'edit-description',
      ],
    ];

    $form['config'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Configuration'),
      '#required' => FALSE,
      '#rows' => 10,
      '#element_validate' => [
        [$this, 'validateJson'],
      ],
      '#default_value' => $lytics_experience ? $lytics_experience->getConfiguration() : '',
      '#attributes' => [
        'id' => 'edit-configuration',
      ],
    ];

    $form['experience_wizard'] = [
      '#markup' => '<div id="experience-wizard-wrapper"></div>',
      '#attached' => [
        'library' => [
          'lytics/lytics-experience-wizard',
          'lytics/lytics-styles',
        ],
        'drupalSettings' => [
          'lytics' => [
            'account_id' => $accountID,
            'access_token' => $apitoken,
            'pathfora_config' => $lytics_experience ? $lytics_experience->getConfiguration() : '',
            // 'experienceWizard' => [
            //   'type' => 'module',
            // ],
          ]
        ],
      ],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  // Add a custom validation callback to ensure the input is valid JSON.
  public function validateJson($element, FormStateInterface $form_state)
  {
    $value = $form_state->getValue('configuration');
    if (!empty($value)) {
      $decoded = json_decode($value);
      if ($decoded === null) {
        $form_state->setError($element, $this->t('The configuration must be valid JSON.'));
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    // Save form submission as a Lytics Experience entity.
    $values = $form_state->getValues();

    // Validate and encode the configuration data to JSON.
    // $configuration_json = $values['configuration'];
    // $decoded_configuration = Json::decode($configuration_json);
    // if ($decoded_configuration === null) {
    //   // Configuration data is not valid JSON.
    //   $this->messenger->addError($this->t('The configuration must be valid JSON.'));
    //   return;
    // }

    // If an entity ID is present, load the entity for editing; otherwise, create a new one.
    $entity = !empty($values['id']) ? LyticsExperience::load($values['id']) : LyticsExperience::create();
    $entity->setTitle($values['title']);
    $entity->setDescription($values['description']);
    $entity->setConfiguration($values['config']);
    $entity->save();

    // Use messenger service to display a success message.
    $this->messenger->addMessage($this->t('Lytics Experience saved successfully.'));

    $form_state->setRedirect('lytics.manage_web_experiences');
  }
}
