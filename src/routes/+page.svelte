<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	const featureCards = [
		{
			id: 0,
			title: 'All you need is Images',
			subitile:
				'Just upload your images and enter your addresses and the NFTs are delivered in real-time'
		},
		{
			id: 1,
			title: "It's Cheap",
			subitile: "It's so cheap to mint 1000 cNFTs that your gas elsewhere will seem expensive"
		},
		{
			id: 2,
			title: 'Anayltics',
			subitile: 'UnderMail offers powerful analytics to analyze your mints and their usage, access'
		},
		{
			id: 3,
			title: 'Powered by Underdog',
			subitile: "UnderMail is powered by Underdog's state of the art cNFT services"
		}
	];
</script>

<div class=" text-white py-10">
	<div class="container mx-auto text-center items-center justify-center flex flex-col">
		<div class="w-40 h-40 text-center items-center justify-center flex">
			<img src="/um.png" />
		</div>
		<h1 class="text-4xl font-bold">Welcome to UnderMail</h1>
		<p class="mt-4 text-lg text-green-400">The MailChimp of Solana with cNFTs</p>
	</div>
</div>

<section class="py-16">
	<div class="container mx-auto">
		<div class="flex justify-center">
			<div class="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each featureCards as feature (feature.id)}
					<div
						class="border-green-400 border hover:opacity-80 hover:shadow-lg p-6 rounded-lg shadow-lg bg-opacity-20 backdrop-blur-lg bg-green-400"
					>
						<h2 class="text-xl font-semibold text-white">{feature.title}</h2>
						<p class="mt-4 text-green-400">{feature.subitile}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="py-16 text-white">
	<div class="container mx-auto text-center">
		<h2 class="text-2xl font-semibold">Ready to get started with UnderMail?</h2>
		<p class="mt-4 text-lg text-green-400">Join us today and powerup using cNFTs!</p>
		<Button
			variant="ghost"
			class="rounded-full font-semibold border border-green-400 hover:bg-green-400 text-green-400 hover:text-black py-2 px-6 mt-8"
			on:click={() => goto('/dashboard')}>Get Started</Button
		>
	</div>
</section>

<footer class=" py-6">
	<div class="container mx-auto text-center text-green-400">
		<p>&copy; 2023 UnderMail. All rights reserved.</p>
	</div>
</footer>
