// FRAMEWORK : plug the directives on the html elements whith the corresponding attributes

import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";

// list of directives used in the app
const directives = [PhoneNumberDirective, CreditCardDirective];

directives.forEach((directive) => {
	// select all HTML elements on the page that have as an attribute the directive's selector
	const elements = document.querySelectorAll<HTMLElement>(directive.selector);
	if (elements.length > 0) {
		elements.forEach((element) => {
			// create a new instance of the directive and pass the HTML element as a parameter
			const directiveInstance = new directive(element);
			// then call the init function
			directiveInstance.init();
		});
	}
});
