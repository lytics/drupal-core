import React, { useEffect, useState, useRef } from "react";
import { Stack } from "@mui/material";
import { FieldConfig } from "./form-fields";
import { TextAreaInput } from "./components/form/textarea";
import { TextInput } from "./components/form/input";
import { CheckboxInput } from "./components/form/checkbox";
import { SelectInput } from "./components/form/select";
import { ColorInput } from "./components/form/color";

const components = {
  input: TextAreaInput,
  textarea: TextAreaInput,
  checkbox: CheckboxInput,
  select: SelectInput,
  color: ColorInput,
};

const ExperienceWizard: React.FC = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleChange = (fieldId: string, value: string) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldId]: value,
    }));

    // Check if the inbound change has any dependencies and if it does unhide them or hide them
    const field = FieldConfig.find((field) => field.id === fieldId);
    if (field?.dependencies) {
      field.dependencies.forEach((dependency) => {
        let dependencyMet = false;

        if (field.type === "boolean") {
          if (dependency.value.toString() === value) {
            dependencyMet = true;
          }
        }
        if (field.type === "string") {
          if (dependency.value === value) {
            dependencyMet = true;
          }
        }

        // If the dependency is met, unhide the fieldsToShow
        if (dependencyMet) {
          dependency.fieldsToShow.forEach((id) => {
            const dependentField = document.getElementById(
              `field-${id}`
            ) as HTMLInputElement;
            if (dependentField) {
              dependentField.classList.remove("hidden");
            }
          });
        } else {
          // If the dependency is not met, hide the fieldsToShow
          dependency.fieldsToShow.forEach((id) => {
            const dependentField = document.getElementById(
              `field-${id}`
            ) as HTMLInputElement;
            if (dependentField) {
              dependentField.classList.add("hidden");
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    const editConfig = document.getElementById(
      "edit-configuration"
    ) as HTMLInputElement;
    if (editConfig) {
      editConfig.value = JSON.stringify(formValues, null, 2);
    }
  }, [formValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData: { [key: string]: string } = {};
    FieldConfig.forEach((field) => {
      const inputElement = document.getElementById(
        field.id
      ) as HTMLInputElement;
      formData[field.id] = inputElement.value;
    });
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {FieldConfig.map((field, index) => {
          const Component = components[field.method];
          if (Component) {
            return (
              <React.Suspense fallback={null} key={index}>
                <Component
                  field={field}
                  formValues={formValues}
                  handleChange={handleChange}
                />
              </React.Suspense>
            );
          }
          return null;
        })}
      </Stack>
    </form>
  );
};

export default ExperienceWizard;

// import { DrupalSettings } from "../../types/drupalTypes";
// import { FieldConfig, Field } from "./form-fields";

// declare const Drupal: any;

// export class ExperienceWizard {
//   private static attached: boolean = false;

//   public static attach(context: HTMLElement, settings: DrupalSettings): void {
//     if (!ExperienceWizard.attached) {
//       ExperienceWizard.attached = true;
//       console.log("Rendering experience wizard.");

//       const generateForm = (containerId: string): void => {
//         const container = document.getElementById(containerId);
//         if (!container) {
//           console.error(`Container with id '${containerId}' not found.`);
//           return;
//         }

//         const formHtml = `
//           <form>
//             ${FieldConfig.map((field) => createFieldHtml(field)).join("")}
//             <button type="submit">Submit</button>
//           </form>
//         `;

//         container.innerHTML = formHtml;
//         const form = container.querySelector("form");
//         form?.addEventListener("submit", handleSubmit);

//         // Add event listeners to input elements controlling field visibility
//         FieldConfig.forEach((field) => {
//           field.dependencies?.forEach((dependency) => {
//             const dependentInput = document.getElementById(
//               field.id
//             ) as HTMLInputElement;
//             if (dependentInput) {
//               dependentInput.addEventListener("change", () => {
//                 updateFieldVisibility(field, dependentInput);
//               });
//             }
//           });
//         });

//         // Initial visibility check
//         FieldConfig.forEach((field) => {
//           field.dependencies?.forEach((dependency) => {

//             const dependentInput = document.getElementById(field.id) as HTMLInputElement;
//             if (dependentInput) {
//               updateFieldVisibility(field, dependentInput);
//             }
//           });
//         });
//       };

//       const createFieldHtml = (field: Field): string => {
//         let inputHtml: string;
//         if (field.method === "select") {
//           inputHtml = createSelectHtml(field);
//         } else if (field.method === "color") {
//           inputHtml = createColorInputHtml();
//         } else {
//           inputHtml = createRegularInputHtml(field);
//         }

//         const hiddenClass = field.hidden ? " hidden" : "";

//         // Add an id to each field div for easier access
//         return `
//           <div id="field-${field.id}" class="form-field${hiddenClass}">
//             <label for="${field.id}">${field.label}</label>
//             ${inputHtml}
//           </div>
//         `;
//       };

//       const createSelectHtml = (field: Field): string => {
//         return `
//           <select id="${field.id}" ${field.required ? "required" : ""}>
//             ${field.options
//               ?.map((option) => `<option value="${option}">${option}</option>`)
//               .join("")}
//           </select>
//         `;
//       };

//       const createColorInputHtml = (): string => {
//         return `<input type="color">`;
//       };

//       const createRegularInputHtml = (field: Field): string => {
//         return `<input type="${field.method}" id="${field.id}" ${
//           field.required ? "required" : ""
//         }>`;
//       };

//       const updateFieldVisibility = (
//         field: Field,
//         dependentInput: HTMLInputElement
//       ) => {
//         const dependenciesMet = field.dependencies?.every((dependency) => {
//           return dependentInput.value === dependency.value;
//         });
//         const fieldDiv = document.getElementById(`field-${field.id}`);
//         if (fieldDiv) {
//           fieldDiv.classList.toggle("hidden", !dependenciesMet);
//           if (dependenciesMet && field.dependencies?.[0]?.fieldsToShow) {
//             field.dependencies[0].fieldsToShow.forEach((id) => {
//               const dependentField = document.getElementById(`field-${id}`);
//               if (dependentField) {
//                 dependentField.classList.remove("hidden");
//               }
//             });
//           }
//         }
//       };

//       const handleSubmit = (event: Event): void => {
//         event.preventDefault();
//         const formData: { [key: string]: string } = {};
//         FieldConfig.forEach((field) => {
//           const inputElement = document.getElementById(
//             field.id
//           ) as HTMLInputElement;
//           formData[field.id] = inputElement.value;
//         });
//         console.log(JSON.stringify(formData, null, 2));
//       };

//       generateForm("experience-wizard-wrapper");
//     }
//   }
// }

// // Define a Drupal behavior using the class above
// Drupal.behaviors.experienceWizard = {
//   attach: ExperienceWizard.attach,
// };
