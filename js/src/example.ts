import { DrupalSettings } from "./types/drupalTypes";

// Ensure Drupal and drupalSettings are recognized
declare const Drupal: any;

export class ExampleFunc {
  private static attached: boolean = false;
  public static attach(context: HTMLElement, settings: DrupalSettings): void {
    if (!ExampleFunc.attached) {
      ExampleFunc.attached = true;
      console.log("Rendering example JS.");
    }
  }
}

// Define a Drupal behavior using the class above
Drupal.behaviors.contentRecommendation = {
  attach: ExampleFunc.attach,
};
