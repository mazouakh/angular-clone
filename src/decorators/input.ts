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
