/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as eslint from 'eslint';
import * as estree from 'estree';

const isFunctionLikeExpression = (
  node: estree.Node
): node is estree.ArrowFunctionExpression | estree.FunctionExpression => {
  return ['ArrowFunctionExpression', 'FunctionExpression'].includes(node.type);
};

const getImmediateReturn = (
  body: estree.BlockStatement | estree.Expression
) => {
  if (body.type !== 'BlockStatement') {
    return body;
  }

  const [firstLine] = body.body;
  if (firstLine.type === 'ReturnStatement') {
    return firstLine.argument;
  }

  return undefined;
};

const rule: eslint.Rule.RuleModule = {
  create(context) {
    return {
      'CallExpression[callee.name="useSelector"][arguments.length=1]':
        function (node: estree.CallExpression) {
          const [functionExpression] = node.arguments;
          if (!isFunctionLikeExpression(functionExpression)) {
            return;
          }

          const immediateReturn = getImmediateReturn(functionExpression.body);
          if (immediateReturn?.type !== 'CallExpression') {
            return;
          }

          const selector = immediateReturn.callee;
          if (selector.type !== 'Identifier') {
            return;
          }

          context.report({
            fix: (fixer) => {
              return [
                fixer.replaceTextRange(
                  [node.range![0], immediateReturn.arguments[1].range![0]],
                  `useSelectorWith(${selector.name}, `
                ),
                functionExpression.type === 'ArrowFunctionExpression'
                  ? fixer.removeRange([
                      immediateReturn.range![1] - 1,
                      immediateReturn.range![1],
                    ])
                  : fixer.removeRange([
                      immediateReturn.arguments[1].range![1],
                      functionExpression.range![1],
                    ]),
              ];
            },
            messageId: 'useSelectorWith',
            node,
          });
        },
    };
  },
  meta: {
    docs: {
      category: 'Best Practices',
      description:
        'Prefer useSelectorWith over a manually curried useSelector.',
    },
    fixable: 'code',
    messages: {
      useSelectorWith:
        'Use the useSelectorWith shorthand function for this curried useSelector.',
    },
    type: 'suggestion',
    schema: [],
  },
};

export default rule;
