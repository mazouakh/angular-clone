import { FormatterService } from "../services/formatter.service";

export class PhoneNumberDirective {
	static selector: string = "[phone-number]";

	willHaveSpaces: boolean = true;
	borderColor: string = "blue";

	constructor(public element: HTMLElement, private formatter: FormatterService) {}

	// create a function that formats the phone number in the input field.
	formatPhoneNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
	}

	// create init function
	init() {
		// getting attributes from the element
		this.willHaveSpaces = this.element.hasAttribute("will-have-spaces") ? this.element.getAttribute("will-have-spaces") === "true" : true;
		this.borderColor = this.element.hasAttribute("border-color") ? this.element.getAttribute("border-color")! : "blue";

		this.element.style.borderColor = this.borderColor;
		// add evenent lister on the element for input event
		this.element.addEventListener("input", (event) => {
			// set the value of that element equalt to the value returned by the formatPhoneNumber function
			const element = event.target as HTMLInputElement;
			this.formatPhoneNumber(element);
		});
	}
}
