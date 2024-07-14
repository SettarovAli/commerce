module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['unicorn'],
  rules: {
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ]
  }
};
