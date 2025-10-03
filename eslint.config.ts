import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import js from "@eslint/js";

export default [
  // Base configuration recommended by ESLint
  js.configs.recommended,

  // TypeScript configurations
  ...tseslint.configs.recommended,

  // React configurations
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      parserOptions: pluginReact.configs.recommended.parserOptions,
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Use rules from the recommended and jsx-runtime configs
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      // Turn off prop-types as we use TypeScript
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },

  // React Hooks configurations
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // Custom rules for TypeScript to refine error levels
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error", // Changed from warn to error as these are often bugs
            {
              argsIgnorePattern: "^_",
              varsIgnorePattern: "^_",
              caughtErrorsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/no-explicit-any": "error", // Changed from warn to error
    }
  },

  // Global ignore pattern
  {
    ignores: ["dist/", "node_modules/", ".DS_Store"],
  },
];

