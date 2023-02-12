export class CreditCardDirective {
	static selector: string = "[credit-card]";

	constructor(public element: HTMLElement) {}

	formatCreditCardNumber(element: HTMLInputElement) {
		// replace anything that is not a number with an empty string.
		let formatedNumber = element.value.replace(/[^\d]/g, "");
		// limit the length of the phone number to 10 characters.
		formatedNumber = formatedNumber.length > 10 ? formatedNumber.slice(0, 16) : formatedNumber;
		// put a space between two numbers
		const numbersGroups: string[] = [];
		for (let i = 0; i < formatedNumber.length; i += 4) {
			numbersGroups.push(formatedNumber.slice(i, i + 4));
		}
		element.value = numbersGroups.join(" ");
	}

	init() {
		this.element.style.borderColor = "red";

		this.element.addEventListener("input", (event) => {
			this.formatCreditCardNumber(event.target as HTMLInputElement);
		});
	}
}
