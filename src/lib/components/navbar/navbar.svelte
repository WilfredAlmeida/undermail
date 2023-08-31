<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
		<a href="/" class="flex items-center">
			<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>NftChimp</span
			>
		</a>

		<Popover.Root>
			<Popover.Trigger>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="user" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</Popover.Trigger>
			<Popover.Content>
				<div>
					<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
						<div>Bonnie Green</div>
						<div class="font-medium truncate">name@flowbite.com</div>
					</div>
					<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
						<li>
							<a
								href="#"
								class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Profile</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>Settings</a
							>
						</li>
					</ul>
					<div class="py-1">
						<a
							href="#"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
							>Logout</a
						>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	</div>
</nav>
