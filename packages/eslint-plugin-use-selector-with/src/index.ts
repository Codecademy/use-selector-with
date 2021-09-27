import preferUseSelectorWith from './rules/prefer-use-selector-with';
import unnecessaryUseSelectorWith from './rules/unnecessary-use-selector-with';

const rules = {
  'use-selector-with/prefer-use-selector-with': preferUseSelectorWith,
  'use-selector-with/unnecessary-use-selector-with': unnecessaryUseSelectorWith,
};

module.exports = {
  configs: {
    recommended: {
      plugins: ['jest-react'],
      rules: {
        'use-selector-with/prefer-use-selector-with': 'error',
        'use-selector-with/unnecessary-use-selector-with': 'error',
      },
    },
  },
  rules,
};
