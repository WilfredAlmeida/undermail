<script>
	import { Home, Send, History, BarChart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { bypassLeftPaneRoutes } from '$lib/utils';

	export let data

	let paneItems = [
		{
			itemId: 0,
			icon: Home,
			hoverText: 'Project Home',
			action: `${$page.url.origin}/project/${data.projectId}`
		},
		{
			itemId: 1,
			icon: Send,
			hoverText: 'Mint',
			action: `${$page.url.origin}/project/${data.projectId}/mint`
		},
		{
			itemId: 2,
			icon: History,
			hoverText: 'Mint History',
			action: `${$page.url.origin}/project/${data.projectId}/history`
		},
		{
			itemId: 3,
			icon: BarChart,
			hoverText: 'Analytics',
			action: `${$page.url.origin}/project/${data.projectId}/analytics`
		}
	];
</script>

{#if !bypassLeftPaneRoutes.includes($page.url.pathname.split("/")[3])}
<div class="flex h-screen shadow-lg">
	<div
		class="w-16 p-6 shadow-md border-r-2 border-animation flex flex-col justify-start items-center"
	>
		{#each paneItems as item (item.itemId)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="ghost" class="text-green-400" on:click={()=>goto(item.action)}>
						<svelte:component this={item.icon} />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{item.hoverText}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
	<div class="w-full">
		<slot/>
	</div>
</div>
{:else}
<div class="w-full">
	<slot/>
</div>
{/if}
