import { speedMap, DEFAULT_BUCKET_SIZE } from '../speedConfig';

describe('Speed Configuration', () => {
  describe('speedMap', () => {
    it('should have correct delay values for each speed', () => {
      expect(speedMap.slow).toBe(128);
      expect(speedMap.medium).toBe(32);
      expect(speedMap.fast).toBe(8);
    });

    it('should have all required speed options', () => {
      expect(speedMap).toHaveProperty('slow');
      expect(speedMap).toHaveProperty('medium');
      expect(speedMap).toHaveProperty('fast');
    });

    it('should have numeric delay values', () => {
      Object.values(speedMap).forEach(delay => {
        expect(typeof delay).toBe('number');
        expect(delay).toBeGreaterThan(0);
      });
    });

    it('should have decreasing delay values for increasing speed', () => {
      expect(speedMap.slow).toBeGreaterThan(speedMap.medium);
      expect(speedMap.medium).toBeGreaterThan(speedMap.fast);
    });
  });

  describe('DEFAULT_BUCKET_SIZE', () => {
    it('should be a positive number', () => {
      expect(DEFAULT_BUCKET_SIZE).toBe(5);
      expect(typeof DEFAULT_BUCKET_SIZE).toBe('number');
      expect(DEFAULT_BUCKET_SIZE).toBeGreaterThan(0);
    });
  });

  describe('Speed mapping consistency', () => {
    it('should maintain consistent speed-to-delay mapping', () => {
      const expectedMapping = {
        slow: 128,
        medium: 32,
        fast: 8
      };

      expect(speedMap).toEqual(expectedMapping);
    });

    it('should allow speed selection by key', () => {
      const speeds = Object.keys(speedMap);
      expect(speeds).toContain('slow');
      expect(speeds).toContain('medium');
      expect(speeds).toContain('fast');
    });
  });
});
