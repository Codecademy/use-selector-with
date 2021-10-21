/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export type AnySelector<Props extends any[]> = (
  state: any,
  ...props: Props
) => any;

export type ArgsForSelector<Selector> = Selector extends AnySelector<
  infer Props
>
  ? Props
  : never;

export const useSelectorWith = <Selector extends (...args: any) => any>(
  selector: Selector,
  ...args: ArgsForSelector<Selector>
): ReturnType<Selector> => {
  const selectorBound = useCallback(
    (state: Parameters<Selector>[0]) => selector(state, ...args),
    // We're intentionally spreading args as the deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selector, ...args]
  );

  return useSelector(selectorBound, shallowEqual);
};
