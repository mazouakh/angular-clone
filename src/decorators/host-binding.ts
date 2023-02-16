import set from "lodash/set";

/**
 * Property Decorator @HostBinding : Binds between the decorated directive's property
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
		// creating a list of bindings that the ChangeDetector will filter on
		const bindings = decoratedClass["bindings"] || [];
		bindings.push({ propName, attrName });
		decoratedClass["bindings"] = bindings;

		// Saving the original method.
		const oldInit = decoratedClass["init"] || function () {};

		// Creating a new method.
		decoratedClass["init"] = function () {
			// calling original method
			oldInit.call(this);
			// Bindings the property to an attribute.
			set(this.element, attrName, this[propName]);
		};
	};
}
