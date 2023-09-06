<script>
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<div class="flex justify-center items-center h-screen">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto">
		<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40">
			<Card.Header>
				<Card.Title class="text-white">NFT Details</Card.Title>
				<Card.Description class="text-green-400"
					>Enter NFT Details</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="grid w-full items-center gap-4 text-white">
						<div class="flex flex-col space-y-1.5">
							<Label for="name">Name</Label>
							<Input id="name" placeholder="Name of the NFT" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="description">Description</Label>
							<Input id="description" placeholder="Optional Description" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="image">Image</Label>
							<Input id="image" type="file" class="cursor-pointer"/>
						</div>
					</div>
				</form>
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40">
			<Card.Header>
				<Card.Title class="text-white">Mint To</Card.Title>
				<Card.Description class="text-green-400"
					>Upload or paste the addresses</Card.Description>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="grid w-full items-center gap-4 text-white">

                        <div class="flex flex-col space-y-1.5">
							<Label for="image">CSV</Label>
							<Input id="image" type="file" class="cursor-pointer"/>
						</div>

						<div class="flex flex-col space-y-1.5">
							<Label for="description">Addresses</Label>
							<Input id="description" type="text" class="h-40" placeholder="Solana Public Keys" />
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex justify-end">
				<Button variant="default" class="w-32 bg-green-400 hover:bg-green-400 hover:text-black"
					>Mint</Button
				>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
