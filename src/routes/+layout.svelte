<script lang="ts">
	import '../app.css';
	import Navbar from "$components/navbar/navbar.svelte";
	// export let navbar

	// Supabase Config
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

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
	console.log(session);
	
</script>

<Navbar avatarUrl={session?.user.user_metadata.avatar_url}/>

<slot />
