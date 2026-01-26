import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { defineConfig } from "eslint/config"
import eslintPluginPrettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // 禁用与Prettier冲突的eslint规则
      ...prettierConfig.rules,
      // 将违反 Prettier 规则（.prettierrc.js）的作为 ESLint 警告
      "prettier/prettier": "warn",
    },
  },
])
