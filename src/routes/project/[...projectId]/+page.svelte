<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import { Label } from "$lib/components/ui/label";

	import { page } from '$app/stores';

	const { projectId } = $page.params;

</script>

<div class="ml-12 text-white">
<Label>Project Name</Label>
<h4 class="text-sm">Some Description</h4>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 ml-20">
	<Card.Root
		class="w-50 h-50 bg-opacity-20 backdrop-blur-lg bg-green-400 border border-green-400 rounded-lg"
	>
		<Card.Header>
			<Card.Title class="text-sm font-medium text-center text-white">Total Mints</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-center text-white">100</div>
			<p class="text-xs text-center text-green-400 pt-5">Hmmm so less, mint some more</p>
		</Card.Content>
	</Card.Root>

	<Card.Root
		class="w-50 h-50 bg-opacity-20 backdrop-blur-lg bg-green-400 border border-green-400 rounded-lg"
	>
		<Card.Header>
			<Card.Title class="text-sm font-medium text-center text-white">Analytics</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-center text-white">Coming Soon...</div>
			<p class="text-xs text-center text-green-400 pt-5">Stay Tuned</p>
		</Card.Content>
	</Card.Root>
</div>