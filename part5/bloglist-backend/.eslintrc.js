module.exports = {
  'env': {
    'commonjs': true,
    'es2020': true,
    'node': true,
    'jest': true,
    "cypress/globals": true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  "plugins": [
    "react", "jest", "cypress"],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
