// aboutAlgorithm.js
// Contains detailed descriptions, time/space complexity, and explanations for each sorting algorithm.

const aboutAlgorithm = {
  bubble_sort: {
    name: 'Bubble Sort',
    time_complexity: {
      best: ['O(n)', 'amber-500'],
      average: ['O(n²)', 'rose-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(1)', 'teal-800'],
    description: `
			Introduction:
			Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted elements "bubble up" to their correct positions with each pass.

			Key Steps:
			1. Start at the beginning of the list.
			2. Compare each pair of adjacent elements.
			3. Swap them if they are in the wrong order.
			4. Continue this process until reaching the end of the list.
			5. Repeat the process for the remaining unsorted portion until no swaps are needed.

			Efficiency:
			Worst-case and average-case time complexity is O(n²), while the best case (already sorted) is O(n). Space complexity is O(1). Bubble Sort is mainly used for educational purposes or small datasets.

			Notes:
			Simple to implement but inefficient for large datasets. Slightly optimized versions can stop early if no swaps occur in a pass.
		`,
  },
  selection_sort: {
    name: 'Selection Sort',
    time_complexity: {
      best: ['O(n²)', 'rose-500'],
      average: ['O(n²)', 'rose-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(1)', 'teal-800'],
    description: `
			Introduction:
			Selection Sort is a comparison-based algorithm that repeatedly selects the minimum (or maximum) element from the unsorted portion of the list and moves it to the sorted portion.

			Key Steps:
			1. Start with the first element of the unsorted portion.
			2. Find the minimum element in the unsorted portion.
			3. Swap it with the first unsorted element.
			4. Move the boundary of the sorted portion one step forward.
			5. Repeat until the entire list is sorted.

			Efficiency:
			Time complexity is O(n²) in all cases; space complexity is O(1). Requires fewer swaps than Bubble Sort but still inefficient for large datasets.

			Notes:
			Good for small datasets or when minimizing swaps is important. Not stable by default.
		`,
  },
  insertion_sort: {
    name: 'Insertion Sort',
    time_complexity: {
      best: ['O(n)', 'amber-500'],
      average: ['O(n²)', 'rose-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(1)', 'teal-800'],
    description: `
			Introduction:
			Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position within the already sorted portion.

			Key Steps:
			1. Assume the first element is sorted.
			2. Take the next element and compare it to the sorted portion.
			3. Shift larger elements in the sorted portion one step to the right.
			4. Insert the current element into its correct position.
			5. Repeat for all elements.

			Efficiency:
			Best-case time complexity is O(n) for already sorted arrays, worst-case is O(n²). Space complexity is O(1). Performs well on small or nearly sorted datasets.

			Notes:
			Stable algorithm, simple to implement, and often used for small datasets or as part of hybrid algorithms like TimSort.
		`,
  },
  merge_sort: {
    name: 'Merge Sort',
    time_complexity: {
      best: ['O(n log n)', 'amber-500'],
      average: ['O(n log n)', 'amber-500'],
      worst: ['O(n log n)', 'amber-500'],
    },
    space_complexity: ['O(n)', 'amber-500'],
    description: `
			Introduction:
			Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and merges them back together in order.

			Key Steps:
			1. Divide the list into two halves recursively until each sublist has one element.
			2. Merge sublists by comparing elements and building a sorted list.
			3. Continue merging until the entire list is sorted.

			Efficiency:
			Time complexity is O(n log n) for all cases; space complexity is O(n) due to temporary arrays for merging.

			Notes:
			Stable and efficient for large datasets. Preferred for linked lists or datasets where stability is required.
		`,
  },
  quick_sort: {
    name: 'Quick Sort',
    time_complexity: {
      best: ['O(n log n)', 'amber-500'],
      average: ['O(n log n)', 'amber-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(log n)', 'teal-800'],
    description: `
			Introduction:
			Quick Sort is a divide-and-conquer algorithm that partitions the array around a pivot element and recursively sorts the subarrays.

			Key Steps:
			1. Choose a pivot element (first, last, random, or median).
			2. Partition elements: less than pivot to left, greater to right.
			3. Recursively apply Quick Sort to left and right subarrays.
			4. Stop when subarrays have fewer than two elements.

			Efficiency:
			Average-case time complexity is O(n log n); worst-case is O(n²) if pivot selection is poor. Space complexity is O(log n) due to recursion.

			Notes:
			Highly efficient for large datasets in practice. Performance improves with good pivot selection strategies.
		`,
  },
  radix_sort: {
    name: 'Radix Sort',
    time_complexity: {
      best: ['O(nk)', 'teal-800'],
      average: ['O(nk)', 'teal-800'],
      worst: ['O(nk)', 'teal-800'],
    },
    space_complexity: ['O(n + k)', 'amber-500'],
    description: `
			Introduction:
			Radix Sort is a non-comparative algorithm that sorts numbers digit by digit, starting from the least significant digit to the most significant.

			Key Steps:
			1. Determine the maximum number of digits in the dataset.
			2. Distribute elements into buckets based on the current digit.
			3. Collect elements from buckets in order.
			4. Move to the next digit and repeat.
			5. Continue until all digits are processed.

			Efficiency:
			Time complexity is O(nk) where k is the number of digits; space complexity is O(n + k). Efficient when k is small compared to n.

			Notes:
			Non-comparative and stable. Works best with integers or fixed-length strings.
		`,
  },
  bucket_sort: {
    name: 'Bucket Sort',
    time_complexity: {
      best: ['O(n + k)', 'teal-800'],
      average: ['O(n + n log(n/k))', 'amber-500'],
      worst: ['O(n²)', 'rose-500'],
    },
    space_complexity: ['O(n + k)', 'amber-500'],
    description: `
			Introduction:
			Bucket Sort divides data into smaller "buckets" and sorts them individually, making it efficient for uniformly distributed datasets.

			Key Steps:
			1. Determine data range and create appropriate buckets.
			2. Distribute elements into corresponding buckets.
			3. Sort each bucket individually (e.g., using Insertion Sort).
			4. Concatenate all buckets to form the sorted array.

			Efficiency:
			Time complexity is O(n + k) for well-distributed data; worst-case is O(n²). Space complexity is O(n + k).

			Notes:
			Stable if internal bucket sort is stable. Effective for floating-point numbers and uniform distributions.
		`,
  },
};

export default aboutAlgorithm;
