// aboutAlgorithm.js
// Contains detailed descriptions, time/space complexity, and explanations for each sorting algorithm.

const aboutAlgorithm = {
	bubble_sort: {
		name: "Bubble Sort",
		time_complexity: {
			best: ['O(n)', 'amber-500'],
			average: ['O(n²)', 'rose-500'],
			worst: ['O(n²)', 'rose-500']
		},
		space_complexity: ['O(1)', 'teal-800'],
		description: `
			Bubble Sort is a straightforward sorting algorithm known for its simplicity. It operates by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process continues until no more swaps are needed, which indicates that the list is sorted.

			During each full pass through the list, the largest unsorted element "bubbles up" to its correct position, which is where the algorithm gets its name from.

			Key Steps:
			1. Start with the first pass over the list.
			2. For each pair of adjacent elements, compare them.
			3. If the first element is greater than the second, swap them.
			4. Continue this process until the end of the list.
			5. After each pass, the next pass can be done over the list minus the last sorted elements, which are already in their correct positions.
			6. The algorithm ends when a pass completes with no swaps, indicating that the list is fully sorted.

			Efficiency:
			Bubble Sort has a worst-case and average time complexity of O(n²), which makes it inefficient for large datasets. However, its simplicity and ease of implementation make it a good choice for educational purposes or small datasets.
		`
	},
	selection_sort: {
		name: "Selection Sort",
		time_complexity: {
			best: ['O(n²)', 'rose-500'],
			average: ['O(n²)', 'rose-500'],
			worst: ['O(n²)', 'rose-500'],
		},
		space_complexity: ['O(1)', 'teal-800'],
		description: `
			Selection Sort is a straightforward sorting algorithm known for its simplicity and intuitive approach. It works by repeatedly selecting the smallest (or largest, depending on the sorting order) element from the unsorted portion of the list and moving it to the end of the sorted portion. This process continues until the entire list is sorted.

			Key Steps:
			1. Initialize the starting point of the unsorted portion of the list (first unsorted element).
			2. Scan through the unsorted portion of the list to find the smallest element.
			3. Swap the found smallest element with the first element of the unsorted portion. This element is now considered sorted.
			4. Move the boundary between the sorted and unsorted portions one position to the right.
			5. Continue this process, finding the smallest element in the remaining unsorted portion and swapping it to its correct position, until the entire list is sorted.

			Efficiency:
			Selection Sort has a time complexity of O(n²) for both the worst-case and average scenarios. This quadratic time complexity makes it inefficient for large datasets, but its simplicity and minimal number of swaps (one per pass) can be advantageous for small datasets or educational purposes.
		`
	},
	insertion_sort: {
		name: "Insertion Sort",
		time_complexity: {
			best: ['O(n)', 'amber-500'],
			average: ['O(n²)', 'rose-500'],
			worst: ['O(n²)', 'rose-500']
		},
		space_complexity: ['O(1)', 'teal-800'],
		description: `
			Insertion Sort is a fundamental sorting algorithm, valued for its simplicity and practicality, especially for small or partially sorted datasets. It operates by building the final sorted list one item at a time, gradually inserting each new element into its correct position within the already sorted portion of the list.

			Key Steps:
			1. Assume the first element is already sorted, start with the second element.
			2. Compare the current element to the elements before it.
			3. Move elements that are greater than the current element one position to the right to make space for the insertion.
			4. Insert the current element into its correct position in the sorted portion of the list.
			5. Continue this process for each subsequent element until the entire list is sorted.
			
			Efficiency: 
			Insertion Sort has a worst-case and average time complexity of O(n²), making it less efficient than more advanced algorithms for large datasets. However, it performs well with small or nearly sorted lists and has a best-case time complexity of O(n) when the list is already sorted. Its simplicity and adaptability make it an excellent choice for small or partially sorted datasets and as a learning tool for understanding basic sorting principles.
		`
	},
	merge_sort: {
		name: "Merge Sort",
		time_complexity: {
			best: ['O(nlog(n))', 'amber-500'],
			average: ['O(nlog(n))', 'amber-500'],
			worst: ['O(nlog(n))', 'amber-500'],
		},
		space_complexity: ["O(n)", "amber-500"],
		description: `
			Merge Sort is a highly efficient, divide-and-conquer sorting algorithm that systematically divides the list into smaller sublists, sorts those sublists, and then merges them back together to produce a sorted list.

			Key Steps:
			Divide: Start by dividing the unsorted list into two roughly equal halves. This step is repeated recursively for each half until each sublist contains a single element or is empty. A single-element or empty list is inherently sorted.
			Conquer: Once the list has been divided into single-element or empty sublists, the algorithm begins the merging process. In this phase, adjacent sublists are combined into larger, sorted sublists.
			Merge: During the merging process, two sorted sublists are compared element by element. The smallest element from each sublist is taken and added to a new, merged list. This continues until all elements from the original sublists have been processed and merged into a single sorted list.
			Combine: After merging all the sublists together, the final sorted list is obtained.

			Efficiency: 
			Merge Sort has a time complexity of O(nlogn) for both the worst-case and average scenarios. This makes it significantly more efficient than simpler algorithms like Bubble Sort, especially for large datasets. The algorithm's space complexity is O(n) because it requires additional storage for the temporary sublists during the merging process.
		`
	},
	quick_sort: {
		name: "Quick Sort",
		time_complexity: {
			best: ['O(nlog(n))', 'amber-500'],
			average: ['O(nlog(n))', 'amber-500'],
			worst: ['O(n²)', 'rose-500']
		},
		space_complexity: ['O(log(n))', 'teal-800'],
		description: `
			Quick Sort is a highly efficient sorting algorithm that utilizes a divide-and-conquer strategy to sort a list. It works by selecting a "pivot" element from the list and partitioning the other elements into two sublists, according to whether they are less than or greater than the pivot. These sublists are then sorted recursively.

			Key Steps:
			1. Select an element from the list to act as the pivot. There are various strategies for choosing a pivot, such as picking the first element, the last element, a random element, or the median.
			2. Rearrange the list so that all elements less than the pivot come before it, and all elements greater than the pivot come after it. The pivot is then placed in its correct position.
			3. Apply the same process recursively to the sublists on either side of the pivot.
			4. The recursion terminates when the sublists contain fewer than two elements, which means they are already sorted.

			Efficiency: 
			Quick Sort generally has a time complexity of O(nlogn) on average, making it much faster than simpler algorithms like Bubble Sort for large datasets. However, in the worst case, such as when the smallest or largest element is always chosen as the pivot, its time complexity can degrade to O(n²v). Despite this, Quick Sort is often preferred in practice due to its efficiency and simplicity, particularly when implemented with good pivot selection techniques.
		`
	},
	radix_sort: {
		name: "Radix Sort",
		time_complexity: {
			best: ['O(nk)', 'teal-800'],
			average: ['O(nk)', 'teal-800'],
			worst: ['O(nk)', 'teal-800']
		},
		space_complexity: ['O(n+k)', 'amber-500'],
		description: `
			Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing individual digits. It is based on distributing elements into buckets according to their digits and then collecting them back in a specific order. This process continues for each digit place value, starting from the least significant digit and moving to the most significant digit.

			Key Steps:
			1. Determine the maximum number of digits in the largest number in the list. This defines how many passes (iterations) will be needed.
			2. Create a set of buckets for each digit (0 through 9).
			3. For each digit place (starting from the least significant digit), distribute the numbers into these buckets based on the current digit being processed.
			4. After distributing the numbers, collect them from the buckets in order. This step sorts the list based on the current digit place.
			5. Move to the next digit place (e.g., tens place, hundreds place) and repeat the distribution and collection steps until all digit places have been processed. After processing all digit places, the list will be sorted in ascending order.

			Efficiency:
			Radix Sort can achieve linear time complexity of O(nk), where n is the number of elements and k is the number of digits in the largest number. This makes Radix Sort efficient when k is relatively small compared to n. It requires additional space for the buckets, which can make it less space-efficient.
		`
	},
	bucket_sort: {
		name: "Bucket Sort",
		time_complexity: {
			best: ['O(nk)', 'teal-800'],
			average: [`O(n+nlog(n/k)) 
				≈ O(n+k+nlogn)`, 
				'amber-500'],
			worst: ['O(n²)', 'rose-500']
		},
		space_complexity: ['O(n+k)', 'amber-500'],
		description: `
			Bucket Sort is a sorting algorithm designed for efficiently sorting a large range of numbers by dividing the data into smaller "buckets" and sorting these buckets individually. It is particularly effective when the input is uniformly distributed across a range, as this allows the sorting of smaller sublists that are easier to manage.

			Key Steps:
			1. Determine the range of the data to be sorted. This helps in distributing the elements into appropriate buckets. The range could be a set of floating-point numbers or integers within a certain interval.
			2. The list is divided into several buckets, which can be thought of as smaller groups. The number of buckets depends on the number of elements in the list and the range of values. Each bucket is essentially a list itself.
			3. Each element from the original list is placed into a corresponding bucket based on its value. For instance, if you are sorting numbers between 0 and 1, you might create 10 buckets for numbers ranging from 0-0.1, 0.1-0.2, and so on. The idea is that elements close in value end up in the same bucket.
			4. Once all elements are placed into their appropriate buckets, each bucket is sorted individually. This sorting can be done using any efficient algorithm, such as Insertion Sort, Quick Sort, or even recursively applying Bucket Sort to each bucket.
			5. After sorting each bucket, the contents of the buckets are combined (concatenated) in order, resulting in a fully sorted list.

			Efficiency:
			If the input data is uniformly distributed across the buckets, and each bucket contains a small number of elements, the sorting of individual buckets is fast. This results in a time complexity close to O(n + k), where n is the number of elements, and k is the number of buckets. If the data isn't distributed evenly, with many elements ending up in a few buckets, the algorithm's efficiency may approach O(n²), but this situation is rare for well-distributed data.
		`
	},
}

export default aboutAlgorithm