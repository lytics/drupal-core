export class PathforaHandler {
  private client: any;

  constructor() {
    console.log("Adding Pathfora");
    this.loadPathforaLibrary("https://c.lytics.io/static/pathfora.min.js")
      .then(() => {
        this.client = (window as any).pathfora;
        console.log("Pathfora loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading Pathfora script:", error);
      });
  }

  private loadPathforaLibrary(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(`Error loading script: ${url}`);
      document.body.appendChild(script);
    });
  }

  // serialize a javascript object into json
  // take specific care for potential callback functions
  serializeExperience(experience: any): any {
    // confirmAction.callback
    if (experience.confirmAction && experience.confirmAction.callback) {
      experience.confirmAction.callback =
        experience.confirmAction.callback.toString();
    }

    // cancelAction.callback
    if (experience.cancelAction && experience.cancelAction.callback) {
      experience.cancelAction.callback =
        experience.cancelAction.callback.toString();
    }

    // closeAction.callback
    if (experience.closeAction && experience.closeAction.callback) {
      experience.closeAction.callback =
        experience.closeAction.callback.toString();
    }

    // onInit
    if (experience.onInit) {
      experience.onInit = experience.onInit.toString();
    }

    // onLoad
    if (experience.onLoad) {
      experience.onLoad = experience.onLoad.toString();
    }

    // onClick
    if (experience.onClick) {
      experience.onClick = experience.onClick.toString();
    }

    // onModalClose
    if (experience.onModalClose) {
      experience.onModalClose = experience.onModalClose.toString();
    }

    // translate object to json
    const experienceJson = JSON.stringify(experience);

    return experienceJson;
  }

  // deserialize a json object into a javascript object
  // take specific care for potential callback functions
  deserializeExperience(experienceJson: any): any {
    const experience = JSON.parse(experienceJson);

    // Helper function to safely create function from string
    const createFunction = (str: string) => {
      try {
        return new Function(`return ${str}`)();
      } catch (error) {
        console.error("Error creating function:", error);
        return null; // Return null if function creation fails
      }
    };

    // confirmAction.callback
    if (experience.confirmAction && experience.confirmAction.callback) {
      experience.confirmAction.callback = createFunction(
        experience.confirmAction.callback
      );
    }

    // cancelAction.callback
    if (experience.cancelAction && experience.cancelAction.callback) {
      experience.cancelAction.callback = createFunction(
        experience.cancelAction.callback
      );
    }

    // closeAction.callback
    if (experience.closeAction && experience.closeAction.callback) {
      experience.closeAction.callback = createFunction(
        experience.closeAction.callback
      );
    }

    // onInit
    if (experience.onInit) {
      experience.onInit = createFunction(experience.onInit);
    }

    // onLoad
    if (experience.onLoad) {
      experience.onLoad = createFunction(experience.onLoad);
    }

    // onClick
    if (experience.onClick) {
      experience.onClick = createFunction(experience.onClick);
    }

    // onModalClose
    if (experience.onModalClose) {
      experience.onModalClose = createFunction(experience.onModalClose);
    }

    return experience;
  }

  testExperience(experience): void {
    const config = experience.config;
    config.id = "test-experience";

    let module;
    switch (experience.details.type) {
      case "message":
        module = new this.client.Message(config);
        break;
      case "form":
        module = new this.client.Form(config);
        break;
      default:
        console.error("Unsupported experience type:", experience.details.type);
    }

    this.client.initializeWidgets([module]);
  }
}
