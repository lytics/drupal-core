import { defineConfig } from "vite";
import path, { resolve } from "path";
import typescript from "@rollup/plugin-typescript";
import { viteStaticCopy } from "vite-plugin-static-copy";
import sass from "sass";
import fs from "fs";

const rootDir = resolve(__dirname);
const outDir = resolve(rootDir, "dist");

function compileSCSS() {
  const scssPath = path.resolve(__dirname, "styles/main.scss");
  const cssPath = path.resolve(__dirname, `${outDir}/css/core.css`);

  // Function to compile SCSS
  const compile = () => {
    sass.render({ file: scssPath }, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      fs.mkdirSync(path.dirname(cssPath), { recursive: true });
      fs.writeFileSync(cssPath, result.css);
    });
  };

  return {
    name: "compile-scss",
    buildStart() {
      compile();
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".scss")) {
        compile();
        server.ws.send({
          type: "full-reload",
        });
      }
    },
  };
}

export default defineConfig({
  server: {
    watch: {
      include: [
        "src/**",
        "styles/**",
        "js/**",
        "config/**",
        "lytics.libraries.yml",
        "composer.json",
        "lytics.info.yml",
        "lytics.install",
        "lytics.links.action.yml",
        "lytics.links.menu.yml",
        "lytics.module",
        "lytics.permissions.yml",
        "lytics.routing.yml",
        "lytics.services.yml",
        "phpcs.xml",
      ],
      exclude: ["node_modules", "dist", ".git"],
    },
  },
  plugins: [
    compileSCSS(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    viteStaticCopy({
      targets: [
        {
          src: "lytics.libraries.yml",
          dest: ".",
        },
        {
          src: ".gitignore",
          dest: ".",
        },
        {
          src: "composer.json",
          dest: ".",
        },
        {
          src: "lytics.info.yml",
          dest: ".",
        },
        {
          src: "lytics.install",
          dest: ".",
        },
        {
          src: "lytics.links.action.yml",
          dest: ".",
        },
        {
          src: "lytics.links.menu.yml",
          dest: ".",
        },
        {
          src: "lytics.module",
          dest: ".",
        },
        {
          src: "lytics.permissions.yml",
          dest: ".",
        },
        {
          src: "lytics.routing.yml",
          dest: ".",
        },
        {
          src: "lytics.services.yml",
          dest: ".",
        },
        {
          src: "phpcs.xml",
          dest: ".",
        },
        {
          src: "README.md",
          dest: ".",
        },
        {
          src: "src",
          dest: ".",
        },
        {
          src: "tests",
          dest: ".",
        },
        {
          src: "config",
          dest: ".",
        },
        {
          src: "js/*.js",
          dest: "./js/",
        },
        {
          src: "templates",
          dest: ".",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: outDir,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "js/main.ts"),
        inlineRecommendation: path.resolve(
          __dirname,
          "js/inline-recommendation.ts"
        ),
        style: path.resolve(__dirname, "styles/main.scss"),
      },
      output: {
        entryFileNames: (assetInfo) =>
          assetInfo.name === "style" ? "css/core.css" : `js/[name].js`,
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name === "style" ? "css/[name].[ext]" : `css/[name].[ext]`,
      },
    },
  },
});
