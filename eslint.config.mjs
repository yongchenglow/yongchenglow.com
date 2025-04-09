import globals from 'globals';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import next from '@next/eslint-plugin-next';
import storybook from 'eslint-plugin-storybook';
import compat from 'eslint-plugin-compat';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
      prettier,
      '@next/next': next,
      storybook,
      compat,
    },
    rules: {
      semi: 'error',
      'compat/compat': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
        },
      ],
      'react/no-unknown-property': [
        2,
        {
          ignore: ['jsx'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
