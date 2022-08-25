module.exports = {
  // parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'react/prop-types': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:react/recommended',
    // 'plugin:prettier/prettier',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
