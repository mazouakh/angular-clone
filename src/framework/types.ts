/**
 * A provider that will provide a way to construct instances of services to be injected when needed
 */
export type Provider = {
	/**
	 * The name of the service to provide
	 *
	 * For example: "formatter"
	 */
	provide: string;
	/**
	 * The constructor function that returns an instance of the service we want to provide
	 *
	 * for example: () => new Formatter()
	 */
	construct: Function;
};

/**
 * List of provider type
 */
export type Providers = Provider[];

/**
 * A service that will be injected when needed
 */
export type Service = {
	/**
	 * The name of the service
	 */
	name: string;

	/**
	 * The instance of the service
	 */
	instance: any;
};

/**
 * List of service type
 */
export type ServicesInstances = Service[];

/**
 * A module is a list of directives in their providers that will be created
 * when the application is bootstrapped
 */
export type Module = {
	/**
	 * List of directives classes to be instantiated and plugged
	 */
	declarations: any[];
	/**
	 * List of providers needed to construct the parameters of the directives
	 */
	providers?: Providers;
};

/**
 * An object that contains all the necessary parameters in order to construct a directive
 */
export type DirectiveMetaData = {
	/**
	 * The selector of the directive
	 */
	selector: string;

	/**
	 * The providers needed to construct the parameters of the directive
	 */
	providers?: Providers;
};

/**
 * An object that contains all the necessary parameters in order to construct a component
 */
export type ComponentMetaData = {
	/**
	 * The selector of the Component
	 */
	selector: string;

	/**
	 * The providers needed to construct the parameters of the component
	 */
	providers?: Providers;

	/**
	 * The HTML template of the component.
	 *
	 * HTML elements can take dynamic values using interpolation
	 * Example: <h1>{{title}}</h1>
	 *
	 * Events can also be bound to the HTML elements using the following convention.
	 * Example: <h1 (click)="callThisFunction()" (dblclick)="onDblClick()">{{title}}</h1>
	 *
	 */
	template: string;
};
