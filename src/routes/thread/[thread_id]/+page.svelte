<script>
  import LoginHeader from '$lib/components/LoginHeader.svelte';
  import { get, post } from '$lib/api';
  import { userData } from '$lib/shared.svelte.js';
  import { onMount } from 'svelte';

  let { data } = $props();
  let propData = data;
  let posts = $state([]);

  async function reloadPosts() {
  	posts = await get(`t/${data.thread_id}/posts`);
  }
  $effect(async () => {
  	await reloadPosts();
  });

  let content = $state("");
  async function postPost() {
	console.log('Posting thread', content);
	let data = await post(`t/${propData.thread_id}/posts`, {
		title: "",
		content,
		image_key: "",
	})
	content = "";
	reloadPosts();
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

<h1 class="text-2xl font-bold p-4">Posts</h1>

<form class="flex gap-2 px-4">
  <input
    type="text"
    placeholder="Enter thread title"
    bind:value={content}
    class="border rounded p-2 flex-1"
  />
  <button type="submit" class="bg-cyan-500 text-white px-4 py-2 rounded" onclick={postPost}>
    Post
  </button>
</form>

<div class="boards-container">
<!--<div>-->
  {#each posts as post}
    <div class="board-card" >
  	<b>{ post.title }</b>
	{ post.content }
    </div>
    <p class="text-right"> Posted by { post.user_id } </p>
  {/each}
</div>
