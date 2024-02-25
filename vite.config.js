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
          src: "lyticscdp.libraries.yml",
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
          src: "lyticscdp.info.yml",
          dest: ".",
        },
        {
          src: "lyticscdp.install",
          dest: ".",
        },
        {
          src: "lyticscdp.links.action.yml",
          dest: ".",
        },
        {
          src: "lyticscdp.links.menu.yml",
          dest: ".",
        },
        {
          src: "lyticscdp.module",
          dest: ".",
        },
        {
          src: "lyticscdp.permissions.yml",
          dest: ".",
        },
        {
          src: "lyticscdp.routing.yml",
          dest: ".",
        },
        {
          src: "lyticscdp.services.yml",
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
        // style: path.resolve(__dirname, "styles/styles.js"),
      },
      output: {
        entryFileNames: (assetInfo) =>
          assetInfo.name === "style" ? "css/style.css" : `js/[name].js`,
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name === "style" ? "css/[name].[ext]" : `css/[name].[ext]`,
      },
    },
  },
});
