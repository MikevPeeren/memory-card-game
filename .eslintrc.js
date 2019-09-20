module.exports = {
    extends: ['airbnb'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        'import/no-unresolved': 0,
        'react/jsx-filename-extension': {
            extensions: ['.jsx', '.tsx'],
        },
    },
};
