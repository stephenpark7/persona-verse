import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

const jsFilesConfig = { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } };
const globalsConfig = { languageOptions: { globals: { ...globals.browser, ...globals.node } } };
const recommendedConfig = pluginJs.configs.recommended;

const eolLastConfig = { rules: { 'eol-last': ['error', 'always'] } };

export default [
  jsFilesConfig,
  globalsConfig,
  recommendedConfig,
  eolLastConfig,
  prettierConfig,
];
