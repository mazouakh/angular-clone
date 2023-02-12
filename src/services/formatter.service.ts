export class FormatterService {
	constructor() {
		console.log("FormatterService created " + Math.random());
	}

	formatNumber(value: string, length: number, groupLength: number, willHaveSpaces = true): string {
		// replace anything that is not a number with an empty string.
		let formatedNumber = value.replace(/[^\d]/g, "");
		// limit the length of the phone number to 10 characters.
		formatedNumber = formatedNumber.length > length ? formatedNumber.slice(0, length) : formatedNumber;
		// put a space between two numbers
		const numbersGroups: string[] = [];
		for (let i = 0; i < formatedNumber.length; i += groupLength) {
			numbersGroups.push(formatedNumber.slice(i, i + groupLength));
		}
		return numbersGroups.join(willHaveSpaces ? " " : "");
	}
}
