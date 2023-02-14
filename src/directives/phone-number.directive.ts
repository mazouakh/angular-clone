import { Directive } from "../decorators/directive";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { Providers } from "../framework/types";
import { FormatterService } from "../services/formatter.service";

@Directive({
	selector: "[phone-number]",
	providers: [
		{
			provide: "formatter",
			construct: () => new FormatterService("phone formatter"),
		},
	],
})
export class PhoneNumberDirective {
	@Input("will-have-spaces")
	willHaveSpaces: boolean = true;

	@Input("border-color")
	borderColor: string = "blue";

	constructor(public element: HTMLElement, private formatter: FormatterService) {}

	// add evenent lister on the element for input event
	@HostListener("input", ["event.target"])
	// create a function that formats the phone number in the input field.
	formatPhoneNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
	}

	// create init function
	init() {
		// getting attributes from the element
		// this.willHaveSpaces = this.element.hasAttribute("will-have-spaces") ? this.element.getAttribute("will-have-spaces") === "true" : true;
		// this.borderColor = this.element.hasAttribute("border-color") ? this.element.getAttribute("border-color")! : "blue";

		this.element.style.borderColor = this.borderColor;

		// // add evenent lister on the element for input event
		// this.element.addEventListener("input", (event) => {
		// 	// set the value of that element equalt to the value returned by the formatPhoneNumber function
		// 	this.formatPhoneNumber(event.target as HTMLInputElement);
		// });
	}
}
