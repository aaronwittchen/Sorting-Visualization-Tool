import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bubbleSort } from '../sortingAlgorithms';

describe('bubbleSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([5, 3, 8, 1, 2]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0); // Mock to return 0 for faster tests
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    console.log(
      'Before sorting:',
      array.map((item) => item.value)
    );

    await bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef);

    console.log(
      'After sorting:',
      array.map((item) => item.value)
    );
    console.log('changeBar called:', changeBar.mock.calls.length, 'times');

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 2, 3, 5, 8]);
  });

  it('handles empty array', async () => {
    const array = createArray([]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef);

    expect(array).toEqual([]);
  });

  it('handles single element array', async () => {
    const array = createArray([42]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([42]);
  });

  it('handles already sorted array', async () => {
    const array = createArray([1, 2, 3, 4, 5]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  it('calls changeBar function during sorting', async () => {
    const array = createArray([3, 1, 2]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef);

    // Verify that changeBar was called (exact number depends on implementation)
    expect(changeBar).toHaveBeenCalled();
  });

  it('respects abort signal', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true }; // Start with aborted signal
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      bubbleSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
