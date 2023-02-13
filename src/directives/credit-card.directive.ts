import { Directive } from "../decorators/directive";
import { Providers } from "../framework/types";
import { FormatterService } from "../services/formatter.service";
@Directive({
	selector: "[credit-card]",
})
export class CreditCardDirective {
	constructor(public element: HTMLElement, private formatter: FormatterService) {}

	formatCreditCardNumber(element: HTMLInputElement) {
		element.value = this.formatter.formatNumber(element.value, 16, 4, true);
	}

	init() {
		this.element.style.borderColor = "red";

		this.element.addEventListener("input", (event) => {
			this.formatCreditCardNumber(event.target as HTMLInputElement);
		});
	}
}
