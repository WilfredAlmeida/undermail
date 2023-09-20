<script>
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { walletStore as walletStore$ } from '@svelte-on-solana/wallet-adapter-core';

	// @ts-nocheck
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';

	export let data;

	$: {
		if ($walletStore$.connected) {
			fetchData();
		}
	}

	let mintAddresses = [];

	$: {
		// console.log('$walletStore$: ', $walletStore$);
		// console.log('IN SCRIPT');
		fetchData();
	}

	const fetchData = async () => {
		if ($walletStore$.publicKey !== null) {
			fetch(`/api/view/${$walletStore$.publicKey}`, {
				method: 'GET'
			})
				.then(async (res) => {
					console.log('RESPONSE');

					const responseData = await res.json();

					data.mints = responseData.data.reverse();
				})
				.catch(async (e) => {
					console.log('ERROR');
					console.log(e);
				});
		}
	};

    const markAsViewed = async (mintId) =>{
        fetch(`/api/view/${$walletStore$.publicKey}`,{
            method: 'PATCH',
            body: JSON.stringify({
                mintId: mintId,
                pk: $walletStore$.publicKey
            })
        }).then(async(res)=>{
            console.log("RESPONSE");
            console.log(await res.json());
        }).catch((e)=>{console.log(e);})
    }

</script>

<div on:click={fetchData} class="flex justify-end items-start p-12">
	<WalletMultiButton />
</div>

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
                            markAsViewed(mint.id)
							const btn = document.getElementById('hiddenButton');
							btn?.click();
							console.log(mintAddresses);
						}}
					/>
					<p class="text-green-400 text-right pt-2">{mint.created_at}</p>
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
				<AlertDialog.Title class="text-white">Marked as Viewed</AlertDialog.Title>
				<AlertDialog.Description class="text-green-400">
                    This NFT was marked as Viewed
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Close</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>

<!-- 
<div class="overflow-y-auto max-h-[300px]">
    <Tabs.Root value="receivers" class="w-[400px] bg-none">
        <Tabs.List class="bg-none">
            <Tabs.Trigger value="receivers" class="bg-none">Receivers</Tabs.Trigger>
            <Tabs.Trigger value="viewed">Viewers</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="receivers">
            <Table.Root class="text-white text-center">
                <Table.Caption class="text-green-400"
                    >A list of recipient addresses.</Table.Caption
                >
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[100px] text-green-400 text-center"
                            >Mint Address</Table.Head
                        >
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
        </Tabs.Content>
        <Tabs.Content value="viewed">
            <Table.Root class="text-white text-center">
                <Table.Caption class="text-green-400">A list of viewers.</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[100px] text-green-400 text-center"
                            >Viewers Address</Table.Head
                        >
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#if viewedAddresses && viewedAddresses.length > 0}
                        {#each viewedAddresses as address}
                            <Table.Row>
                                <Table.Cell class="font-medium">{address}</Table.Cell>
                            </Table.Row>
                        {/each}
                    {/if}
                </Table.Body>
            </Table.Root>
        </Tabs.Content>
    </Tabs.Root>
</div> -->