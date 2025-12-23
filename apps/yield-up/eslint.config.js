import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { resolveConfig } from 'prettier';
import tseslint from 'typescript-eslint';

const prettierOptions = await resolveConfig('./.prettierrc');

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginA11y,
    },
    rules: {
      // Prettier
      'prettier/prettier': ['error', prettierOptions],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'warn',

      // A11y
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // Import
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'src/**', group: 'internal' },
            { pattern: 'features/**', group: 'internal' },
            { pattern: 'utils/**', group: 'internal' },
            { pattern: 'types', group: 'internal' },
            { pattern: 'enums', group: 'internal' },
            { pattern: 'assets/**', group: 'internal' },
            { pattern: 'common/**', group: 'internal' },
            { pattern: 'config', group: 'internal' },
            { pattern: './**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // TS
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      // Disable React PropTypes (if using TS)
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json'],
        },
      },
    },
  },
]);
