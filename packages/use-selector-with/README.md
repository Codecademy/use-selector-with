# use-selector-with

Small utility for react-redux's `useSelector` that allows passing args.

```js
import { useSelectorWith } from 'use-selector-with';

const selectFruit = (state, name) => state.fruits[name];

const MyComponent = () => {
  const apple = useSelectorWith(selectFruit, 'apple');

  // ...
};
```

## Why?

[`react-redux`'s `useSelector`](https://react-redux.js.org/api/hooks#useselector) allows you to extract data from the Redux store state using a selector function, but doesn't allow directly passing arguments to the selector function.
See the [Using memoizing selectors](https://react-redux.js.org/api/hooks#using-memoizing-selectors) docs for common workarounds for memoizing selectors.

Instead of creating new lambdas across many lines of code, `useSelectorWith` assumes [`shallowEqual`](https://react-redux.js.org/api/hooks#equality-comparisons-and-updates) and memoizes the selector for you.

Its implementation is teeny:

```js
export const useSelectorWith = (selector: Selector, ...args) => {
  const selectorBound = useCallback(
    (state) => selector(state, ...args),
    [selector, ...args]
  );

  return useSelector(selectorBound, shallowEqual);
};
```
