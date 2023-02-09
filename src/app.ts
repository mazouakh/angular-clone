class PhoneNumberDirective {
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
		element.value = numbersGroups.join(" ");
	}

	// create init function
	init() {
		// add evenent lister on the element for input event
		this.element.addEventListener("input", (event) => {
			// set the value of that element equalt to the value returned by the formatPhoneNumber function
			const element = event.target as HTMLInputElement;
			this.formatPhoneNumber(element);
		});
	}
}

// select all HTML elements on the page that have the attribute phone-number
const elements = document.querySelectorAll<HTMLElement>("[phone-number]");
if (elements.length > 0) {
	elements.forEach((element) => {
		// create a new instance of the directive and pass the HTML element as a parameter
		const directive = new PhoneNumberDirective(element);
		// then call the init function
		directive.init();
	});
}
