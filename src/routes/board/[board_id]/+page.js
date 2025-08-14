import { error } from '@sveltejs/kit';
import { get } from '$lib/api';
import { userData } from '$lib/shared.svelte.js';

export async function load({ params }) {
	console.log("test");
	console.log("newtest");
  	//threads = await get(`b/${params.board_id}/threads`, userData.token);
	console.log("newtest");
	//console.log("boards: ", boards);
	return {
		board_id: params.board_id,
		//threads
	};

	console.log("test");
	error(404, 'Not found');
}
