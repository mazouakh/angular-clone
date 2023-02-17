import "zone.js/dist/zone.js";
import { Detector } from "./change-detector";

export const NgZone = Zone.current.fork({
	onInvokeTask: function (parentZone, currentZone, targetZone, task, applyThis, applyArgs) {
		parentZone.invokeTask(targetZone, task, applyThis, applyArgs);
		Detector.digest();
	},
	name: "NgZone",
});
