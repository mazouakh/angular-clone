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

export type Module = {
	/**
	 * List of directives classes to be instanciated and pluged
	 */
	declarations: any[];
	/**
	 * List of providers needed to construct the parameters of the directives
	 */
	providers?: Providers;
};

export type Directive = {
	/**
	 * The selector of the directive
	 */
	selector: string;

	/**
	 * The providers needed to construct the parameters of the directive
	 */
	providers?: Providers;
};
