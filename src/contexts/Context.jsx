import { createContext, useState, useRef } from "react";

import { getRandomNumber, getDigit, mostDigits } from "../helpers/math";
import { awaitTimeout } from "../helpers/promises";

export const SortingContext = createContext();
const speedMap = {
    "slow": 128,
    "medium": 32,
    "fast": 8
}

function Context({ children }) {
    const [sortingState, setSortingState] = useState({
        array: [],
        delay: speedMap["slow"],
        algorithm: "bubble_sort",
        sorted: false,
        sorting: false
    });
    const abortControllerRef = useRef(null);

    const changeBar = (index, payload) => {
        setSortingState((prev) => ({
            ...prev,
            array: prev.array.map((item, i) => (i === index ? { ...item, ...payload } : item)),
        }));
    };

    const generateSortingArray = () => {
        // Cancel ongoing sorting operation if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        const generatedArray = Array.from({ length: 50 }, () => ({
            value: getRandomNumber(102, 980),
            state: "idle",
        }));

        setSortingState((prev) => ({
            ...prev,
            array: generatedArray,
            sorted: false,
            sorting: false
        }));
    };

    const bubbleSort = async (signal) => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (signal.aborted) {
                    throw new DOMException('Aborted', 'AbortError');
                }
                changeBar(j, { state: "selected" });
                changeBar(j + 1, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    changeBar(j, { value: arr[j + 1] });
                    arr[j + 1] = temp;
                    changeBar(j + 1, { value: temp });
                    await awaitTimeout(sortingState.delay);
                }

                changeBar(j, { state: "idle" });
                changeBar(j + 1, { state: "idle" });
            }
        }
    };

    const selectionSort = async (signal) => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 0; i < arr.length; i++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            let min = i;
            changeBar(min, { state: "selected" });

            for (let j = i + 1; j < arr.length; j++) {
                changeBar(j, { state: "selected" });
                await awaitTimeout(sortingState.delay);

                if (arr[j] < arr[min]) {
                    changeBar(min, { state: "idle" });
                    min = j;
                    changeBar(min, { state: "selected" });
                } else {
                    changeBar(j, { state: "idle" });
                }
            }

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

    const insertionSort = async (signal) => {
        const arr = sortingState.array.map((item) => item.value);

        for (let i = 1; i < arr.length; i++) {
            if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
            let current = arr[i];
            let j = i - 1;

            changeBar(i, { value: current, state: "selected" });

            while (j > -1 && current < arr[j]) {
                arr[j + 1] = arr[j];
                changeBar(j + 1, { value: arr[j], state: "selected" });
                j--;
                await awaitTimeout(sortingState.delay);
                changeBar(j + 2, { value: arr[j + 1], state: "idle" });
            }

            arr[j + 1] = current;
            changeBar(j + 1, { value: current, state: "idle" });
        }
    };

    const mergeSort = async (signal) => {
        const arr = sortingState.array.map((item) => item.value);
        await mergeSortHelper(arr, 0, arr.length - 1, signal);
    };
    async function mergeSortHelper(arr, start, end, signal) {
        if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
        if (start >= end) return;

        const middle = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, middle, signal);
        await mergeSortHelper(arr, middle + 1, end, signal);
        await mergeSortMerger(arr, start, middle, end);
    }
    async function mergeSortMerger(arr, start, middle, end) {
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
            await awaitTimeout(sortingState.delay);
        }

        while (i < left.length) {
            changeBar(k, { value: left[i], state: "selected" });
            arr[k++] = left[i++];
            await awaitTimeout(sortingState.delay);
        }

        while (j < right.length) {
            changeBar(k, { value: right[j], state: "selected" });
            arr[k++] = right[j++];
            await awaitTimeout(sortingState.delay);
        }

        for (let i = start; i <= end; i++) {
            changeBar(i, { value: arr[i], state: "idle" });
        }
    }

    const quickSort = async (signal) => {
        const arr = sortingState.array.map((item) => item.value);
        await quickSortHelper(arr, 0, arr.length - 1, signal);
    };
    const quickSortHelper = async (arr, start, end, signal) => {
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

                await awaitTimeout(sortingState.delay);

                changeBar(i, { value: arr[i], state: "idle" });
                changeBar(j, { value: arr[j], state: "idle" });
                i++;
                j--;
            }
        }

        await quickSortHelper(arr, start, j, signal);
        await quickSortHelper(arr, i, end, signal);
    }

    const radixSort = async (signal) => {
        let arr = sortingState.array.map((item) => item.value);
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
                await awaitTimeout(sortingState.delay);
                changeBar(i, { value: arr[i], state: "idle" });
            }
        }
    }

    // Utility function for delaying execution
    const bucketSort = async (signal) => {
        let arr = sortingState.array.map((item) => item.value);
        if (arr.length === 0) return;

        // Determine min and max values
        let minValue = Math.min(...arr);
        let maxValue = Math.max(...arr);
        
        // Initialize buckets
        const DEFAULT_BUCKET_SIZE = 5;
        let bucketSize = sortingState.bucketSize || DEFAULT_BUCKET_SIZE;
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
            await awaitTimeout(sortingState.delay);
            changeBar(i, { value: arr[i], state: "idle" });
        }
    };

    const algorithmMap = {
        "bubble_sort": bubbleSort,
        "selection_sort": selectionSort,
        "insertion_sort": insertionSort,
        "merge_sort": mergeSort,
        "quick_sort": quickSort,
        "radix_sort": radixSort,
        "bucket_sort": bucketSort
    }

    const startVisualizing = async () => {
        setSortingState((prev) => ({
            ...prev,
            sorting: true
        }));

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            await algorithmMap[sortingState.algorithm](signal);

            setSortingState((prev) => ({
                ...prev,
                sorted: true,
                sorting: false  
            }));
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Sorting was aborted');
                setSortingState((prev) => ({
                    ...prev,
                    sorting: false
                }));
            } else {
                console.error('Error during sorting:', error);
            }
        } finally {
            abortControllerRef.current = null;
        }
    };

    const changeSortingSpeed = (e) => {
        setSortingState((prev) => ({
            ...prev,
            delay: speedMap[e.target.value] || 500
        }))
    }

    const changeAlgorithm = (algorithm) => {
        setSortingState((prev) => ({
            ...prev,
            algorithm
        }))
    }

    return (
        <SortingContext.Provider
            value={{
                sortingState,
                generateSortingArray,
                startVisualizing,
                changeSortingSpeed,
                changeAlgorithm
            }}
        >
            {children}
        </SortingContext.Provider>
    );
}

export default Context;