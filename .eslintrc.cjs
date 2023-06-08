const { resolve } = require('path');

module.exports = {
  'env': {
    'es2020': true,
    'browser': true,
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 'latest',
    'project': './tsconfig.json',
  },
  'extends': [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  'settings': {
    'import/resolver': {
      'alias': {
        'map': [
          ['@', resolve(__dirname, './src')],
          ['@api', resolve(__dirname, './src/js/api/')],
          ['@utils', resolve(__dirname, './src/js/utils')],
          ['@mocks', resolve(__dirname, './src/js/mocks')],
          ['@model', resolve(__dirname, './src/js/model')],
          ['@view', resolve(__dirname, './src/js/view')],
          ['@presenter', resolve(__dirname, './src/js/presenter')],
        ],
      }
    }
  }
}
