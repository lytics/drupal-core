# Lytics
The Lytics module integrates your Drupal site with the Lytics Decision Engine, enabling personalized user experiences and leveraging data-driven insights. This integration simplifies adding Lytics' powerful JavaScript tag to your site, facilitating advanced analytics and personalized user tracking capabilities with minimal effort.

## Features
- Easy Integration: Embed the Lytics JavaScript tag into your Drupal site through the admin interface.
- Enable/Disable Toggle: Quickly enable or disable Lytics tracking for your site.
- Configurable Tag ID: Input your unique Lytics tag ID via the Drupal admin UI.
- Debug Mode: Switch between the minified and full versions of the Lytics script for debugging.

## Installation

### Prerequisites
- A Drupal site running on version 10.x.
- A Lytics account and a corresponding Tag ID.

### Composer Installation (Recommended)
If your Drupal site is managed via Composer, you can add the module as a dependency:

```bash
composer require 'drupal/lytics'
```

Then enable the module:
```bash
drush en lytics -y
```

### Configure the Module: 
1. Navigate to the module configuration page (/admin/config/system/lytics).
1. Enable or disable the Lytics integration.
1. Enter your unique Lytics Tag ID.
1. Toggle the Debug mode for the Lytics script.

### Usage
Once configured, the Lytics JavaScript tag will be automatically added to the pages of your Drupal site, enabling Lytics to track user interactions and provide personalized experiences based on collected data.

## Additional Requirements

This module does not require any additional modules beyond Drupal core. However, a valid Lytics account and Tag ID are necessary to utilize the integration.

## Support
For bugs, feature requests, or contributions, please use the Drupal.org issue queue for the Lytics module. Your feedback and contributions are welcome to help improve this module.

## License
This project is licensed under the GNU General Public License v2.0 or later.

## Acknowledgements
This module was created to simplify the integration of Drupal sites with the Lytics Decision Engine, aiming to enhance web personalization and analytics capabilities without extensive development effort.