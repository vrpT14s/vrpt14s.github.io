import { load_from_local } from '$lib/shared.svelte.js'


export function init() {
	console.log("INIT");
	load_from_local();
}
