module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'simple-import-sort', 'import'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    'react-refresh/only-export-components': 'warn',
    // import sort rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
