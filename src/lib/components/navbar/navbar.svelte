<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOut, Settings, User, DollarSign } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	

	const logOut = async()=>{
		// const {error} = await $page.data.supabase.auth.signOut();
		// console.log("LOGOUT ERROR");
		// console.log(error);
		
		goto("/auth/logout")
	
	}

	export let avatarUrl = "https://github.com/shadcn.png"

</script>

<nav class="bg-gray-900 shadow-lg border-animation">
	<div class="flex flex-wrap justify-between mx-auto p-4">
		<a href="/" class="flex items-center">
			<img src="/um.png" class="h-12 mr-3" alt="UnderMail Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap text-green-400 dark:text-green-400"
				>UnderMail</span
			>
		</a>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root>
					<Avatar.Image src={avatarUrl} alt="user" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="bg-opacity-20 backdrop-blur-lg bg-green-400 text-white">
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item on:click={()=>{goto(`/account/billing`)}}>
						<DollarSign class="mr-2 h-4 w-4" />
						<span>Billing</span>
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

