import { renderHook } from '@testing-library/react-hooks';
import { shallowEqual } from 'react-redux';

import { useSelectorWith } from './useSelectorWith';

const mockState = { some: 'values' };

const mockUseSelector = jest.fn((input) => input(mockState));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  get useSelector() {
    return mockUseSelector;
  },
}));

describe('useSelectorWith', () => {
  it('binds args to the selector', () => {
    const args = ['abc', 123];
    const selector = jest.fn((...received: unknown[]) => ({ received }));

    const hook = renderHook(() => useSelectorWith(selector, ...args));

    expect(selector).toHaveBeenCalledWith(mockState, ...args);
    expect(hook.result.current).toEqual({ received: [mockState, ...args] });
  });

  it('passes shallowEqual to useSelector', () => {
    renderHook(() => useSelectorWith(jest.fn()));

    expect(mockUseSelector).toHaveBeenCalledWith(
      expect.any(Function),
      shallowEqual
    );
  });
});
