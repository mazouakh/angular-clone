import set from "lodash/set";

/**
 * Decorator @HostBinding : Binds between the decorated directive's property and a property of the html element.
 *
 * @param attrName The name of the property of the html element to bind to.
 */
export function HostBinding(attrName: string) {
	return function (decoratedClass, propName: string) {
		const oldInit = decoratedClass["init"] || function () {};

		decoratedClass["init"] = function () {
			oldInit.call(this);

			set(this.element, attrName, this[propName]);
		};
	};
}
