/**
 * Used in order to detect all changes occurring to HTML elements with HostBindings
 * and only keeping the changes that have the final values in order to avoid unnecessary
 * updates and unnecessary DOM operations.
 */

import { get, set } from "lodash";

export class ChangeDetector {
	// Will store the unique bindings that will apply at the end (when digesting)
	bindings: { element: HTMLElement; value: string; attrName: string }[] = [];

	/**
	 * Adds a binding to the change detector whilst making sure to only keep the most recent binding.
	 * Do not forget to call `digest` after you are finished with the change detection.
	 *
	 * @param element The target HTMLElement
	 * @param propName The name of the property that will be affected
	 * @param value The new value for the property
	 */
	addBinding(element: HTMLElement, attrName: string, value: string) {
		// first check if there is a binding already for this element
		// if so then filter out that binding and keep all others
		this.bindings = this.bindings.filter((b) => !(b.element === element));
		// Add the binding to the bindings list
		this.bindings.push({ element, attrName, value });
	}

	/**
	 * Apply all the changes that have been detected and filtered so far.
	 */
	digest() {
		console.group("DIGESTING");
		// Iterating through all the bindings
		while (this.bindings.length > 0) {
			const binding = this.bindings.pop();
			// only update the value if it is different from the current one
			if (binding.value === get(binding.element, binding.attrName)) {
				continue;
			}
			console.log("binding on : ", binding.element.tagName, " to property ", binding.attrName, " with value : ", binding.value);
			// updating the value
			set(binding.element, binding.attrName, binding.value);
		}
		console.groupEnd();
	}
}
// exporting an instance of the ChangeDetector
export const Detector = new ChangeDetector();
