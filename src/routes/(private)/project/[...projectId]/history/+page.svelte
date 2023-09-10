<script>
	// @ts-nocheck
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	export let data;

	let mintAddresses = [];

</script>

<div class="flex items-center justify-center">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto w-full max-w-screen-lg p-8">
		{#each data.mints as mint (mint.id)}
			<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40 h-120">
				<Card.Header>
					<Card.Title class="text-white">{mint.name}</Card.Title>
					<Card.Description class="text-green-400 overflow-ellipsis">
						{#if mint.description === null}
							<p class="text-gray-400 overflow-ellipsis italic">No description provided</p>
						{:else}
							<p class="text-green-400 overflow-ellipsis">
								{mint.description}
							</p>
						{/if}
					</Card.Description>
				</Card.Header>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<Card.Content class="h-4/5 overflow-hidden pb-10">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						src={mint.image_url}
						alt="mint image"
						class="w-full h-full object-contain m-0 p-0 hover:cursor-pointer"
						on:click={() => {
							mintAddresses = mint.mint_addresses;
							const btn = document.getElementById('hiddenButton');
							btn?.click();
							console.log(mintAddresses);
						}}
					/>
					<p class="text-green-400 text-right">{mint.created_at}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>

<div class="overflow-y-auto max-h-[300px]">
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild let:builder>
			<Button builders={[builder]} variant="ghost" class="hidden" id="hiddenButton" />
		</AlertDialog.Trigger>
		<AlertDialog.Content class="bg-opacity-20 backdrop-blur-lg bg-green-40">
			<AlertDialog.Header>
				<!-- <AlertDialog.Title>Create a new Project</AlertDialog.Title> -->
				<AlertDialog.Description>
					<div class="overflow-y-auto max-h-[300px]">
						<Table.Root class="text-white text-center">
							<Table.Caption class="text-green-400">A list of recipient addresses.</Table.Caption>
							<Table.Header>
								<Table.Row>
									<Table.Head class="w-[100px] text-green-400 text-center">Mint Address</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#if mintAddresses && mintAddresses.length > 0}
									{#each mintAddresses as address}
										<Table.Row>
											<Table.Cell class="font-medium">{address}</Table.Cell>
										</Table.Row>
									{/each}
								{/if}
							</Table.Body>
						</Table.Root>
					</div>
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Close</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
