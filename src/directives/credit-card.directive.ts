import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";
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

	@HostListener("input", ["event.target"])
	formatCreditCardNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, 16, 4, true);
	}
}
