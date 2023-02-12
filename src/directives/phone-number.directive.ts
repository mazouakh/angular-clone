export class PhoneNumberDirective {
	static selector: string = "[phone-number]";

	willHaveSpaces: boolean = true;
	borderColor: string = "blue";

	constructor(public element: HTMLElement) {}

	// create a function that formats the phone number in the input field.
	formatPhoneNumber(element: HTMLInputElement) {
		// replace anything that is not a number with an empty string.
		let formatedNumber = element.value.replace(/[^\d]/g, "");
		// limit the length of the phone number to 10 characters.
		formatedNumber = formatedNumber.length > 10 ? formatedNumber.slice(0, 10) : formatedNumber;
		// put a space between two numbers
		const numbersGroups: string[] = [];
		for (let i = 0; i < formatedNumber.length; i += 2) {
			numbersGroups.push(formatedNumber.slice(i, i + 2));
		}
		element.value = numbersGroups.join(this.willHaveSpaces ? " " : "");
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
