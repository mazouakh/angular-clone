import { Directive } from "../framework/types";

export function Directive(Metadata: Directive) {
	return function (decoratedClass) {
		decoratedClass["selector"] = Metadata.selector;
		decoratedClass["providers"] = Metadata.providers || [];
		console.log(decoratedClass);

		return decoratedClass;
	};
}
