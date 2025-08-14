//import { onMount } from 'svelte';
export const userData = $state({
	id: null,
	token: null,
});
export const load_from_local = () => {
	let local = JSON.parse(localStorage.getItem("userData"));
	if (!local) return;
	console.log("local: ", local);
	userData.id = local.id;
	userData.token = local.token;
};

//onMount(() => {
//	console.log('the component has mounted');
//	let local = localStorage.getItem("userData");
//	userData.id = local.id;
//	userData.token = local.token;
//});
