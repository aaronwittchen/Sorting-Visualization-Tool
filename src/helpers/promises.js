/* 
	https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout

	Function returns a Promise which resolves after a specified amount of time(milliseconds).
	Promises are used for handling asynchronous operations. In this case, the promise will be resolved after a certain period of time.
	Inside the Promise constructor, setTimeout is used to execute a function after a delay. The delay is specified by the timeout argument passed to awaitTimeout. When the timeout completes, 
	the resolve function is called with the value true, which means the promise will be fulfilled with the value true.
*/

export function awaitTimeout(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, timeout)
	})
}