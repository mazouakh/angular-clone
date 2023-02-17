// FRAMEWORK : plug the directives on the html elements whith the corresponding attributes

import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { NgZone } from "./framework/zone";
import { FormatterService } from "./services/formatter.service";
NgZone.run(() => {
	Angular.bootstrapApplication({
		providers: [
			{
				provide: "formatter",
				construct: () => new FormatterService("generic formatter"),
			},
		],
		declarations: [CreditCardDirective, PhoneNumberDirective],
	});
});
