import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            '.next/**',
            'node_modules/**',
            'coverage/**',
            'build/**',
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },

            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
        },

        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },

        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,

            'react/jsx-no-undef': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },

        settings: {
            react: {
                version: 'detect',
            },
        },
    },
);
