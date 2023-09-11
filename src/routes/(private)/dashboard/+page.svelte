<script>
	// @ts-nocheck

	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let form;
	export let data;

	let showDialog = false;
	let isLoading = false;

	const createProject = () => {
		setTimeout(() => {
			isLoading = true;
		}, 100);
		setTimeout(() => {
			showDialog = false;
		}, 7000);

	};

	function fileValidation() {
		var fileInput = document.getElementById('image');

		var filePath = fileInput?.value;

		// Allowing file type
		var allowedExtensions = /(\.jpg|\.jpeg)$/i;

		if (!allowedExtensions.exec(filePath)) {
			alert('Only JPG/JPEG Allowed');
			fileInput.value = '';
			return false;
		}
	}
</script>

<main class="p-8">
	<div class="flex justify-end">
		<AlertDialog.Root open={showDialog}>
			<AlertDialog.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					class="top-4 right-8 px-4 py-2 hover:bg-green-400 hover:text-black text-white border-green-400 border-b-2 border-t-2"
					on:click={() => {
						try {
							form.message = '';
						} catch {}
						showDialog = true;
						isLoading = false;
					}}>Create Project</Button
				>
			</AlertDialog.Trigger>
			<AlertDialog.Content class="bg-opacity-20 backdrop-blur-lg bg-green-40">
				<AlertDialog.Header>
					<!-- <AlertDialog.Title>Create a new Project</AlertDialog.Title> -->
					<AlertDialog.Description>
						<Card.Root class="bg-opacity-20 backdrop-blur-lg bg-green-40">
							<Card.Header>
								<Card.Title class="text-white">Create project</Card.Title>
								{#if form?.message}
									<Card.Description class="text-red-400 font-bold">{form.message}</Card.Description>
								{:else}
									<Card.Description class="text-green-400"
										>Create your new project in one-click.</Card.Description
									>
								{/if}
							</Card.Header>
							<Card.Content>
								<form
									method="post"
									action="?/createProject"
									id="createProjectForm"
									enctype="multipart/form-data"
									use:enhance
								>
									<div class="grid w-full items-center gap-4 text-white">
										<div class="flex flex-col space-y-1.5">
											<Label for="name">Name <span class="text-red-400">*</span></Label>
											<Input id="name" name="projectName" placeholder="Name of your project" />
										</div>
										<div class="flex flex-col space-y-1.5">
											<Label for="description">Description</Label>
											<Input
												id="description"
												name="projectDescription"
												placeholder="One-liner Description"
											/>
										</div>
										<div class="flex flex-col space-y-1.5">
											<Label for="image">Image <span class="text-red-400">*</span></Label>
											<Input
												id="image"
												type="file"
												name="projectImage"
												class="cursor-pointer"
												on:change={fileValidation}
											/>
										</div>
									</div>
									<div class="flex flex-row pt-12 justify-between">
										<Button
											variant="ghost"
											class="text-white hover:text-black"
											type="button"
											on:click={() => (showDialog = false)}>Cancel</Button
										>
										{#if isLoading && !form?.message}
											<div class="w-12 h-12 relative">
												<div
													class="absolute inset-0 animate-spin rounded-full border-t-4 border-green-400 border-solid"
												/>
											</div>
										{:else}
											<Button
												variant="default"
												class="bg-green-400 hover:bg-green-400 hover:text-black"
												type="submit"
												on:click={createProject}>Create</Button
											>
										{/if}
									</div>
								</form>
							</Card.Content>
							<!-- <Card.Footer class="flex justify-between">
								<Button variant="ghost" class="text-white hover:text-black" on:click={() => (showDialog = false)}>Cancel</Button>
								<Button variant="default" class="bg-green-400 hover:bg-green-400 hover:text-black" on:click={createProject}>Create</Button
								>
							</Card.Footer> -->
						</Card.Root>
					</AlertDialog.Description>
				</AlertDialog.Header>
				<!-- <AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-green-400" on:m-keydown={() => {
				console.log('Hello world');
			}} >Create</AlertDialog.Action>
		  </AlertDialog.Footer> -->
			</AlertDialog.Content>
		</AlertDialog.Root>
	</div>

	<!-- List of user projects -->

	{#if data.projects.length === 0}
		<div class="flex justify-center items-center">
			<div
				class="relative block max-w-sm p-6 h-40 w-80 rounded-lg hover:opacity-80 hover:shadow-lg"
			>
				<div
					class="p-6 absolute inset-0 bg-opacity-20 backdrop-blur-lg bg-gray-400 border border-white rounded-lg text-center"
				>
					<h3 class="text-white font-bold">No Projects Found</h3>
					<p class="text-green-400 pt-8">Create some cool projects</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
		{#each data.projects as project (project.projectId)}
			<a
				href="/project/{project.projectId}"
				class="relative block max-w-sm p-6 h-40 rounded-lg hover:opacity-80 hover:shadow-lg"
			>
				<div
					class="p-6 absolute inset-0 bg-opacity-20 backdrop-blur-lg bg-green-400 border border-green-400 rounded-lg"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
						{project.projectName}
					</h5>
					{#if project.projectDescription === 'null'}
						<p class="pt-5 font-normal text-gray-400 italic dark:text-gray-400">
							No description provided
						</p>
					{:else}
						<p class="pt-5 font-normal text-white dark:text-gray-400">
							{project.projectDescription}
						</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</main>
