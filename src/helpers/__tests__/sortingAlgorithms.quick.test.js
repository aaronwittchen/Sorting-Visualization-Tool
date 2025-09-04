import { describe, it, expect, vi, beforeEach } from 'vitest';
import { quickSort } from '../sortingAlgorithms';

describe('quickSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([10, 7, 8, 9, 1, 5]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await quickSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 5, 7, 8, 9, 10]);
  });

  it('handles array with duplicates', async () => {
    const array = createArray([3, 1, 4, 1, 5, 9, 2, 6, 5]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await quickSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
  });

  it('handles single element array', async () => {
    const array = createArray([42]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await quickSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([42]);
  });

  it('respects abort signal', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      quickSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
