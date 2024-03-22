// vite.config.js
import { defineConfig } from "file:///Users/markhayden/go/src/github.com/lytics/drupal-core/node_modules/vite/dist/node/index.js";
import react from "file:///Users/markhayden/go/src/github.com/lytics/drupal-core/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path, { resolve } from "path";
import typescript from "file:///Users/markhayden/go/src/github.com/lytics/drupal-core/node_modules/@rollup/plugin-typescript/dist/es/index.js";
import { viteStaticCopy } from "file:///Users/markhayden/go/src/github.com/lytics/drupal-core/node_modules/vite-plugin-static-copy/dist/index.js";
import sass from "file:///Users/markhayden/go/src/github.com/lytics/drupal-core/node_modules/sass/sass.node.mjs";
import fs from "fs";
var __vite_injected_original_dirname = "/Users/markhayden/go/src/github.com/lytics/drupal-core";
var rootDir = resolve(__vite_injected_original_dirname);
var outDir = resolve(rootDir, "dist");
function compileSCSS() {
  const scssPath = path.resolve(__vite_injected_original_dirname, "styles/main.scss");
  const cssPath = path.resolve(__vite_injected_original_dirname, `${outDir}/css/core.css`);
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
          type: "full-reload"
        });
      }
    }
  };
}
var vite_config_default = defineConfig({
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
        "phpcs.xml"
      ],
      exclude: ["node_modules", "dist", ".git"]
    }
  },
  plugins: [
    react(),
    compileSCSS(),
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    viteStaticCopy({
      targets: [
        {
          src: "lytics.libraries.yml",
          dest: "."
        },
        {
          src: ".gitignore",
          dest: "."
        },
        {
          src: "composer.json",
          dest: "."
        },
        {
          src: "lytics.info.yml",
          dest: "."
        },
        {
          src: "lytics.install",
          dest: "."
        },
        {
          src: "lytics.links.action.yml",
          dest: "."
        },
        {
          src: "lytics.links.menu.yml",
          dest: "."
        },
        {
          src: "lytics.module",
          dest: "."
        },
        {
          src: "lytics.permissions.yml",
          dest: "."
        },
        {
          src: "lytics.routing.yml",
          dest: "."
        },
        {
          src: "lytics.services.yml",
          dest: "."
        },
        {
          src: "phpcs.xml",
          dest: "."
        },
        {
          src: "README.md",
          dest: "."
        },
        {
          src: "src",
          dest: "."
        },
        {
          src: "tests",
          dest: "."
        },
        {
          src: "config",
          dest: "."
        },
        {
          src: "js/*.js",
          dest: "./js/"
        },
        {
          src: "templates",
          dest: "."
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir,
    rollupOptions: {
      input: {
        main: path.resolve(__vite_injected_original_dirname, "js/main.ts"),
        experienceWizard: path.resolve(__vite_injected_original_dirname, "js/experience-wizard.tsx"),
        inlineRecommendation: path.resolve(
          __vite_injected_original_dirname,
          "js/inline-recommendation.ts"
        ),
        style: path.resolve(__vite_injected_original_dirname, "styles/main.scss")
      },
      output: {
        entryFileNames: (assetInfo) => assetInfo.name === "style" ? "css/core.css" : `js/[name].js`,
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => assetInfo.name === "style" ? "css/[name].[ext]" : `css/[name].[ext]`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFya2hheWRlbi9nby9zcmMvZ2l0aHViLmNvbS9seXRpY3MvZHJ1cGFsLWNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXJraGF5ZGVuL2dvL3NyYy9naXRodWIuY29tL2x5dGljcy9kcnVwYWwtY29yZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFya2hheWRlbi9nby9zcmMvZ2l0aHViLmNvbS9seXRpY3MvZHJ1cGFsLWNvcmUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgdHlwZXNjcmlwdCBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tIFwidml0ZS1wbHVnaW4tc3RhdGljLWNvcHlcIjtcbmltcG9ydCBzYXNzIGZyb20gXCJzYXNzXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5cbmNvbnN0IHJvb3REaXIgPSByZXNvbHZlKF9fZGlybmFtZSk7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKHJvb3REaXIsIFwiZGlzdFwiKTtcblxuZnVuY3Rpb24gY29tcGlsZVNDU1MoKSB7XG4gIGNvbnN0IHNjc3NQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzdHlsZXMvbWFpbi5zY3NzXCIpO1xuICBjb25zdCBjc3NQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgYCR7b3V0RGlyfS9jc3MvY29yZS5jc3NgKTtcblxuICAvLyBGdW5jdGlvbiB0byBjb21waWxlIFNDU1NcbiAgY29uc3QgY29tcGlsZSA9ICgpID0+IHtcbiAgICBzYXNzLnJlbmRlcih7IGZpbGU6IHNjc3NQYXRoIH0sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUoY3NzUGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhjc3NQYXRoLCByZXN1bHQuY3NzKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiY29tcGlsZS1zY3NzXCIsXG4gICAgYnVpbGRTdGFydCgpIHtcbiAgICAgIGNvbXBpbGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZUhvdFVwZGF0ZSh7IGZpbGUsIHNlcnZlciB9KSB7XG4gICAgICBpZiAoZmlsZS5lbmRzV2l0aChcIi5zY3NzXCIpKSB7XG4gICAgICAgIGNvbXBpbGUoKTtcbiAgICAgICAgc2VydmVyLndzLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiZnVsbC1yZWxvYWRcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgd2F0Y2g6IHtcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgXCJzcmMvKipcIixcbiAgICAgICAgXCJzdHlsZXMvKipcIixcbiAgICAgICAgXCJqcy8qKlwiLFxuICAgICAgICBcImNvbmZpZy8qKlwiLFxuICAgICAgICBcImx5dGljcy5saWJyYXJpZXMueW1sXCIsXG4gICAgICAgIFwiY29tcG9zZXIuanNvblwiLFxuICAgICAgICBcImx5dGljcy5pbmZvLnltbFwiLFxuICAgICAgICBcImx5dGljcy5pbnN0YWxsXCIsXG4gICAgICAgIFwibHl0aWNzLmxpbmtzLmFjdGlvbi55bWxcIixcbiAgICAgICAgXCJseXRpY3MubGlua3MubWVudS55bWxcIixcbiAgICAgICAgXCJseXRpY3MubW9kdWxlXCIsXG4gICAgICAgIFwibHl0aWNzLnBlcm1pc3Npb25zLnltbFwiLFxuICAgICAgICBcImx5dGljcy5yb3V0aW5nLnltbFwiLFxuICAgICAgICBcImx5dGljcy5zZXJ2aWNlcy55bWxcIixcbiAgICAgICAgXCJwaHBjcy54bWxcIixcbiAgICAgIF0sXG4gICAgICBleGNsdWRlOiBbXCJub2RlX21vZHVsZXNcIiwgXCJkaXN0XCIsIFwiLmdpdFwiXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjb21waWxlU0NTUygpLFxuICAgIHR5cGVzY3JpcHQoe1xuICAgICAgdHNjb25maWc6IFwiLi90c2NvbmZpZy5qc29uXCIsXG4gICAgfSksXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcImx5dGljcy5saWJyYXJpZXMueW1sXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiLmdpdGlnbm9yZVwiLFxuICAgICAgICAgIGRlc3Q6IFwiLlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcImNvbXBvc2VyLmpzb25cIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJseXRpY3MuaW5mby55bWxcIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJseXRpY3MuaW5zdGFsbFwiLFxuICAgICAgICAgIGRlc3Q6IFwiLlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcImx5dGljcy5saW5rcy5hY3Rpb24ueW1sXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwibHl0aWNzLmxpbmtzLm1lbnUueW1sXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwibHl0aWNzLm1vZHVsZVwiLFxuICAgICAgICAgIGRlc3Q6IFwiLlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcImx5dGljcy5wZXJtaXNzaW9ucy55bWxcIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJseXRpY3Mucm91dGluZy55bWxcIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJseXRpY3Muc2VydmljZXMueW1sXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwicGhwY3MueG1sXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiUkVBRE1FLm1kXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjXCIsXG4gICAgICAgICAgZGVzdDogXCIuXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwidGVzdHNcIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJjb25maWdcIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJqcy8qLmpzXCIsXG4gICAgICAgICAgZGVzdDogXCIuL2pzL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInRlbXBsYXRlc1wiLFxuICAgICAgICAgIGRlc3Q6IFwiLlwiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogb3V0RGlyLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwianMvbWFpbi50c1wiKSxcbiAgICAgICAgZXhwZXJpZW5jZVdpemFyZDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJqcy9leHBlcmllbmNlLXdpemFyZC50c3hcIiksXG4gICAgICAgIGlubGluZVJlY29tbWVuZGF0aW9uOiBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgIFwianMvaW5saW5lLXJlY29tbWVuZGF0aW9uLnRzXCJcbiAgICAgICAgKSxcbiAgICAgICAgc3R5bGU6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3R5bGVzL21haW4uc2Nzc1wiKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IChhc3NldEluZm8pID0+XG4gICAgICAgICAgYXNzZXRJbmZvLm5hbWUgPT09IFwic3R5bGVcIiA/IFwiY3NzL2NvcmUuY3NzXCIgOiBganMvW25hbWVdLmpzYCxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwianMvW25hbWVdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PlxuICAgICAgICAgIGFzc2V0SW5mby5uYW1lID09PSBcInN0eWxlXCIgPyBcImNzcy9bbmFtZV0uW2V4dF1cIiA6IGBjc3MvW25hbWVdLltleHRdYCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLG9CQUFvQjtBQUNqWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRLGVBQWU7QUFDOUIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxzQkFBc0I7QUFDL0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sUUFBUTtBQU5mLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sVUFBVSxRQUFRLGdDQUFTO0FBQ2pDLElBQU0sU0FBUyxRQUFRLFNBQVMsTUFBTTtBQUV0QyxTQUFTLGNBQWM7QUFDckIsUUFBTSxXQUFXLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFDM0QsUUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxHQUFHLE1BQU0sZUFBZTtBQUdoRSxRQUFNLFVBQVUsTUFBTTtBQUNwQixTQUFLLE9BQU8sRUFBRSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssV0FBVztBQUMvQyxVQUFJLEtBQUs7QUFDUCxnQkFBUSxNQUFNLEdBQUc7QUFDakI7QUFBQSxNQUNGO0FBQ0EsU0FBRyxVQUFVLEtBQUssUUFBUSxPQUFPLEdBQUcsRUFBRSxXQUFXLEtBQUssQ0FBQztBQUN2RCxTQUFHLGNBQWMsU0FBUyxPQUFPLEdBQUc7QUFBQSxJQUN0QyxDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFDWCxjQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsZ0JBQWdCLEVBQUUsTUFBTSxPQUFPLEdBQUc7QUFDaEMsVUFBSSxLQUFLLFNBQVMsT0FBTyxHQUFHO0FBQzFCLGdCQUFRO0FBQ1IsZUFBTyxHQUFHLEtBQUs7QUFBQSxVQUNiLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUMsZ0JBQWdCLFFBQVEsTUFBTTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLElBQ0QsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxLQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQzFDLGtCQUFrQixLQUFLLFFBQVEsa0NBQVcsMEJBQTBCO0FBQUEsUUFDcEUsc0JBQXNCLEtBQUs7QUFBQSxVQUN6QjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFPLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNuRDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLENBQUMsY0FDZixVQUFVLFNBQVMsVUFBVSxpQkFBaUI7QUFBQSxRQUNoRCxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxjQUNmLFVBQVUsU0FBUyxVQUFVLHFCQUFxQjtBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
