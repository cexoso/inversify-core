import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig((env) => {
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
    },
    base: "/inversify-core/vue-app/",
    // 以下是单元测试的配置
    test: {
      globals: true,
      transformMode: {
        web: [/.[jt]sx$/],
      },
      include: ["**/?(*.){test,spec}.?(c|m)[jt]s?(x)"],
      coverage: {
        include: ["src"],
        exclude: [
          "__tests__/**",
          "**/*.stories.tsx", // storybook
          "**/*.spec.tsx",
          "**/*.spec.ts",
          "src/protos", // 自动生成的协议层
        ],
      },
      browser: {
        enabled: true,
        screenshotFailures: false,
        name: "chromium",
        provider: "playwright",
        isolate: false,
      },
    },
  };
});
