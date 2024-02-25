declare var Drupal: any;

interface DrupalBehavior {
  attach: (context: HTMLElement | Document, settings: any) => void;
}

const myCustomBehavior: DrupalBehavior = {
  attach: function (context: HTMLElement | Document, settings: any) {
    alert("Hello, World!");
  },
};

// Attach the behavior.
Drupal.behaviors.myCustomBehavior = myCustomBehavior;
