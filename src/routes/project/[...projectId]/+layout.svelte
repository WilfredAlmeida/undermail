<script>
	import { Home, Send, History, Settings } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let paneItems = [
		{
			itemId: 0,
			icon: Home,
			hoverText: 'Project Home',
			action: null
		},
		{
			itemId: 1,
			icon: Send,
			hoverText: 'Mint',
			action: null
		},
		{
			itemId: 2,
			icon: History,
			hoverText: 'Mint History',
			action: null
		},
		{
			itemId: 3,
			icon: Settings,
			hoverText: 'Project Settings',
			action: null
		}
	];
</script>

<div class="flex h-screen shadow-lg">
	<div
		class="w-16 p-6 shadow-md border-r-2 border-animation flex flex-col justify-start items-center"
	>
		{#each paneItems as item (item.itemId)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="ghost" class="text-green-400">
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
