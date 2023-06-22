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
          ['type', './src/type/'],
          ['api', './src/api/'],
          ['utils', './src/utils'],
          ['mocks', './src/mocks'],
          ['model', './src/model'],
          ['view', './src/view'],
          ['presenter', './src/presenter'],
        ]
      }
    }
  }
}
