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
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (signal.aborted) {
                throw new DOMException('Aborted', 'AbortError');
            }
            // Compare elements
            changeBar(j, { state: "selected" }, true, false, true); // step and comparison
            changeBar(j + 1, { state: "selected" }, true, false, false); // step only
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            
            // Increment step counter for comparison
            changeBar(j, {}, true, false, false);
            changeBar(j + 1, {}, true, false, false);
            
            // Swap if needed
            if (array[j].value > array[j + 1].value) {
                let temp = array[j].value;
                array[j].value = array[j + 1].value;
                changeBar(j, { value: array[j].value }, true, true, false); // step and swap
                changeBar(j, { value: array[j].value }, true, true); // step and swap
                array[j + 1].value = temp;
                changeBar(j + 1, { value: temp }, true, false); // Only step, not swap
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
    for (let i = 0; i < array.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        let min = i;
        changeBar(min, { state: "selected" }, true, false, false);
        
        for (let j = i + 1; j < array.length; j++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            
            // Highlight compared bars and count comparison
            changeBar(j, { state: "selected" }, true, false, true); // step and comparison
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            
            // Reset highlight
            changeBar(j, {}, true, false, false);
            
            if (array[j].value < array[min].value) {
                // Reset previous min
                changeBar(min, { state: "idle" }, false, false, false);
                min = j;
                changeBar(min, { state: "selected" }, true, false, false);
            } else {
                changeBar(j, { state: "idle" }, false, false, false);
            }
        }

        // Swap if needed
        if (min !== i) {
            let temp = array[i].value;
            array[i].value = array[min].value;
            changeBar(i, { value: array[i].value, state: "idle" }, true, true); // step and swap
            array[min].value = temp;
            changeBar(min, { value: temp, state: "idle" }, true, true); // step and swap
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
    for (let i = 1; i < array.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        // Find the correct position for current element
        let j = i - 1;
        const current = array[i].value;
        changeBar(i, { state: "selected" }, true, false, false);
        
        // Shift elements to make space for insertion
        while (j > -1) {
            // Compare current with previous element
            changeBar(j, { state: "comparing" }, true, false, true); // step and comparison
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            
            if (current >= array[j].value) {
                changeBar(j, { state: "idle" }, false, false, false);
                j++; // Adjust j back to the correct position
                break;
            }
            
            // Shift element to the right
            array[j + 1].value = array[j].value;
            changeBar(j + 1, { value: array[j].value, state: "selected" }, true, true, false); // step and swap (shift)
            changeBar(j, { value: array[j].value, state: "idle" }, false, false, false);
            
            j--;
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            
            if (j >= 0) {
                changeBar(j, { state: "comparing" }, false, false, false);
            }
        }

        array[j + 1].value = current;
        changeBar(j + 1, { value: current, state: "idle" }, true); // Step for insertion
    }
};

const mergeSortMerger = async (array, start, middle, end, changeBar, getDelay, pauseControllerRef) => {
    let left = array.slice(start, middle + 1).map(item => item.value);
    let right = array.slice(middle + 1, end + 1).map(item => item.value);

    let i = 0,
        j = 0,
        k = start;

    while (i < left.length && j < right.length) {
        // Highlight the elements being compared
        if (k > 0) changeBar(k - 1, { state: "idle" }, false, false, false);
        changeBar(k, { state: "comparing" }, true, false, true); // step and comparison
        
        if (left[i] < right[j]) {
            array[k].value = left[i];
            changeBar(k, { value: left[i], state: "selected" }, true, true, false); // step and swap (assignment)
            k++;
            i++;
        } else {
            array[k].value = right[j];
            changeBar(k, { value: right[j], state: "selected" }, true, true, false); // step and swap (assignment)
            k++;
            j++;
        }
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    while (i < left.length) {
        array[k].value = left[i];
        changeBar(k, { value: left[i], state: "selected" }, true, true); // step and swap (assignment)
        k++;
        i++;
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    while (j < right.length) {
        array[k].value = right[j];
        changeBar(k, { value: right[j], state: "selected" }, true, true); // step and swap (assignment)
        k++;
        j++;
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
    }

    for (let i = start; i <= end; i++) {
        changeBar(i, { value: array[i].value, state: "idle" });
    }
};

const mergeSortHelper = async (array, start, end, changeBar, getDelay, signal, pauseControllerRef) => {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(array, start, middle, changeBar, getDelay, signal, pauseControllerRef);
    await mergeSortHelper(array, middle + 1, end, changeBar, getDelay, signal, pauseControllerRef);
    await mergeSortMerger(array, start, middle, end, changeBar, getDelay, pauseControllerRef);
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
    await mergeSortHelper(array, 0, array.length - 1, changeBar, getDelay, signal, pauseControllerRef);
};

const quickSortHelper = async (array, start, end, changeBar, getDelay, signal, pauseControllerRef) => {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (start >= end) {
        return;
    }

    const pivot = array[Math.floor((start + end) / 2)].value;
    let i = start;
    let j = end;

    while (i <= j) {
        // Find element on the left that should be on the right
        changeBar(i, { state: "comparing" }, true, false, true); // step and comparison
        while (i <= end && array[i].value < pivot) {
            changeBar(i, { state: "idle" }, false, false, false);
            i++;
            if (i <= end) changeBar(i, { state: "comparing" }, true, false, true); // step and comparison
        }
        
        // Find element on the right that should be on the left
        changeBar(j, { state: "comparing" }, true, false, true); // step and comparison
        while (j >= start && array[j].value > pivot) {
            changeBar(j, { state: "idle" }, false, false, false);
            j--;
            if (j >= start) changeBar(j, { state: "comparing" }, true, false, true); // step and comparison
        }

        if (i <= j) {
            // Increment step counter for swap
            changeBar(i, { state: "selected" }, true, false);
            changeBar(j, { state: "selected" }, true, false);
            
            let temp = array[i].value;
            array[i].value = array[j].value;
            array[j].value = temp;
            
            changeBar(i, { value: array[i].value, state: "selected" }, true, true); // step and swap
            changeBar(j, { value: array[j].value, state: "selected" }, true, true); // step and swap

            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());

            changeBar(i, { value: array[i].value, state: "idle" });
            changeBar(j, { value: array[j].value, state: "idle" });
            i++;
            j--;
        }
    }

    await quickSortHelper(array, start, j, changeBar, getDelay, signal, pauseControllerRef);
    await quickSortHelper(array, i, end, changeBar, getDelay, signal, pauseControllerRef);
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
    await quickSortHelper(array, 0, array.length - 1, changeBar, getDelay, signal, pauseControllerRef);
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
    const maxDigits = mostDigits(array.map(item => item.value));

    for (let k = 0; k < maxDigits; k++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        
        // Create 10 buckets (0-9)
        let digitBuckets = Array.from({ length: 10 }, () => []);
        
        // Place each number in the corresponding bucket
        for (let i = 0; i < array.length; i++) {
            const digit = getDigit(array[i].value, k);
            digitBuckets[digit].push(array[i].value);
            
            // Visualize the current digit being considered
            changeBar(i, { state: "selected" }, true, false, false);
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            changeBar(i, { state: "idle" }, false, false, false);
            
            // Count the comparison for digit extraction
            changeBar(i, {}, true, false, true);
        }
        
        // Flatten buckets back into array
        let index = 0;
        for (let i = 0; i < digitBuckets.length; i++) {
            for (let j = 0; j < digitBuckets[i].length; j++) {
                array[index].value = digitBuckets[i][j];
                changeBar(index, { 
                    value: array[index].value, 
                    state: "selected" 
                }, true, true); // step and swap (assignment)
                await checkPause(pauseControllerRef);
                await awaitTimeout(getDelay());
                changeBar(index, { 
                    value: array[index].value, 
                    state: j === digitBuckets[i].length - 1 && i === digitBuckets.length - 1 ? "idle" : "sorted" 
                });
                index++;
            }
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

    // Determine min and max values from the array
    let minValue = array[0].value;
    let maxValue = array[0].value;
    
    // Find min and max values
    for (let i = 1; i < array.length; i++) {
        if (array[i].value < minValue) minValue = array[i].value;
        if (array[i].value > maxValue) maxValue = array[i].value;
    }
    
    // Initialize buckets
    const range = maxValue - minValue + 1;
    const bucketCount = Math.min(Math.ceil(range / bucketSize), 10); // Limit to 10 buckets max
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < array.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        
        // Count the comparison for bucket placement
        changeBar(i, { state: "comparing" }, true, false, true);
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
        
        // Calculate bucket index (0 to bucketCount-1)
        const normalizedValue = array[i].value - minValue;
        let bucketIndex = Math.floor((normalizedValue / range) * bucketCount);
        
        // Ensure index is within bounds
        bucketIndex = Math.min(bucketCount - 1, Math.max(0, bucketIndex));
        
        // Add to bucket
        buckets[bucketIndex].push(array[i].value);
        
        // Visualize the current element being placed in a bucket
        changeBar(i, { state: "selected" }, true, false, false);
        await checkPause(pauseControllerRef);
        await awaitTimeout(getDelay());
        changeBar(i, { state: "idle" }, false, false, false);
    }

    // Sort each bucket and update the array
    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        
        // Skip empty buckets
        if (buckets[i].length === 0) continue;
        
        // Sort the current bucket (this is done in-place for visualization)
        buckets[i].sort((a, b) => a - b);
        
        // Update the array with the sorted bucket
        for (let j = 0; j < buckets[i].length; j++) {
            if (index >= array.length) break; // Safety check
            
            array[index].value = buckets[i][j];
            changeBar(index, { 
                value: buckets[i][j], 
                state: "selected" 
            }, true, true, false); // step and swap (assignment)
            
            await checkPause(pauseControllerRef);
            await awaitTimeout(getDelay());
            
            // Determine the state - mark as sorted unless it's the last element
            const isLastElement = (j === buckets[i].length - 1 && i === buckets.length - 1);
            changeBar(index, { 
                value: buckets[i][j],
                state: isLastElement ? "idle" : "sorted"
            }, false, false, false);
            
            index++;
        }
    }
};