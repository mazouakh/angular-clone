import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
import { Detector } from "../framework/change-detector";
import { FormatterService } from "../services/formatter.service";
@Directive({
	selector: "[credit-card]",
})
export class CreditCardDirective {
	constructor(public element: HTMLElement, private formatter: FormatterService) {}

	@HostBinding("style.borderColor")
	@Input("border-color")
	borderColor: string = "green";

	@HostBinding("placeholder")
	placeholder: string = "Credit Card Number";

	@HostBinding("value")
	inputValue: string = "";

	@HostListener("input", ["event.target.value"])
	formatCreditCardNumber(value: string) {
		this.inputValue = this.formatter.formatNumber(value, 16, 4, true);
	}
}
