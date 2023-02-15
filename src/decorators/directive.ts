import { Directive } from "../framework/types";

/**
 * Decorator @Directive : Marks a class as a directive and modifies it before returning it.
 *
 * @param Metadata The selector and providers? of the directive.
 * @returns A decorated class containing the selector and providers as static properties.
 */
export function Directive(Metadata: Directive) {
	/**
	 * A decorator is a function that needs to return a function
	 * the retuned function takes as a parameter the original class the decorator is applied to
	 */
	return function (decoratedClass) {
		/**
		 * The decorated class needs to have a static property called "selector"
		 * which is the selector of the directive.
		 */
		decoratedClass["selector"] = Metadata.selector;
		/*
		 * The decorated class needs to have a static property called "providers"
		 * which is the providers of the directive if available or an empty array.
		 */
		decoratedClass["providers"] = Metadata.providers || [];

		/**
		 * returns the decorated class
		 */
		return decoratedClass;
	};
}
