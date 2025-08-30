// sortingAlgorithms.js
// Contains all sorting algorithm implementations for the visualization tool.
// Each function is async and supports pausing, aborting, and dynamic speed.

import { awaitTimeout, checkPause } from "./promises";
import { getDigit, mostDigits } from "./math";

/**
 * Bubble Sort algorithm
 * @param {Array} array - Array of bar objects
 * @param {Function} changeBar - Updates a bar's value/state
 * @param {Function} getDelay - Returns current delay
 * @param {AbortSignal} signal - For aborting
 * @param {Object} pauseControllerRef - For pausing
 */
export const bubbleSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    const arr = array.map((item) => item.value);

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (signal.aborted) {
                throw new DOMException('Aborted', 'AbortError');
            }
            // Highlight compared bars
            changeBar(j, { state: "selected" });
            changeBar(j + 1, { state: "selected" });
            
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());

            // Swap if needed
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                changeBar(j, { value: arr[j + 1] });
                arr[j + 1] = temp;
                changeBar(j + 1, { value: temp });
                await awaitTimeout(getDelay());
            }

            // Unhighlight bars
            changeBar(j, { state: "idle" });
            changeBar(j + 1, { state: "idle" });
        }
    }
};

/**
 * Selection Sort algorithm
 * @param {Array} array
 * @param {Function} changeBar
 * @param {Function} getDelay
 * @param {AbortSignal} signal
 * @param {Object} pauseControllerRef
 */
export const selectionSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    const arr = array.map((item) => item.value);

    for (let i = 0; i < arr.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        let min = i;
        changeBar(min, { state: "selected" });

        for (let j = i + 1; j < arr.length; j++) {
            changeBar(j, { state: "selected" });
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());

            if (arr[j] < arr[min]) {
                changeBar(min, { state: "idle" });
                min = j;
                changeBar(min, { state: "selected" });
            } else {
                changeBar(j, { state: "idle" });
            }
        }

        // Swap if needed
        if (min !== i) {
            let temp = arr[i];
            arr[i] = arr[min];
            changeBar(i, { value: arr[min], state: "idle" });
            arr[min] = temp;
            changeBar(min, { value: temp, state: "idle" });
        } else {
            changeBar(i, { state: "idle" });
            changeBar(min, { state: "idle" });
        }
    }
};

/**
 * Insertion Sort algorithm
 * @param {Array} array
 * @param {Function} changeBar
 * @param {Function} getDelay
 * @param {AbortSignal} signal
 * @param {Object} pauseControllerRef
 */
export const insertionSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    const arr = array.map((item) => item.value);

    for (let i = 1; i < arr.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        let current = arr[i];
        let j = i - 1;

        changeBar(i, { value: current, state: "selected" });

        // Shift elements to make space for insertion
        while (j > -1 && current < arr[j]) {
            arr[j + 1] = arr[j];
            changeBar(j + 1, { value: arr[j], state: "selected" });
            j--;
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            changeBar(j + 2, { value: arr[j + 1], state: "idle" });
        }

        arr[j + 1] = current;
        changeBar(j + 1, { value: current, state: "idle" });
    }
};

const mergeSortMerger = async (arr, start, middle, end, changeBar, getDelay, pauseControllerRef) => {
    let left = arr.slice(start, middle + 1);
    let right = arr.slice(middle + 1, end + 1);

    let i = 0,
        j = 0,
        k = start;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            changeBar(k, { value: left[i], state: "selected" });
            arr[k++] = left[i++];
        } else {
            changeBar(k, { value: right[j], state: "selected" });
            arr[k++] = right[j++];
        }
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    while (i < left.length) {
        changeBar(k, { value: left[i], state: "selected" });
        arr[k++] = left[i++];
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    while (j < right.length) {
        changeBar(k, { value: right[j], state: "selected" });
        arr[k++] = right[j++];
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    for (let i = start; i <= end; i++) {
        changeBar(i, { value: arr[i], state: "idle" });
    }
};

const mergeSortHelper = async (arr, start, end, changeBar, getDelay, signal, pauseControllerRef) => {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, middle, changeBar, getDelay, signal, pauseControllerRef);
    await mergeSortHelper(arr, middle + 1, end, changeBar, getDelay, signal, pauseControllerRef);
    await mergeSortMerger(arr, start, middle, end, changeBar, getDelay, pauseControllerRef);
};

/**
 * Merge Sort algorithm
 * @param {Array} array - Array of bar objects
 * @param {Function} changeBar - Updates a bar's value/state
 * @param {Function} getDelay - Returns current delay
 * @param {AbortSignal} signal - For aborting
 * @param {Object} pauseControllerRef - For pausing
 */
export const mergeSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    const arr = array.map((item) => item.value);
    await mergeSortHelper(arr, 0, arr.length - 1, changeBar, getDelay, signal, pauseControllerRef);
};

const quickSortHelper = async (arr, start, end, changeBar, getDelay, signal, pauseControllerRef) => {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (start >= end) {
        return;
    }

    const pivot = arr[Math.floor((start + end) / 2)];
    let i = start;
    let j = end;

    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            changeBar(i, { value: arr[i], state: "selected" });
            changeBar(j, { value: arr[j], state: "selected" });

            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());

            changeBar(i, { value: arr[i], state: "idle" });
            changeBar(j, { value: arr[j], state: "idle" });
            i++;
            j--;
        }
    }

    await quickSortHelper(arr, start, j, changeBar, getDelay, signal, pauseControllerRef);
    await quickSortHelper(arr, i, end, changeBar, getDelay, signal, pauseControllerRef);
};

/**
 * Quick Sort algorithm
 * @param {Array} array - Array of bar objects
 * @param {Function} changeBar - Updates a bar's value/state
 * @param {Function} getDelay - Returns current delay
 * @param {AbortSignal} signal - For aborting
 * @param {Object} pauseControllerRef - For pausing
 */
export const quickSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    const arr = array.map((item) => item.value);
    await quickSortHelper(arr, 0, arr.length - 1, changeBar, getDelay, signal, pauseControllerRef);
};

/**
 * Radix Sort algorithm
 * @param {Array} array - Array of bar objects
 * @param {Function} changeBar - Updates a bar's value/state
 * @param {Function} getDelay - Returns current delay
 * @param {AbortSignal} signal - For aborting
 * @param {Object} pauseControllerRef - For pausing
 */
export const radixSort = async (array, changeBar, getDelay, signal, pauseControllerRef) => {
    let arr = array.map((item) => item.value);
    let maxDigitCount = mostDigits(arr);

    for (let k = 0; k < maxDigitCount; k++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length; i++) {
            let digit = getDigit(arr[i], k);
            digitBuckets[digit].push(arr[i]);
        }

        arr = [].concat(...digitBuckets);

        for (let i = 0; i < arr.length; i++) {
            changeBar(i, { value: arr[i], state: "selected" });
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            changeBar(i, { value: arr[i], state: "idle" });
        }
    }
};

/**
 * Bucket Sort algorithm
 * @param {Array} array - Array of bar objects
 * @param {Function} changeBar - Updates a bar's value/state
 * @param {Function} getDelay - Returns current delay
 * @param {AbortSignal} signal - For aborting
 * @param {Object} pauseControllerRef - For pausing
 * @param {number} bucketSize - Number of elements per bucket (default: 5)
 */
export const bucketSort = async (array, changeBar, getDelay, signal, pauseControllerRef, bucketSize = 5) => {
    let arr = array.map((item) => item.value);
    if (arr.length === 0) return;

    // Determine min and max values
    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);
    
    // Initialize buckets
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute input array values into buckets
    arr.forEach(value => {
        let bucketIndex = Math.floor((value - minValue) / bucketSize);
        buckets[bucketIndex].push(value);
    });

    // Sort buckets and concatenate back into the array
    arr.length = 0;
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    // Update UI to reflect sorting progress
    for (let i = 0; i < arr.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        changeBar(i, { value: arr[i], state: "selected" });
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
        changeBar(i, { value: arr[i], state: "idle" });
    }
};
