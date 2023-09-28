<script>
	import { Button } from '$lib/components/ui/button';
    export let data;

</script>

<div class="flex items-center justify-center">
	<section class="py-16">
		<div class="container mx-auto">
			<div class="flex justify-center">
				<div class="grid items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
					
						<div
							class="border-green-400 border  p-16 rounded-lg shadow-lg bg-opacity-20 backdrop-blur-lg bg-green-400"
						>
							<h2 class="text-6xl font-semibold text-white">Your Credits</h2>
							<h3 class="text-white text-center pt-4">Available Credits</h3>

                            <p class="text-green-400 text-4xl text-center pt-4">${data.credits}</p>

                            <div class="flex items-center justify-center mt-8">
                                <Button variant="default" class="text-white text-2xl w-64 h-16 bg-green-400 hover:bg-fuchsia-400">Add More</Button>
                              </div>
						</div>
					
				</div>
			</div>
		</div>
	</section>
</div>
