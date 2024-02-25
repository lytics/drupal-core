import { DrupalSettings } from "./types/drupalTypes";

// Ensure Drupal and drupalSettings are recognized
declare const Drupal: any;
declare const drupalSettings: any;

interface Recommendation {
  url: string;
  title: string;
  imageurls: string[];
  description: string;
}

export class ContentRecommendation {
  private static attached: boolean = false;
  public static attach(context: HTMLElement, settings: DrupalSettings): void {
    if (!ContentRecommendation.attached) {
      ContentRecommendation.attached = true;
      console.log("Rendering content recommendations.");

      const populateRecommendation = (entity: any): void => {
        const uid = entity?.data?.user?._uid;

        fetch(
          `https://api.lytics.io/api/content/recommend/${settings?.lytics?.account_id}/user/_uids/${uid}?contentsegment=content_with_images`
        )
          .then((response) => response.json())
          .then((data: { data: Recommendation[] }) => {
            const recContainer = document.querySelector(".rec-container");
            if (recContainer) {
              recContainer.innerHTML = "";

              let count = 0;
              data.data.forEach((rec: Recommendation) => {
                if (count >= 3) {
                  return;
                }

                const recItem = document.createElement("div");
                recItem.classList.add("rec-item");

                const recTitle = document.createElement("div");
                recTitle.classList.add("rec-title");
                recItem.appendChild(recTitle);

                const titleLink = document.createElement("a");
                titleLink.href = rec.url;
                titleLink.innerHTML = `<strong>${rec.title}</strong>`;
                recTitle.appendChild(titleLink);

                const img = document.createElement("img");
                img.classList.add("rec-img");
                img.src = rec.imageurls[0];
                img.alt = `Image of ${rec.title}`;
                recItem.appendChild(img);

                const description = document.createElement("p");
                description.classList.add("rec-description");
                description.textContent = rec.description;
                recItem.appendChild(description);

                recContainer.appendChild(recItem);

                count++;
              });
            }
          });
      };

      (window as any).jstag.call("entityReady", populateRecommendation);
    }
  }
}

// Define a Drupal behavior using the class above
Drupal.behaviors.contentRecommendation = {
  attach: ContentRecommendation.attach,
};
