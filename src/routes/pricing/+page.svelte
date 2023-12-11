<script>
	import { goto } from '$app/navigation';


import { Button } from '$lib/components/ui/button';

	let plans = [
		{
			id: 1,
			title: 'Pay for what you use',
			subTexts: [
				'Load your wallet with $5 min.',
				'$0.03 per NFT (3 cents)',
				'$2.5 per NFT Project (NFT Collection)',
				'Analytics Dashboard',
				'Free Customer Support'
			],
			price: 5
		}
	];
</script>

<div class="flex items-center justify-center">
	<section class="py-16">
		<div class="container mx-auto">
			<div class="flex justify-center">
				<div class="grid items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
					{#each plans as plan (plan.id)}
						<div
							class="border-green-400 border  p-16 rounded-lg shadow-lg bg-opacity-20 backdrop-blur-lg bg-green-400"
						>
							<h2 class="text-6xl font-semibold text-white">{plan.title}</h2>
							<ul class="text-lg font-semibold text-green-400 pt-8 space-y-5 list-disc">
                                {#each plan.subTexts as subtext }
                                    
								<li class="border-b border-gray-400 pb-4">{subtext}</li>
                                {/each}
							</ul>
                            <div class="flex items-center justify-center mt-8">
                                <Button variant="default" class="text-white text-2xl w-64 h-16 bg-green-400 hover:bg-fuchsia-400" on:click={()=>{
                                    goto("/account/billing")
                                }}>${plan.price}</Button>
                              </div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>
