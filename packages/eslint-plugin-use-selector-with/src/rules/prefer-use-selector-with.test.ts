import { RuleTester } from 'eslint';

import rule from './prefer-use-selector-with';

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020 },
});

ruleTester.run('prefer-use-selector-with', rule, {
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
      code: `useSelector(state => selectFromState(state, input));`,
      errors: [
        {
          messageId: 'useSelectorWith',
        },
      ],
      output: `useSelectorWith(selectFromState, input);`,
    },
    {
      code: `useSelector( (state ) =>  selectFromState (  state ,   input ) ) ;`,
      errors: [
        {
          messageId: 'useSelectorWith',
        },
      ],
      output: `useSelectorWith(selectFromState, input  ) ;`,
    },
    {
      code: `useSelector(function (state) { return selectFromState(state, input); });`,
      errors: [
        {
          messageId: 'useSelectorWith',
        },
      ],
      output: `useSelectorWith(selectFromState, input);`,
    },
    {
      code: `useSelector (  function  (  state )   {  return   selectFromState (  state ,   input ) ;  } );`,
      errors: [
        {
          messageId: 'useSelectorWith',
        },
      ],
      output: `useSelectorWith(selectFromState, input );`,
    },
  ],
});
