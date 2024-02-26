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
  content_collection_id: string;
  number_of_recommendations: number;
}

export interface DrupalSettings {
  lytics?: LyticsSettings;
}

export interface DrupalBehaviors {
  [behaviorName: string]: {
    attach: (context: HTMLElement, settings: DrupalSettings) => void;
  };
}
