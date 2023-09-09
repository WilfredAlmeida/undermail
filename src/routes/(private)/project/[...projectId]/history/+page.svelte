<script>
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	export let data;

	// let items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`); // Initial list of items
	// let isLoading = false; // Indicates if more items are being loaded

	// // Function to load more items
	// async function loadMoreItems() {
	// 	isLoading = true;
	// 	// Simulate loading more items (you can replace this with an actual API call)
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));
	// 	const newItems = Array.from({ length: 5 }, (_, i) => `Item ${items.length + i + 1}`);
	// 	items = [...items, ...newItems];
	// 	isLoading = false;
	// }

	// // Detect when the user reaches the bottom of the list
	// // @ts-ignore
	// function handleScroll(event) {
	// 	const { scrollTop, clientHeight, scrollHeight } = event.target;
	// 	if (scrollHeight - scrollTop === clientHeight) {
	// 		loadMoreItems();
	// 	}
	// }

	// // Add an event listener for scrolling
	// onMount(() => {
	// 	const listContainer = document.querySelector('.list-container');
	// 	listContainer?.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		listContainer?.removeEventListener('scroll', handleScroll);
	// 	};
	// });
</script>

<div class="flex items-center justify-center">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-screen-lg p-8">
		{#each data.mints as mint (mint.id)}
			<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40 h-120">
				<Card.Header>
					<Card.Title class="text-white">{mint.name}</Card.Title>
					<Card.Description class="text-green-400 overflow-ellipsis"
						>
						{#if mint.description===null}
						<p class="text-gray-400 overflow-ellipsis italic">
							No description provided		
						</p>
						{:else}
						<p class="text-green-400 overflow-ellipsis">
							{mint.description}
						</p>
							{/if}
						</Card.Description
					>
				</Card.Header>
				<Card.Content class="h-4/5 overflow-hidden pb-10">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						src={mint.image_url}
						alt="mint image"
						class="w-full h-full object-contain m-0 p-0"
					/>
					<p class="text-green-400 text-right pt-3">{mint.created_at}</p>
				</Card.Content>
			</Card.Root>
		{/each}
		<!-- {#if isLoading}
			<div class="bg-black p-4 rounded-md text-green-400">Loading...</div>
		{/if} -->
	</div>
</div>
