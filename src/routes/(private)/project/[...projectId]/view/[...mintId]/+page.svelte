<script>
    export let data


</script>

<svelte:head>
	<script defer data-domain="{data.projectId}" src="https://plausible.io/js/script.js"/>
</svelte:head>

{#if data.found===true}
<div class="flex items-center justify-center h-screen">
<h1 class="text-green-400 text-center text-3xl">{data.message}</h1>
</div>
{:else}
<div class="flex items-center justify-center h-screen">
    <h1 class="text-3xl text-center text-red-400">{data.message}</h1>
</div>
{/if}