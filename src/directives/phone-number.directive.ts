import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { Detector } from "../framework/change-detector";
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

	@Input("will-have-spaces")
	willHaveSpaces: boolean = true;

	// setting the "style.borderColor" attribute equal to borderColor property
	@HostBinding("style.borderColor") // bind this property to the "style.borderColor" attribute
	@Input("border-color") // If you find in as an input int the "border-color" attribute then take that value
	borderColor: string = "blue"; // default value is "blue"

	// bind this property to the "value" attribute of this element
	@HostBinding("value")
	inputValue: string = "";

	// add event lister on the element for input event
	@HostListener("input", ["event.target.value"])
	// create a function that formats the phone number in the input field.
	formatPhoneNumber(newValue: string) {
		this.inputValue = this.formatter.formatNumber(newValue, 10, 2, this.willHaveSpaces);
	}

	@HostListener("click")
	onclick() {
		this.borderColor = "red";
	}
}
