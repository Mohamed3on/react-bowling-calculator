module.exports = {
  extends: 'airbnb',
  rules: {
    'linebreak-style': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-mixed-operators': 0
  },
  parserOptions: { ecmaVersion: 6 },
  env: { es6: true },
  parser: 'babel-eslint'
};
