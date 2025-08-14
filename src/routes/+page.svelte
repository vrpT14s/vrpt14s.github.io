<script>
  import LoginHeader from '$lib/components/LoginHeader.svelte';
  import Button from "$lib/components/Button.svelte"
  import { get } from '$lib/api';
  import { userData } from '$lib/shared.svelte.js';
  import {
	goto,
  } from '$app/navigation';

  let boards = $state([]);

  $effect(async () => {
  	boards = await get('boards');
	console.log($state.snapshot(boards));
  });

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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

<h1 class="text-2xl font-bold p-4">Boards</h1>

<div class="boards-container">
  {#each boards as board}
    <a href="/board/{board.id}">
      <div class="board-card">
        {board.name}
      </div>
    </a>
  {/each}
</div>
