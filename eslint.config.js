import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // ignora variáveis que começam com letra maiúscula ou são constantes

      'react/jsx-no-target-blank': 'off', // desativa regra que impede uso de target="_blank" sem rel="noreferrer"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // permite exportar componentes constantes sem aviso
      'react/prop-types': 'off', // desativa validação de prop-types

      quotes: ['error', 'single'], // força uso de aspas simples
    },
  },
]);
