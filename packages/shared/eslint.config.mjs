import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const configs = [
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  prettierConfig,
];

export default [
  ...configs,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/**/*.ts"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
      sourceType: "module",
    },
    rules: {
      "array-bracket-spacing": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
      quotes: ["error", "single"],
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "always"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration",
          message:
            "Function declarations are not allowed. Use arrow functions instead.",
        },
        {
          selector: "FunctionExpression:not([async])",
          message:
            "Function expressions are not allowed. Use arrow functions instead.",
        },
        {
          selector: "ExportDefaultDeclaration",
          message: "Use named exports instead.",
        },
      ],
      "@typescript-eslint/no-invalid-void-type": ["off"],
      "prettier/prettier": [
        "error",
        {
          bracketSpacing: true,
          bracketSameLine: false,
          trailingComma: "all",
          printWidth: 80,
          singleAttributePerLine: true,
          singleQuote: true,
        },
      ],
      "object-curly-newline": [
        "error",
        {
          multiline: true,
          consistent: true,
        },
      ],
    },
  },
  {
    files: ["*.ts"],
    rules: {
      "no-restricted-syntax": ["off"],
    },
  },
  eslintPluginPrettierRecommended,
  {
    files: ["**/**/*.ts"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
        },
      ],
    },
  },
  {
    ignores: ["coverage", "dist", "node_modules"],
  },
];