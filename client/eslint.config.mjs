import globals from "globals";

const jsFilesConfig = {
  files: ["**/*.{js,mjs,cjs,jsx}"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: globals.browser,
  extends: [
    "plugin:@eslint/js/recommended",
    "plugin:eslint-plugin-react/recommended",
  ],
  rules: {
    // Additional rules configuration as needed
  },
};

export default [
  jsFilesConfig,
];
