/**
 * Decorator @Input : Allows to get a value from an attribute in the HTML element as an input and
 * stores it in the directive's decorated property.
 *
 * @param attribute The name of the attribute of the HTML element that has the value seeked.
 */
export function Input(attribute: string) {
	return (decoratedClass, propName: string) => {
		const oldInit: Function = decoratedClass["init"] || function () {};

		decoratedClass["init"] = function () {
			// looking for the element has the attribute that holds the input value
			/**
			 * for attributes that hold values other than just a string, the convention is to put
			 * those attributes between brackets
			 *
			 * example: [will-have-staces] = "true"
			 */
			if (this.element.hasAttribute(`[${attribute}]`)) {
				this[propName] = this.element.getAttribute(`[${attribute}]`) === "true";
			}
			// for attributes that hold string values
			if (this.element.hasAttribute(attribute)) {
				// get the value of the attribute
				this[propName] = this.element.getAttribute(attribute);
			}
			// calling the oldInit function
			oldInit.call(this);
		};
	};
}
