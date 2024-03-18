<?php

namespace Drupal\lytics\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Component\Serialization\Json;


/**
 * Defines the Lytics Experience entity.
 *
 * @ContentEntityType(
 *   id = "lytics_experience",
 *   label = @Translation("Lytics Experience"),
 *   handlers = {
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "form" = {
 *       "default" = "Drupal\lytics\Form\ExperienceManagerForm",
 *       "add" = "Drupal\lytics\Form\ExperienceManagerForm",
 *       "edit" = "Drupal\lytics\Form\ExperienceManagerForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm"
 *     }
 *   },
 *   base_table = "lytics_experience",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "title",
 *   },
 *   links = {
 *     "canonical" = "/lytics_experience/{lytics_experience}",
 *     "add-form" = "/lytics_experience/add",
 *     "edit-form" = "/lytics_experience/{lytics_experience}/edit",
 *     "delete-form" = "/lytics_experience/{lytics_experience}/delete",
 *   }
 * )
 */
class LyticsExperience extends ContentEntityBase
{

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type)
  {
    $fields['id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setDescription(t('The ID of the Lytics Experience entity.'))
      ->setReadOnly(TRUE);

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('The title of the Lytics Experience entity.'))
      ->setSettings([
        'default_value' => '',
        'max_length' => 255,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => 0,
      ]);

    $fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the Lytics Experience entity.'))
      ->setDisplayOptions('form', [
        'type' => 'text_textarea',
        'weight' => 1,
      ]);

    $fields['config'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Config'))
      ->setDescription(t('The configuration of the Lytics Experience entity.'))
      ->setDisplayOptions('form', [
        'type' => 'text_textarea',
        'weight' => 2,
      ]);

    return $fields;
  }

  /**
   * Sets the title of the LyticsExperience entity.
   *
   * @param string $title
   *   The title of the entity.
   */
  public function setTitle($title)
  {
    $this->set('title', $title);
  }

  /**
   * Sets the description of the LyticsExperience entity.
   *
   * @param string $description
   *   The description of the entity.
   */
  public function setDescription($description)
  {
    $this->set('description', $description);
  }

  /**
   * Sets the configuration of the LyticsExperience entity.
   *
   * @param string $configuration
   *   The configuration of the entity.
   */
  public function setConfiguration($configuration)
  {
    $this->set('config', $configuration);
  }

  /**
   * Gets the title of the LyticsExperience entity.
   *
   * @return string
   *   The title of the entity.
   */
  public function getTitle()
  {
    return $this->get('title')->value;
  }

  /**
   * Gets the description of the LyticsExperience entity.
   *
   * @return string
   *   The description of the entity.
   */
  public function getDescription()
  {
    return $this->get('description')->value;
  }

  /**
   * Gets the configuration of the LyticsExperience entity.
   *
   * @return string
   *   The configuration of the entity.
   */
  public function getConfiguration()
  {
    return $this->get('config')->value;
  }
}
