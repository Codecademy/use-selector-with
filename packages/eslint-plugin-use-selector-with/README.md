# eslint-plugin-use-selector-with

ESLint plugin for rules around proper [`useSelectorWith`](https://www.npmjs.com/package/use-selector-with) usage.

## Installation

```shell
yarn add --dev eslint eslint-plugin-use-selector-with
```

## Usage

Add `use-selector-with` to the `plugins` section of your ESLint configuration file:

```js
{
  plugins: ['use-selector-with'];
}
```

## Rules

Includes two rules, both of which are auto-fixable and have no configuration options:

- [`prefer-use-selector-with`](#prefer-use-selector-with)
- [`unnecessary-use-selector-with`](#unnecessary-use-selector-with)

We recommend extending from `plugin:use-selector-with/recommended` to enable both of them:

```js
{
  "extends": ["plugin:use-selector-with/recommended"]
}
```

If you want more fine control over the rules, you may configure them individually per [ESLint's Configuring Rules docs](https://eslint.org/docs/user-guide/configuring#configuring-rules):

```js
{
  "rules": {
    "use-selector-with/prefer-use-selector-with": "warn"
  }
}
```

### `prefer-use-selector-with`

Enforces using `useSelectorWith` instead of passing a function expression to `useSelector`.

Examples of _failing_ code with this rule:

```ts
const value = useSelector((state) => getValueFromState(state, 'id'));
```

Examples of _passing_ code with this rule:

```ts
const value = useSelectorWith(getValueFromState, 'id');
```

### `unnecessary-use-selector-with`

Enforces using `useSelector` instead of `useSelectorWith` if there are no args to pass to the selector.

Examples of _failing_ code with this rule:

```ts
const value = useSelectorWith(state, getValueFromState);
```

Examples of _passing_ code with this rule:

```ts
const value = useSelector(getValueFromState);
```
