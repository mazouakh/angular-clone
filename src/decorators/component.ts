import { ComponentMetaData } from "../framework/types";

/**
 * Class Decorator @Component : Marks a class as a Component. ie: displays and HTML template wherever
 * the selector is placed.
 *
 * @param MetaData selector, template, and providers? of the component
 */
export function Component(MetaData: ComponentMetaData) {
	return function (decoratedClass) {
		// creating static properties in the class
		decoratedClass["selector"] = MetaData.selector;
		decoratedClass["providers"] = MetaData.providers || [];

		// creating a render function in the component instance
		decoratedClass.prototype.render = function () {
			// storing a copy of the template in a local variable
			let renderTemplate = MetaData.template;
			// looking for all interpolations in the template
			MetaData.template.match(/\{\{(.+?)\}\}/g).forEach((match) => {
				// remove braces and spaces around the current interpolation found
				const propName = match.replace(/{{|}}/g, "").trim();
				// replace the interpolation in the render template with the actual
				// value of the corresponding property
				renderTemplate = renderTemplate.replace(match, this[propName]);
			});

			// a list that will store all the elements that are found to have event attributes
			// along with the type of the event and the method to call
			const eventsToBind: { elementID: string; eventName: string; methodName: string }[] = [];

			// get all the elements that have an event
			// getting the opening tag of that element
			// and then foreach element found : store that event in a eventsToBind list
			MetaData.template.match(/<.*?\(.*?\)=\".*?\".*?>/g).forEach((openingTag) => {
				// create a random id for that element
				const elementID: string = "event-listener-" + Math.random().toString(36).substring(7);

				// get the events attached to that element
				openingTag.match(/\(.*?\)=\".*?\"/g).forEach((match) => {
					// get the event name
					const eventName = match.match(/\(.*?\)/g)[0].replace(/\(|\)/g, "");
					// get the method name
					const methodName = match.match(/\".*?\"/g)[0].replace(/\"|\(|\)/g, "");
					// add the event to the eventsToBind list
					eventsToBind.push({ elementID, eventName, methodName });
				});

				// clear that event from the HTML element's opening tag
				// then add the elementID
				const finalOpeningTag = openingTag.replace(/\(.*?\)=\".*?\"/g, "").replace(/ >/g, `id="${elementID}">`);

				// replace the opening tag with the final opening tag
				renderTemplate = renderTemplate.replace(openingTag, finalOpeningTag);
			});

			this.element.innerHTML = renderTemplate;

			// once done, foreach element in the eventsToBind list : add event listeners to the element
			eventsToBind.forEach((eventToBind) => {
				this.element.querySelector("#" + eventToBind.elementID).addEventListener(eventToBind.eventName, () => {
					this[eventToBind.methodName]();
					this.render();
				});
			});
		};

		// overriding the init method in the component instance
		const originalInit = decoratedClass.prototype.init || function () {};

		decoratedClass.prototype.init = function () {
			originalInit.call(this);
			this.render();
		};

		return decoratedClass;
	};
}
