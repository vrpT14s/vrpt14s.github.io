<script>
  import LoginHeader from '$lib/components/LoginHeader.svelte';
  import { get, post } from '$lib/api';
  import { userData } from '$lib/shared.svelte.js';
  import { onMount } from 'svelte';

  let { data } = $props();
  let propData = data;
  let threads = $state([]);
  async function reloadThreads() {
  	threads = await get(`b/${propData.board_id}/threads`);
  }
  $effect(async () => {
	//console.log($state.snapshot(userData));
  	await reloadThreads();
	//console.log($state.snapshot(threads));
  });

  let newThreadTitle = $state("");
  async function postThread() {
	console.log('Posting thread', newThreadTitle);
	let data = await post(`b/${propData.board_id}/threads`, {
		title: newThreadTitle,
		description: "",
		image_key: "",
	})
	newThreadTitle = "";
	reloadThreads();
  }

</script>

<style>
  .header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  .boards-container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    /*grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));*/
  }

  .board-card {
    background: #f9fafb;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background 0.2s;
  }
  .board-card:hover {
    background: #e5e7eb;
  }
</style>

<div class="header">
  <LoginHeader/>
</div>

<h1 class="text-2xl font-bold p-4">Threads</h1>

<form class="flex gap-2 px-4">
  <input
    type="text"
    placeholder="Enter thread title"
    bind:value={newThreadTitle}
    class="border rounded p-2 flex-1"
  />
  <button type="submit" class="bg-cyan-500 text-white px-4 py-2 rounded" onclick={postThread}>
    Post
  </button>
</form>

<div class="boards-container">
  {#each threads as thread}
    <a href="/thread/{thread.id}">
    <div class="board-card" >
  	{ thread.title }
    </div>
    <p class="text-right"> Posted by {JSON.stringify(thread.op_id) } </p>
    </a>
  {/each}
</div>
