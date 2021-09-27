import { RuleTester } from 'eslint';

import rule from './unnecessary-use-selector-with';

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020 },
});

ruleTester.run('unnecessary-use-selector-with', rule, {
  valid: [
    `anyOtherFunction();`,
    `useSelector();`,
    `useSelector(selectSomething);`,
    `useSelector(function (state) { doSomething(); });`,
    `useSelector(function (state) { doSomething(); return state.other; });`,
    `useSelectorWith();`,
    `useSelectorWith(selectSomething, input);`,
    `useSelectorWith(selectSomething, "input");`,
    `useSelectorWith(selectSomething, "input", other);`,
    `useSelectorWith(selectSomething, other, "input");`,
    `useSelector(function *() { return (yield wat)(); });`,
  ],
  invalid: [
    {
      code: `useSelectorWith(selectFromState);`,
      errors: [
        {
          messageId: 'useSelectorUnnecessary',
        },
      ],
      output: `useSelector(selectFromState);`,
    },
  ],
});
