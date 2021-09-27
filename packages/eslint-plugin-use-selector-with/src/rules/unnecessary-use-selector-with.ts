import * as eslint from 'eslint';
import * as estree from 'estree';

const rule: eslint.Rule.RuleModule = {
  create(context) {
    return {
      'CallExpression[callee.name="useSelectorWith"][arguments.length=1]':
        function (node: estree.CallExpression) {
          context.report({
            fix: (fixer) => {
              return fixer.replaceText(node.callee, 'useSelector');
            },
            messageId: 'useSelectorUnnecessary',
            node,
          });
        },
    };
  },
  meta: {
    docs: {
      category: 'Best Practices',
      description:
        'There is no need to use useSelectorWith when no args are being passed.',
    },
    fixable: 'code',
    messages: {
      useSelectorUnnecessary: 'There is no need to curry this selector.',
    },
    type: 'suggestion',
    schema: [],
  },
};

export default rule;
