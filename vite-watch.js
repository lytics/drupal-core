import chokidar from "chokidar";
import { build } from "vite";

// Function to perform a Vite build
async function viteBuild() {
  try {
    await build({
      // Your Vite build options here
      outDir: "build",
      // Include additional Vite config options as needed
    });
    console.log("Build completed.");
  } catch (err) {
    console.error("Error during build:", err);
  }
}

// Watcher paths
const watchPaths = [
  "src/**/*",
  "styles/**/*",
  "js/**/*",
  "config/**/*",
  "templates/**/*",
  "lyticscdp.libraries.yml",
  "composer.json",
  "lyticscdp.info.yml",
  "lyticscdp.install",
  "lyticscdp.links.action.yml",
  "lyticscdp.links.menu.yml",
  "lyticscdp.module",
  "lyticscdp.permissions.yml",
  "lyticscdp.routing.yml",
  "lyticscdp.services.yml",
  "phpcs.xml",
];

// Initialize chokidar watcher
const watcher = chokidar.watch(watchPaths, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

// Event listeners for the watcher
watcher
  .on("change", (path) => {
    console.log(`File ${path} has been changed. Rebuilding...`);
    viteBuild();
  })
  .on("error", (error) => console.error(`Watcher error: ${error}`))
  .on("ready", () => console.log("Watching for file changes..."));

console.log("Starting the watcher...");
