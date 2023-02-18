import { Component } from "../decorators/component";
import { Input } from "../decorators/input";

@Component({
	selector: "user-profile",
	template: `
		<div style="border: red solid 1px; padding: 15px;">
			<h3>{{ firstName }} {{ lastName }}</h3>
			Job title : <strong>{{ job }}</strong>
			<button (click)="switchMode()" (dblclick)="baryonMode()">Switch to Gamer Mode</button>
		</div>
	`,
})
export class UserProfileComponent {
	constructor(public element: HTMLElement) {}

	@Input("first-name")
	firstName: string;

	@Input("last-name")
	lastName: string;

	@Input("job")
	job: string;

	switchMode() {
		console.log("Switching mode");
		this.job = "Gamer";
	}
	baryonMode() {
		console.log("Baryon mode");
		this.job = "Baryon";
	}
}
