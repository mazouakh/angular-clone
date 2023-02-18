export class FormatterService {
	constructor(name: string) {}

	formatNumber(value: string, length: number, groupLength: number, willHaveSpaces = true): string {
		// replace anything that is not a number with an empty string.
		let formattedNumber = value.replace(/[^\d]/g, "");
		// limit the length of the phone number to 10 characters.
		formattedNumber = formattedNumber.length > length ? formattedNumber.slice(0, length) : formattedNumber;
		// put a space between two numbers
		const numbersGroups: string[] = [];
		for (let i = 0; i < formattedNumber.length; i += groupLength) {
			numbersGroups.push(formattedNumber.slice(i, i + groupLength));
		}
		return numbersGroups.join(willHaveSpaces ? " " : "");
	}
}
