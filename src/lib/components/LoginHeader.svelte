<script>
	import { post } from '$lib/api.js'
	import { userData } from '$lib/shared.svelte.js'
	import { goto } from '$app/navigation'

	let username = $state('');
	let password = $state('');

	async function handleLogin() {
		console.log('Logging in with', username, password);
		let data = await post('login',{
			username, password,
		})
		console.log("user data", data);
		console.assert(data.token);
		userData.id = data.id;
		userData.token = data.token;
		localStorage.setItem("userData", JSON.stringify(userData));
		userData.id = data.id;
		userData.token = data.token;
		username = '';
		password = '';
		//window.location.href = '/';
	}
	async function handleRegister() {
		console.log('Registering', username, password);
		let data = await post('register',{
			username, password, email: ""
		});
		handleLogin();
	}
</script>

<style>

.login-container {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	align-items: center;
}

.login-container input[type="text"],
.login-container input[type="password"] {
	flex: 1 1 auto;
	min-width: 0;
}

.login-container button {
	flex: 0 0 auto;
}

@media (max-width: 500px) {
	.login-container input[type="text"],
	.login-container input[type="password"],
	.login-container button {
		flex: 1 1 100%;
	}
}

</style>


<div class="login-container">
	{#if userData.id}
	<p> Logged in as user no. {userData.id} </p>
	{:else}
	<button
		class="px-4 py-1 bg-amber-500 text-white rounded"
		onclick={handleRegister}
	>Register</button>
	<input
		class="px-2 py-1 border rounded"
		placeholder="Username"
		bind:value={username}
	/>
	<input
		class="px-2 py-1 border rounded"
		type="password"
		placeholder="Password"
		bind:value={password}
	/>
	<button
		class="px-4 py-1 bg-green-500 text-white rounded"
		onclick={handleLogin}
	>Login</button>
	{/if}
</div>
