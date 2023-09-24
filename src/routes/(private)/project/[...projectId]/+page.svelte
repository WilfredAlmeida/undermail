<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import { Label } from "$lib/components/ui/label";
	export let data;

	console.log(data.project);

</script>

<div class="ml-12 text-white">
<Label class="font-bold text-6xl">{data.project.projectName}</Label>
{#if data.project.projectDescription === "null" || data.project.projectDescription===undefined}
<h4 class="text-gray-400 italic">No description provided</h4>
{:else}
<h4 class="text-green-400">{data.project.projectDescription}</h4>
{/if}
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 ml-20">
	<Card.Root
		class="w-50 h-50 bg-opacity-20 backdrop-blur-lg bg-green-400 border border-green-400 rounded-lg"
	>
		<Card.Header>
			<Card.Title class="text-sm font-medium text-center text-white">Total Mints</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-center text-white">{data.project.mintCount}</div>
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
			<div class="text-2xl font-bold text-center text-white">Available per Mint</div>
			<p class="text-xs text-center text-green-400 pt-5">Click on mint in history</p>
		</Card.Content>
	</Card.Root>
</div>