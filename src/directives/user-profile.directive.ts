import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/host-listener";
import { Input } from "../decorators/input";

@Directive({
	selector: "div[user-profile]",
})
export class UserProfileDirective {
	constructor(public element: HTMLElement) {}

	@Input("first-name")
	firstName: string;

	@Input("last-name")
	lastName: string;

	@Input("job")
	job: string;

	template: string = `
    <div style="border: red solid 1px; padding: 15px;">
        <h3>{{ firstName }} {{ lastName }}</h3>
        Job title : <strong>{{ job }}</strong>
        <button (click)="switchMode" (dblclick)="baryonMode">Switch to Gamer Mode</button>
    </div>
    `;

	init() {
		this.render();
	}

	render() {
		// storing a copy of the template in a local variable
		let renderTemplate = this.template;
		// looking for all interpolations in the template
		this.template.match(/\{\{(.+?)\}\}/g).forEach((match) => {
			// remove braces and spaces around the current interpolation found
			const propName = match.replace(/{{|}}/g, "").trim();
			// replace the interpolation in the render template with the actual
			// value of the corresponding property
			renderTemplate = renderTemplate.replace(match, this[propName]);
		});
		// once we replaced all the interpolations, we render the new template
		this.element.innerHTML = renderTemplate;

		/**
		 * <button (click)="switchMode" (dblClick)="baryonMode"></button>
		 * <button id="..."></button>
		 */

		// a list that will store all the elements that are found to have event attributes
		// along with the type of the event and the method to call
		const eventsToBind: { elementID: string; eventName: string; methodName: string }[] = [];

		// get all the elements that have an event
		// getting the opening tag of that element
		// and then foreach element found : store that event in a eventsToBind list
		this.template.match(/<.*?\(.*?\)=\".*?\".*?>/g).forEach((openingTag) => {
			// create a random id for that element
			const elementID: string = "event-listener-" + Math.random().toString(36).substring(7);

			// get the events attached to that element
			openingTag.match(/\(.*?\)=\".*?\"/g).forEach((match) => {
				// get the event name
				const eventName = match.match(/\(.*?\)/g)[0].replace(/\(|\)/g, "");
				console.log(eventName);
				// get the method name
				const methodName = match.match(/\".*?\"/g)[0].replace(/\"/g, "");
				console.log(methodName);

				// add the event to the eventsToBind list
				eventsToBind.push({ elementID, eventName, methodName });
			});
			console.table(eventsToBind);

			// clear that event from the HTML element's opening tag
			// then add the elementID
			const finalOpeningTag = openingTag.replace(/\(.*?\)=\".*?\"/g, "").replace(/ >/g, `id="${elementID}">`);
			console.log(finalOpeningTag);

			// replace the opening tag with the final opening tag
			renderTemplate = renderTemplate.replace(openingTag, finalOpeningTag);
		});

		this.element.innerHTML = renderTemplate;

		// once done, foreach element in the eventsToBind list : add event listeners to the element
		eventsToBind.forEach((eventToBind) => {
			this.element.querySelector("#" + eventToBind.elementID).addEventListener(eventToBind.eventName, () => {
				this[eventToBind.methodName].call(this);
				this.render();
			});
		});
	}

	switchMode() {
		console.log("Switching mode");
		this.job = "Gamer";
	}
	baryonMode() {
		console.log("Baryon mode");
		this.job = "Baryon";
	}
}
