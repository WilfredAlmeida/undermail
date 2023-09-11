<script>
	// @ts-nocheck

	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	export let form;

	let name = '';
	let description = '';

	const imageValidation = () => {
		console.log('IN IMAGE VALIDATION');

		var sourceFile = document.getElementById('sourceNftImage');
		var targetFile = document.getElementById('targetNftImage');

		var allowedExtensions = /(\.jpg|\.jpeg)$/i;

		var filePath = sourceFile.value;
		if (!allowedExtensions.exec(filePath)) {
			alert(`Only JPG/JPEG Allowed`);
			sourceFile.value = '';
			return false;
		}

		targetFile.files = sourceFile.files;
	};

	const csvValidation = () => {
		var fileInput = document.getElementById('csvFile');

		var filePath = fileInput?.value;

		var allowedExtensions = /(\.csv)$/i;

		if (!allowedExtensions.exec(filePath)) {
			alert(`Only CSV Allowed`);
			fileInput.value = '';
			return false;
		}
	};

	const submitForms = async ({ fetch }) => {
		const name = document.getElementById('name');
		const description = document.getElementById('description');
		const nftImage = document.getElementById('nftImage');
		const csvFile = document.getElementById('csvFile');
		const publicKeys = document.getElementById('publicKeys');

		console.log(name.value);
		console.log(description.value);
		console.log(nftImage.files[0]);
		console.log(csvFile.files[0]);
		console.log(publicKeys.value);

		const formData = new FormData();

		formData.append('nftName', name.value);
		formData.append('nftDescription', name.value);
		formData.append('nftImage', name.value);
		formData.append('csvFile', name.value);
		formData.append('mintAddress', name.value);

		const res = await fetch('/api/mint', {
			method: 'POST',
			body: formData
		});

		const resJson = await res.json();

		console.log('RESPONSE');
		console.log(resJson);
	};
</script>

<div class="flex justify-center items-center h-screen">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto">
		<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40">
			<Card.Header>
				<Card.Title class="text-white">NFT Details</Card.Title>
				<Card.Description class="text-green-400">Enter NFT Details</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid w-full items-center gap-4 text-white">
					<div class="flex flex-col space-y-4">
						<Label for="name">Name <span class="text-red-600">*</span></Label>
						<Input
							id="name"
							name="name"
							placeholder="Name of the NFT"
							on:change={(e) => (name = e.target.value)}
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="description">Description</Label>
						<Input
							id="description"
							name="description"
							placeholder="Optional Description"
							on:change={(e) => (description = e.target.value)}
						/>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="nftImage">Image <span class="text-red-600">*</span></Label>
						<Input
							id="sourceNftImage"
							name="nftImage"
							type="file"
							class="cursor-pointer"
							on:change={() => {
								imageValidation();
							}}
						/>
					</div>

					{#if form && form.message && form.message.toString().trim().length > 0}
						<p class="text-red-400 pt-10">{form.message}</p>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40">
			<Card.Header>
				<Card.Title class="text-white">Mint To</Card.Title>
				<Card.Description class="text-green-400">Upload or paste the addresses</Card.Description>
			</Card.Header>
			<Card.Content>
				<form
					id="createMintForm"
					method="post"
					action="?/createMint"
					enctype="multipart/form-data"
					use:enhance
				>
					<div class="grid w-full items-center gap-4 text-white">
						<div class="flex flex-col space-y-1.5">
							<Label for="csvFile">CSV</Label>
							<Input
								id="csvFile"
								name="csvFile"
								type="file"
								class="cursor-pointer"
								on:change={(e) => {
									csvValidation();
								}}
							/>
						</div>

						<div class="flex flex-col space-y-1.5">
							<Label for="publicKeys">Addresses</Label>
							<Input
								id="publicKeys"
								name="publicKeys"
								type="text"
								class="h-40"
								placeholder="Solana Public Keys"
							/>
						</div>

						<Input type="hidden" name="nameInput" bind:value={name} />
						<Input type="hidden" name="descriptionInput" bind:value={description} />
						<div class="hidden">
							<Input type="file" name="imgInput" id="targetNftImage" />
						</div>

						<div class="flex items-end justify-end">
							<Button
								variant="default"
								type="submit"
								class="w-32 bg-green-400 hover:bg-green-400 hover:text-black">Mint</Button
							>
						</div>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>

{#if form && form.success!==undefined && form.success===true}
<div
	id="notification"
	class="fixed top-20 right-0 p-4 m-4 bg-green-400 text-black shadow-md rounded-lg"
>
	<p class="text-lg font-bold text-center">Mint Initiated</p>
	<p class="text-gray-900 italic">Goto history to check it out</p>

</div>
{/if}