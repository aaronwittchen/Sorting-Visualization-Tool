import { awaitTimeout, checkPause } from '../promises';

describe('Promises Helper Functions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('awaitTimeout', () => {
    it('should resolve after the specified timeout', async () => {
      const timeout = 1000;
      const promise = awaitTimeout(timeout);
      
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), timeout);
      
      jest.advanceTimersByTime(timeout);
      await expect(promise).resolves.toBe(true);
    });

    it('should handle zero timeout', async () => {
      const promise = awaitTimeout(0);
      
      jest.advanceTimersByTime(0);
      await expect(promise).resolves.toBe(true);
    });

    it('should handle negative timeout', async () => {
      const promise = awaitTimeout(-100);
      
      jest.advanceTimersByTime(0);
      await expect(promise).resolves.toBe(true);
    });
  });

  describe('checkPause', () => {
    it('should resolve immediately when not paused', async () => {
      const pauseControllerRef = {
        current: {
          signal: { aborted: false }
        }
      };

      const promise = checkPause(pauseControllerRef);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should wait when paused and resolve when unpaused', async () => {
      const pauseControllerRef = {
        current: {
          signal: { aborted: true }
        }
      };

      const promise = checkPause(pauseControllerRef);
      
      // Should not resolve immediately when paused
      await expect(Promise.race([
        promise,
        new Promise(resolve => setTimeout(resolve, 10))
      ])).rejects.toThrow();
      
      // Unpause
      pauseControllerRef.current.signal.aborted = false;
      
      // Advance timers to trigger the check
      jest.advanceTimersByTime(100);
      
      await expect(promise).resolves.toBeUndefined();
    });

    it('should handle null pauseControllerRef', async () => {
      const promise = checkPause(null);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should handle undefined pauseControllerRef', async () => {
      const promise = checkPause(undefined);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should handle pauseControllerRef without current', async () => {
      const pauseControllerRef = {};
      const promise = checkPause(pauseControllerRef);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should handle pauseControllerRef without signal', async () => {
      const pauseControllerRef = { current: {} };
      const promise = checkPause(pauseControllerRef);
      await expect(promise).resolves.toBeUndefined();
    });
  });
});
