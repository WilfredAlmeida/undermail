<script async src="https://plausible.io/js/embed.host.js">
// @ts-nocheck
export let data;
</script>

{#if data.plausibleUrl}
<iframe
	title="Analytics"
	plausible-embed
	src={data.plausibleUrl}
	scrolling="no"
	frameborder="0"
	loading="lazy"
	style="width: 1px; min-width: 100%; height: 1600px;"
/>

{:else}
<h2 class="text-white">Analytics Not Found</h2>

{/if}