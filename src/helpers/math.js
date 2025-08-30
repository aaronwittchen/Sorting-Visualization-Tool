// math.js
// Utility math functions for the sorting visualization tool.

/**
 * Returns a random integer between min and max (inclusive)
 */
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns the digit at the given place value in a number
 */
export function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

/**
 * Returns the maximum number of digits in an array of numbers
 */
export function mostDigits(nums) {
    let maxDigits = 0;
    for (let num of nums) {
        maxDigits = Math.max(maxDigits, num.toString().length);
    }
    return maxDigits;
}
