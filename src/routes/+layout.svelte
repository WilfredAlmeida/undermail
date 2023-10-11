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

<svelte:head>

<meta name="description" content="MailChimp of Solana | Bulk Mint and get Analytics for NFTs | UnderDog Protocol | Solana cNFT | NFT" />
<meta name="image" content="https://www.undermail.live/og.jpg" />

<meta property="og:title" content="UnderMail" />
<meta property="og:description" content="MailChimp of Solana | Bulk Mint and get Analytics for NFTs | UnderDog Protocol | Solana cNFT | NFT" />
<meta property="og:image" content="https://www.undermail.live/og.jpg" />
<meta property="og:url" content="https://undermail.live" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="undermail_" />
<meta name="twitter:title" content="UnderMail" />
<meta name="twitter:description" content="MailChimp of Solana | Bulk Mint and get Analytics for NFTs | UnderDog Protocol | Solana cNFT | NFT" />
<meta name="twitter:image" content="https://www.undermail.live/og.jpg" />

<meta name="keywords" content="UnderMail, Solana, Mint NFTs, cNFT, Compressed NFT, Solana Compressed NFT, Mint NFT, Mint cNFT, Mint Compresses NFT Solana, bulk, bulk mint nft, bulk mint cft, bulk mint compressed nft, nft analytics, solana analytics, cnft analytics, solana cnft analytics"/>

<meta name="format-detection" content="telephone=no"/>
<meta name="author" content="UnderMail"/>
<meta name="description" property="og:description" content="MailChimp of Solana | Bulk Mint and get Analytics for NFTs | UnderDog Protocol | Solana cNFT | NFT"/>
<meta property="og:title" content="UnderMail" />
<meta property="og:url" content="https://www.undermail.live" />
<meta property="og:type" content="website" />

</svelte:head>

<slot />
