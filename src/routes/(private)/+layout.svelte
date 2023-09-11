<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';

	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { bypassAuthRoutes } from '$lib/utils';

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let loading = true;
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (!_session && !bypassAuthRoutes.includes($page.url.pathname.split("/")[3]) ) goto('/login');
			else if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			} else loading = false;
		});

		return () => subscription.unsubscribe();
	});
</script>

<slot/>