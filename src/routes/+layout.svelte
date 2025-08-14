<script>
	export const ssr = false;
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
        import { userData } from '$lib/shared.svelte.js';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
