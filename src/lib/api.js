import { PUBLIC_API_BASE } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { userData } from '$lib/shared.svelte.js';

async function send({ method, path, data }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	let token = userData.token;

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(`${PUBLIC_API_BASE}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}
	if (res.status == 419) {
		console.log("JWT was expired");
		userData.id = null;
		userData.token = null;
		localStorage.removeItem("userData");
	}

	error(res.status);
}

export function get(path) {
	//console.log(`doing get for ${path} with token ${token}`);
	return send({ method: 'GET', path });
}

export function del(path) {
	return send({ method: 'DELETE', path });
}

export function post(path, data) {
	return send({ method: 'POST', path, data });
}

export function put(path, data) {
	return send({ method: 'PUT', path, data });
}
