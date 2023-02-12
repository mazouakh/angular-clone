// FRAMEWORK : plug the directives on the html elements whith the corresponding attributes

import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { FormatterService } from "./services/formatter.service";

// list of directives used in the app
const directives = [PhoneNumberDirective, CreditCardDirective];

// List of providers that will provide a way to construct instances of services to be injected when needed
// TODO: this is a temporary solution to be able to inject services in the constructor of the directive
// see if there is a better way to do this by conmparing with the type of the class rather than the name of the parameter
const providers = [
	{
		provide: "formatter",
		construct: () => new FormatterService(),
	},
];

const services: { name: string; instance: any }[] = [];

directives.forEach((directive) => {
	// select all HTML elements on the page that have as an attribute the directive's selector
	const elements = document.querySelectorAll<HTMLElement>(directive.selector);
	if (elements.length > 0) {
		elements.forEach((element) => {
			// On analyse les paramètres du constructeur de la directive et
			// on les récupère
			const params = analyseDirectiveConstructor(directive, element);
			// Using the Reflect API, create a new instance of the directive and pass the appropriate parameters
			const directiveInstance = Reflect.construct(directive, params);
			// then call the init function
			directiveInstance.init();
		});
	}
});

// Analyse le constructeur d'une directive et nous donne les paramètres à passer à son constructeur (des dependences à injecter)
function analyseDirectiveConstructor(directive, element: HTMLElement) {
	// On vérifie que la directive a bien un constructeur
	const hasConstructor = /constructor\(.*?\)/g.test(directive.toString());

	// Si elle n'en a pas, on n'a donc aucun paramètre à lui passer pour sa construction
	if (!hasConstructor) {
		return [];
	}

	// Sinon, on va aller chercher les noms des paramètres à lui passer
	const paramsNames: string[] = extractParamNamesFromDirective(directive);

	// Pour chaque nom de paramètre, on crée une instance du parametre/service associé à ce dernier
	// afin de l'injecter dans le constructeur
	const params = paramsNames.map((name) => {
		// Si le nom est "element", alors on donne l'Elément HTML reçu
		if (name === "element") {
			return element;
		}
		// Sinon ça doit surment etre un service à injecter
		// On verifie si un service de ce nom a deja été instancié
		const service = services.find((service) => service.name === name);
		if (service) {
			return service.instance;
		}
		// Sinon on crée un service
		// On verifie si on un un provider qui peut nous fournir ce service et
		const provider = providers.find((p) => p.provide === name);
		if (!provider) {
			throw new Error("There is no provider defined for the service " + name);
		}
		// On crées une instance de ce service
		const serviceInstance = provider.construct();
		// On l'ajoute à la liste des services déja instanciés
		services.push({
			name: name,
			instance: serviceInstance,
		});
		// On retourne une instance de ce service
		return serviceInstance;
	});

	// On retourne une liste des instances de parametres/service à injecter
	return params;
}

// Analyse le constructeur d'une directive et retourne une liste des nom des paramètres du constructeur
function extractParamNamesFromDirective(directive): string[] {
	const paramNames = /constructor\((.*)\)/g.exec(directive.toString());

	if (!paramNames) {
		return [];
	}

	return paramNames[1].split(", ");
}
