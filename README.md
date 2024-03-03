# Lytics Drupal Module for Drupal 10+

The Lytics Drupal Module seamlessly integrates Drupal 10+ with the Lytics Customer Data Platform (CDP). This integration empowers site administrators to leverage extensive visitor data and personalization capabilities, enhancing user experiences and building a robust first-party data asset within their Drupal site. This README provides detailed instructions for installing, configuring, and developing the Lytics module on Drupal 10+.

## Features

- **Installation:** Install the Lytics module effortlessly, enabling seamless synchronization of user data between Drupal and the Lytics platform.
- **Data Collection:** Collect comprehensive visitor data from your Drupal site in real-time, enriching your Lytics customer profiles.
- **Identity Resolution:** Unify user identities across devices and sessions, leveraging Lytics to dynamically personalize site content based on comprehensive user data and segments.
- **Behavioral Insights:** Gain deep insights into user behavior, allowing for dynamic content personalization based on actionable data and user segments identified by Lytics.
- **Content Personalization:** Enhance user experience by dynamically personalizing site content, tailored to individual user preferences and behaviors as understood by Lytics.
- **Content Recommendation:** Improve engagement and user retention through intelligent content recommendations, powered by Lytics' deep learning about user preferences and behaviors.
- **Lytics Management:** Integrate Lytics analytics directly into your Drupal dashboard, providing powerful insights for informed decision-making and strategic planning.

## Requirements

- Drupal 10.x or higher
- PHP 7.4 or higher
- A valid Lytics account

## Installation

1. **Download the Module**: Obtain the latest version of the Lytics module from the Drupal.org project page or clone this repository to your local machine.
2. **Place the Module**: Transfer the Lytics module to your Drupal site's `modules/contrib/` directory, as this is the recommended location for contributed modules in Drupal 10+. Note: This module utilizes Vite for its build process, which results in the creation of a `dist` directory. This `dist` directory should be considered the actual module directory. Additional details are provided below.
3. **Activate the Module**: Use the Drupal admin panel to navigate to the *Extend* page, locate the `Lytics` module, and activate it.

## Configuration

1. **Acquire Lytics API Token**: Your Lytics [API Token](https://docs.lytics.com/docs/access-tokens#deleting-an-existing-api-token) can be found within your account settings on the Lytics platform.
2. **Module Settings**: Access the Lytics module settings via the Drupal admin panel. Enter your Lytics API Token and configure any additional settings as needed.

## Development Setup

Follow these steps to prepare a development environment for the Lytics module:

1. **Install Yarn**: Ensure that `yarn` is installed on your development machine.
2. **Repository Cloning**: Clone the Lytics module repository to a suitable location outside your Drupal installation.
    ```sh
    git clone https://github.com/lytics/drupal-core.git
    ```
3. **Dependency Installation**: Navigate to the cloned module directory and run `yarn install` to install dependencies.
    ```sh
    cd drupal-core
    yarn install
    ```
4. **Development Build**: Compile development assets using `yarn`.
    ```sh
    yarn dev:build
    ```
5. **Symlink Creation**: Establish a symlink in your Drupal `modules/contrib/` directory pointing to your development copy of the Lytics module. This enables live testing without needing to copy files.
    ```sh
    ln -s /path/to/drupal-core /path/to/drupal/modules/contrib/lytics
    ```
6. **Cache Clearing**: Clear Drupal's cache to ensure the newly linked module is recognized by Drupal.
    ```sh
    drush cache:rebuild
    ```

## How to Contribute

We welcome contributions to the Lytics Drupal module! To contribute:

1. **Fork and Branch**: Fork the repository on GitHub and create a new branch for your feature or bug fix.
2. **Implement Changes**: Make your changes in your branch.
3. **Push Changes**: Push your changes to your GitHub fork.
4. **Submit a Pull Request**: Open a pull request from your fork to the main repository.

## Support

For module support, please open an issue on the GitHub project page. For Lytics platform support, contact Lytics customer support directly.

## License

This project is licensed under the [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html) license. See the LICENSE file in the repository for complete details.
