<script>
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	// Sample data for user projects
	let userProjects = [
		{ id: 1, title: 'Project 1', description: 'Description of Project 1' },
		{ id: 2, title: 'Project 2', description: 'Description of Project 2' },
		{ id: 3, title: 'Project 3', description: 'Description of Project 3' }
	];
	let showDialog = false;
	// Function to create a new project
	const createProject = () => {
		// userProjects.push({ id: 4, title: 'Project 4', description: 'Description of Project 4' })
		userProjects = [...userProjects, { id: 4, title: 'Project 4', description: 'Description of Project 4' }]
		console.log(userProjects);

		showDialog = false;
	};
</script>

<main class="p-8">
	<!-- Heading -->
	<h1 class="text-3xl font-semibold mb-6 text-white">Projects</h1>

	<div class="flex justify-end">
		<AlertDialog.Root open={showDialog}>
			<AlertDialog.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="default"
					class="top-4 right-8 px-4 py-2 bg-green-400"
					on:click={() => (showDialog = true)}>Create Project</Button
				>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<!-- <AlertDialog.Title>Create a new Project</AlertDialog.Title> -->
					<AlertDialog.Description>
						<Card.Root class="">
							<Card.Header>
								<Card.Title>Create project</Card.Title>
								<Card.Description>Create your new project in one-click.</Card.Description>
							</Card.Header>
							<Card.Content>
								<form>
									<div class="grid w-full items-center gap-4">
										<div class="flex flex-col space-y-1.5">
											<Label for="name">Name</Label>
											<Input id="name" placeholder="Name of your project" />
										</div>
										<div class="flex flex-col space-y-1.5">
											<Label for="description">Description</Label>
											<Input id="description" placeholder="One-liner Description" />
										</div>
									</div>
								</form>
							</Card.Content>
							<Card.Footer class="flex justify-between">
								<Button variant="outline" on:click={() => (showDialog = false)}>Cancel</Button>
								<Button variant="default" class="bg-green-400" on:click={createProject}
									>Deploy</Button
								>
							</Card.Footer>
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
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
		{#each userProjects as project (project.id)}
			<a
				href="#"
				class="block max-w-sm p-6 h-40 bg-white border border-green-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
			>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{project.title}
				</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
			</a>
		{/each}
	</div>
</main>
