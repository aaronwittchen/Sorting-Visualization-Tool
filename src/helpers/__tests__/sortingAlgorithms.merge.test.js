import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mergeSort } from '../sortingAlgorithms';

describe('mergeSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([38, 27, 43, 3, 9, 82, 10]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await mergeSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([3, 9, 10, 27, 38, 43, 82]);
  });

  it('handles empty array', async () => {
    const array = createArray([]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await mergeSort(array, changeBar, getDelay, signal, pauseControllerRef);

    expect(array).toEqual([]);
  });

  it('handles large array', async () => {
    const array = createArray([100, 50, 75, 25, 80, 60, 40, 20, 90, 10]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await mergeSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([10, 20, 25, 40, 50, 60, 75, 80, 90, 100]);
  });

  it('respects abort signal', async () => {
    const array = createArray([5, 4, 3, 2, 1]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      mergeSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
