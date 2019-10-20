module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y'],
	env: {
		browser: true,
	},
	rules: {
		'prettier/prettier': ['error', { singleQuote: true }],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		// disable the rule for all files
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
};
