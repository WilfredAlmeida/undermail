<script lang="ts">
	import '../app.css';
	import Navbar from "$components/navbar/navbar.svelte";
	import { page } from '$app/stores'
	// export let navbar

	// Supabase Config
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	const notAllowedPaths = ["/", "/login"]

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
	
</script>

{#if session && !notAllowedPaths.includes($page.url.pathname)}
<Navbar avatarUrl={session?.user.user_metadata.avatar_url}/>
{/if}
<slot />
