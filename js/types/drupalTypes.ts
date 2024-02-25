// drupalTypes.ts

declare global {
  interface Window {
    Drupal: any;
    drupalSettings: any;
  }
}

declare const Drupal: any;

export interface LyticsSettings {
  account_id: string;
}

export interface DrupalSettings {
  lytics?: LyticsSettings;
}

export interface DrupalBehaviors {
  [behaviorName: string]: {
    attach: (context: HTMLElement, settings: DrupalSettings) => void;
  };
}
