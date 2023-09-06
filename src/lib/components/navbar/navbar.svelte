<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOut, Settings, User } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	

	const logOut = async()=>{
		// const {error} = await $page.data.supabase.auth.signOut();
		// console.log("LOGOUT ERROR");
		// console.log(error);
		
		goto("/auth/logout")
	
	}

</script>

<nav class="bg-gray-900 shadow-lg border-animation">
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
			<DropdownMenu.Content class="bg-opacity-20 backdrop-blur-lg bg-green-400 text-white">
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
					<DropdownMenu.Item on:click={logOut}>
						<LogOut class="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>
<!-- 
<style>
	@keyframes gradientAnimation {
		0% {
			border-image-source: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
		}
		25% {
			border-image-source: linear-gradient(45deg, #00ff00, #0000ff, #ff0000);
		}
		50% {
			border-image-source: linear-gradient(45deg, #0000ff, #ff0000, #00ff00);
		}
		75% {
			border-image-source: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
		}
		100% {
			border-image-source: linear-gradient(45deg, #00ff00, #0000ff, #ff0000);
		}
	}

	nav {
		background-color: #000;
		animation: gradientAnimation 5s linear infinite;
		border-bottom: 1px solid;
		border-image-slice: 1;
		border-image-source: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
	}
</style> -->
