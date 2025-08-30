// promises.js
// Async utility functions for delays and pause handling in sorting algorithms.

/**
 * Returns a promise that resolves after the given timeout (ms)
 */
export function awaitTimeout(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, timeout)
    })
}

/**
 * Pauses execution if pauseControllerRef is aborted, resumes when un-aborted
 */
export const checkPause = async (pauseControllerRef) => {
    if (pauseControllerRef?.current?.signal?.aborted) {
        await new Promise(resolve => {
            const checkPauseLoop = () => {
                if (!pauseControllerRef?.current?.signal?.aborted) {
                    resolve();
                } else {
                    setTimeout(checkPauseLoop, 100);
                }
            };
            checkPauseLoop();
        });
    }
};