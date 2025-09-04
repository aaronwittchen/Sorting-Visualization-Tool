import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bucketSort } from '../sortingAlgorithms';

describe('bucketSort', () => {
  const createArray = (arr) => arr.map((value) => ({ value }));

  it('sorts an array of numbers in ascending order', async () => {
    const array = createArray([29, 25, 3, 49, 9, 37, 21, 43]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bucketSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([3, 9, 21, 25, 29, 37, 43, 49]);
  });

  it('handles custom bucket size', async () => {
    const array = createArray([78, 17, 39, 26, 72, 94, 21, 12, 23, 68]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };
    const bucketSize = 10;

    await bucketSort(
      array,
      changeBar,
      getDelay,
      signal,
      pauseControllerRef,
      bucketSize
    );

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([12, 17, 21, 23, 26, 39, 68, 72, 78, 94]);
  });

  it('handles empty array', async () => {
    const array = createArray([]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bucketSort(array, changeBar, getDelay, signal, pauseControllerRef);

    expect(array).toEqual([]);
  });

  it('handles single element array', async () => {
    const array = createArray([42]);
    const changeBar = vi.fn((index, updates) => {
      if (updates.value !== undefined) {
        array[index].value = updates.value;
      }
    });
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: false };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await bucketSort(array, changeBar, getDelay, signal, pauseControllerRef);

    const sorted = array.map((item) => item.value);
    expect(sorted).toEqual([42]);
  });

  it('respects abort signal', async () => {
    const array = createArray([29, 25, 3, 49, 9]);
    const changeBar = vi.fn();
    const getDelay = vi.fn().mockReturnValue(0);
    const signal = { aborted: true };
    const pauseControllerRef = { current: { signal: { aborted: false } } };

    await expect(
      bucketSort(array, changeBar, getDelay, signal, pauseControllerRef)
    ).rejects.toThrow('Aborted');
  });
});
