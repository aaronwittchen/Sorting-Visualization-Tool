import { describe, it, expect, vi, beforeEach } from 'vitest';
import { insertionSort } from '../sortingAlgorithms';

describe('insertionSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([12, 11, 13, 5, 6]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await insertionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([5, 6, 11, 12, 13]);
  });

  it('handles already sorted array', async () => {
    const array = createArray([1, 2, 3, 4, 5]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await insertionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles reverse sorted array', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await insertionSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  it('respects abort signal', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      insertionSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
