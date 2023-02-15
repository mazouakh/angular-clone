/**
 * Decorator @HostListener : Allows to call the decorated method whenever an event is fired.
 *
 * @param eventType The type of event to listen for.
 * @param args A list of arguments to pass to the decorated function when the event is fired.
 */
export function HostListener(eventType: string, args: (string | number)[] = []) {
	return function (decoratedClass, methodName) {
		const oldInit = decoratedClass["init"] || function () {};

		decoratedClass["init"] = function () {
			// calling original init function
			oldInit.call(this);

			this.element.addEventListener(eventType, (event) => {
				// evaluating the arguments to valid js code
				const argsToSend = args.map((arg) => eval(arg.toString()));
				// calling the original method and giving it the arguments one by one
				this[methodName](...argsToSend);
			});
		};
	};
}
