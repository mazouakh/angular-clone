import set from "lodash/set";

/**
 * Decorator @HostBinding : Binds between the decorated directive's property
 * and an attribute (or a nested property of an attribute) of the html element.
 *
 * @param attrName The name of the property of the html element to bind to.
 *
 * Example 1 :
 *
 * @HostBinding('placeholder')
 * myPlaceholderProperty;
 *
 * Example 2 :
 *
 * @HostBinding('style.color')
 * myTextColorProperty;
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
