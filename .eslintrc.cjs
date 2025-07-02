module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-refresh", "react-hooks"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error", // garante uso correto de hooks
    "react-hooks/exhaustive-deps": "warn", // avisa sobre deps faltando
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
