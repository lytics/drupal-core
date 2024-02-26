// ContentRecommendation.ts

import { DrupalSettings } from "../types/drupalTypes";
import { getRecommendation } from "./api/getRecommendation";

// Ensure Drupal and drupalSettings are recognized
declare const Drupal: any;
declare const drupalSettings: any;

export class ContentRecommendation {
  private static attached: boolean = false;

  public static attach(context: HTMLElement, settings: DrupalSettings): void {
    if (!ContentRecommendation.attached) {
      ContentRecommendation.attached = true;
      console.log("Rendering content recommendations.");

      const populateRecommendation = async (entity: any): Promise<void> => {
        const uid = entity?.data?.user?._uid;
        const accountId = settings?.lytics?.account_id;
        const collection = settings?.lytics?.content_collection_id;
        const maxItems = settings?.lytics?.number_of_recommendations;

        console.log("Max items:", maxItems);

        try {
          const data = await getRecommendation(accountId, uid, collection);
          const recContainer = document.querySelector("#rec-container");

          if (recContainer) {
            recContainer.innerHTML = "";

            let count = 0;

            // handle invalid response due to no recommendation or error
            if (!data || data.length === 0) {
              recContainer.innerHTML = "No recommendations available.";
              return;
            }

            data.forEach((rec: any) => {
              if (count >= maxItems) {
                return;
              }

              const recItem = document.createElement("div");

              recItem.classList.add(
                "flex-container",
                "flex-column",
                "justify-start",
                "align-stretch",
                "flex-1",
                "gap-small"
              );

              const img = document.createElement("img");
              img.classList.add("rec-img");
              img.src = rec.imageurls[0];
              img.alt = `Image of ${rec.title}`;
              recItem.appendChild(img);

              const recTitle = document.createElement("div");
              recTitle.classList.add("rec-title");
              recItem.appendChild(recTitle);

              const titleLink = document.createElement("a");
              titleLink.href = rec.url;
              titleLink.innerHTML = `<strong>${rec.title}</strong>`;
              recTitle.appendChild(titleLink);

              const description = document.createElement("p");
              description.classList.add("rec-description");
              description.textContent = rec.description;
              recItem.appendChild(description);

              recContainer.appendChild(recItem);

              count++;
            });
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };

      (window as any).jstag.call("entityReady", populateRecommendation);
    }
  }
}

// Define a Drupal behavior using the class above
Drupal.behaviors.contentRecommendation = {
  attach: ContentRecommendation.attach,
};
