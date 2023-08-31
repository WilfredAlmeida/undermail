<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import {
		LogOut,
		Settings,
		User,
	} from 'lucide-svelte';
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
		<a href="/" class="flex items-center">
			<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
				>NftChimp</span
			>
		</a>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="user" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<User class="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Settings class="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<LogOut class="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>
