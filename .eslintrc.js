module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    indent: ['error', 4],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'implicit-arrow-linebreak': 'off',
        'no-return-await': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        indent: 'warn',
        'no-unused-vars': 'warn',
        'linebreak-style': 'off',
        'consistent-return': 'off',
        'function-paren-newline': 'off',
        camelcase: 'off',
        'import/prefer-default-export': 'off',
    },
};
