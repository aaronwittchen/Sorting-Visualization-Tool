import { getRandomNumber, getDigit, mostDigits } from '../math';

describe('Math Helper Functions', () => {
  describe('getRandomNumber', () => {
    it('should generate a number within the specified range', () => {
      const min = 10;
      const max = 20;
      const result = getRandomNumber(min, max);
      
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should handle same min and max values', () => {
      const value = 42;
      const result = getRandomNumber(value, value);
      
      expect(result).toBe(value);
    });

    it('should generate different numbers on multiple calls', () => {
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(getRandomNumber(1, 100));
      }
      
      // Check that we have some variety (not all the same)
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe('getDigit', () => {
    it('should get the correct digit at specified position', () => {
      expect(getDigit(123, 0)).toBe(3); // ones place
      expect(getDigit(123, 1)).toBe(2); // tens place
      expect(getDigit(123, 2)).toBe(1); // hundreds place
    });

    it('should return 0 for positions beyond the number', () => {
      expect(getDigit(123, 3)).toBe(0);
      expect(getDigit(123, 10)).toBe(0);
    });

    it('should handle single digit numbers', () => {
      expect(getDigit(5, 0)).toBe(5);
      expect(getDigit(5, 1)).toBe(0);
    });

    it('should handle zero', () => {
      expect(getDigit(0, 0)).toBe(0);
      expect(getDigit(0, 1)).toBe(0);
    });

    it('should handle negative positions', () => {
      expect(getDigit(123, -1)).toBe(0);
    });
  });

  describe('mostDigits', () => {
    it('should return the maximum number of digits in an array', () => {
      expect(mostDigits([1, 23, 456, 7890])).toBe(4);
      expect(mostDigits([1, 2, 3, 4, 5])).toBe(1);
      expect(mostDigits([100, 200, 300])).toBe(3);
    });

    it('should handle single element array', () => {
      expect(mostDigits([123])).toBe(3);
      expect(mostDigits([5])).toBe(1);
    });

    it('should handle empty array', () => {
      expect(mostDigits([])).toBe(0);
    });

    it('should handle array with zero', () => {
      expect(mostDigits([0, 123, 45])).toBe(3);
      expect(mostDigits([0])).toBe(1);
    });

    it('should handle array with all single digits', () => {
      expect(mostDigits([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(1);
    });
  });
});
