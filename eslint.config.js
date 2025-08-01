const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactPlugin = require('eslint-plugin-react');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = [
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooksPlugin,
			react: reactPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	{
		name: 'disable-conflicts-with-prettier',
		...prettierConfig,
	},
];
