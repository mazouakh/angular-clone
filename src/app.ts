import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { FormatterService } from "./services/formatter.service";

Angular.bootstrapApplication({
	providers: [
		{
			provide: "formatter",
			construct: () => new FormatterService("generic formatter"),
		},
	],
	declarations: [CreditCardDirective, PhoneNumberDirective],
});
