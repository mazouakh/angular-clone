import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
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
	constructor(public element: HTMLElement, private formatter: FormatterService) {}

	static bindings = [{ propName: "borderColor", attrName: "style.borderColor" }];

	@Input("will-have-spaces")
	willHaveSpaces: boolean = true;

	// setting the "style.borderColor" attribute equal to borderColor property
	@HostBinding("style.borderColor") // bind this property to the "style.borderColor" attribute
	@Input("border-color") // If you find in as an input int the "border-color" attribute then take that value
	borderColor: string = "blue"; // default value is "blue"

	// add event lister on the element for input event
	@HostListener("input", ["event.target"])
	// create a function that formats the phone number in the input field.
	formatPhoneNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
	}

	@HostListener("click")
	onclick() {
		this.borderColor = "red";
	}
}
