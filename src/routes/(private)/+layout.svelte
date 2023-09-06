<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, invalidate } from '$app/navigation';

	import type { LayoutData } from './$types';
	

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let loading = true;
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (!_session) goto('/login');
			else if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			} else loading = false;
		});

		return () => subscription.unsubscribe();
	});
</script>

<slot/>