import { CreditCardDirective } from "../directives/credit-card.directive";
import { PhoneNumberDirective } from "../directives/phone-number.directive";
import { FormatterService } from "../services/formatter.service";

export class Framework {
	constructor() {}

	/**
	 * list of directives used in the app
	 */
	directives: any[] = [];

	/**
	 * List of providers that will provide a way to construct instances of services to be injected when needed
	 * TODO: see if there is a better way to do this by comparing with the type of the class rather than the name of the parameter
	 */
	providers: { provide: string; construct: Function }[] = [];

	/**
	 * List of services that will be injected when needed
	 */
	services: { name: string; instance: any }[] = [];

	/**
	 *Intanciate all directives and plug them into the targeted HTML elements
	 */
	bootstrapApplication(metadata: { providers?: any[]; declarations: any[] }) {
		this.providers = metadata.providers || [];
		this.directives = metadata.declarations;
		this.directives.forEach((directive) => {
			// select all HTML elements on the page that have as an attribute the directive's selector
			const elements = document.querySelectorAll<HTMLElement>(directive.selector);
			if (elements.length > 0) {
				elements.forEach((element) => {
					// On analyse les paramètres du constructeur de la directive et
					// on les récupère
					const params = this.analyseDirectiveConstructor(directive, element);
					// Using the Reflect API, create a new instance of the directive and pass the appropriate parameters
					const directiveInstance: any = Reflect.construct(directive, params);
					// then call the init function
					directiveInstance.init();
				});
			}
		});
	}

	/**
	 * Analyse le constructeur d'une directive et nous donne les paramètres
	 * à passer à son constructeur (des dependences à injecter)
	 *
	 * @param directive La classe de la directive
	 * @param element l'element HTML ou va etre greffé la directive
	 * @returns la list des paramétrés et instances de services à injecter dans la directive
	 */
	private analyseDirectiveConstructor(directive, element: HTMLElement): any[] {
		// On vérifie que la directive a bien un constructeur
		const hasConstructor = /constructor\(.*?\)/g.test(directive.toString());

		// Si elle n'en a pas, on n'a donc aucun paramètre à lui passer pour sa construction
		if (!hasConstructor) {
			return [];
		}

		// Sinon, on va aller chercher les noms des paramètres à lui passer
		const paramsNames: string[] = this.extractParamNamesFromDirective(directive);

		// Pour chaque nom de paramètre, on crée une instance du parametre/service associé à ce dernier
		// afin de l'injecter dans le constructeur
		const params = paramsNames.map((name) => {
			// Si le nom est "element", alors on donne l'Elément HTML reçu
			if (name === "element") {
				return element;
			}

			// Sinon ça doit surment etre un service à injecter

			// On verifie d'abord si cette directive a un provider spécifique pour ce service
			const directiveProviders = directive.providers || [];
			const directiveProvider = directiveProviders.find((provider) => provider.provide === name);
			// Si c'est le cas, on créer une instance de ce service avec le constructeur defini dans ce provider
			// et on ne l'enregistre pas dans la liste des services car c'est un service spécifique à cette directive seulements
			if (directiveProvider) {
				return directiveProvider.construct();
			}

			// Si on a pas de provider specifique dans la directive, alors on tante d'utiliser le provider global
			// On verifie si un service de ce nom a deja été instancié
			const service = this.services.find((service) => service.name === name);
			if (service) {
				return service.instance;
			}
			// Sinon on crée un service
			// On verifie si on un un provider qui peut nous fournir ce service et
			const provider = this.providers.find((p) => p.provide === name);
			if (!provider) {
				throw new Error("There is no provider defined for the service " + name);
			}
			// On crées une instance de ce service
			const serviceInstance = provider.construct();
			// On l'ajoute à la liste des services déja instanciés
			this.services.push({
				name: name,
				instance: serviceInstance,
			});
			// On retourne une instance de ce service
			return serviceInstance;
		});

		// On retourne une liste des instances de parametres/service à injecter
		return params;
	}

	/**
	 * Analyse le constructeur d'une directive et retourne une liste des nom des paramètres du constructeur
	 *
	 * @param directive la classe de la directive à analyer
	 * @returns la liste des noms des paramètres du constructeur
	 */
	private extractParamNamesFromDirective(directive): string[] {
		const paramNames = /constructor\((.*)\)/g.exec(directive.toString());

		if (!paramNames) {
			return [];
		}

		return paramNames[1].split(", ");
	}
}
export const Angular = new Framework();
