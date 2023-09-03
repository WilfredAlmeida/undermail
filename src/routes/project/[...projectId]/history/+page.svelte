<script>
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';

	let items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`); // Initial list of items
	let isLoading = false; // Indicates if more items are being loaded

	// Function to load more items
	async function loadMoreItems() {
		isLoading = true;
		// Simulate loading more items (you can replace this with an actual API call)
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const newItems = Array.from({ length: 5 }, (_, i) => `Item ${items.length + i + 1}`);
		items = [...items, ...newItems];
		isLoading = false;
	}

	// Detect when the user reaches the bottom of the list
	// @ts-ignore
	function handleScroll(event) {
		const { scrollTop, clientHeight, scrollHeight } = event.target;
		if (scrollHeight - scrollTop === clientHeight) {
			loadMoreItems();
		}
	}

	// Add an event listener for scrolling
	onMount(() => {
		const listContainer = document.querySelector('.list-container');
		listContainer?.addEventListener('scroll', handleScroll);
		return () => {
			listContainer?.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-screen-lg p-8">
		{#each items as item (item)}
			<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40 h-120">
				<Card.Header>
					<Card.Title class="text-white">NFT Name</Card.Title>
					<Card.Description class="text-green-400 overflow-ellipsis"
						><p class="text-green-400 overflow-ellipsis">Description</p></Card.Description
					>
				</Card.Header>
				<Card.Content class="h-4/5 overflow-hidden pb-10">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						src="https://images.pexels.com/photos/18015250/pexels-photo-18015250/free-photo-of-the-tallest-stone-sculpture-in-europe.jpeg"
						alt="Image with text at the bottom right"
						class="w-full h-full object-contain m-0 p-0"
					/>
					<p class="text-green-400 text-right pt-3">03/09/2023 05:36 PM</p>
				</Card.Content>
			</Card.Root>
		{/each}
		{#if isLoading}
			<div class="bg-black p-4 rounded-md text-green-400">Loading...</div>
		{/if}
	</div>
</div>
