<script>
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	export let data;

	let count = 5;

	function increment() {
		count += 5;
	}

	function decrement() {
		if (count > 5) {
			count -= 1;
		}
	}
</script>

<div class="flex items-center justify-center">
	<section class="py-16">
		<div class="container mx-auto">
			<div class="flex justify-center">
				<div class="grid items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
					<div
						class="border-green-400 border p-16 rounded-lg shadow-lg bg-opacity-20 backdrop-blur-lg bg-green-400"
					>
						<h2 class="text-6xl font-semibold text-white">Your Credits</h2>
						<h3 class="text-white text-center pt-4">Available Credits</h3>

						<p class="text-green-400 text-4xl text-center pt-4">${data.credits}</p>

						<div class="flex items-center justify-center mt-8">
							<Sheet.Root>
								<Sheet.Trigger>
									<Button
										variant="default"
										class="text-white text-2xl w-64 h-16 bg-green-400 hover:bg-fuchsia-400"
										>Add Credits</Button
									>
								</Sheet.Trigger>
								<Sheet.Content class="bg-black backdrop-blur-md">
									<Sheet.Header>
										<Sheet.Title class="text-3xl text-white">Add More Credits</Sheet.Title>
										<Sheet.Description>
											<p class="text-lg">Credits are non-refundable with a $5 minimum purchase</p>

											<div class="pt-8">
												<div class="flex items-center justify-center space-x-4">
													<!-- Decrement Button -->
													<button
														class="text-green-400 text-3xl font-bold w-12 h-12"
														on:click={decrement}>-</button
													>

													<!-- Counter Display -->
													<span class="text-3xl font-semibold text-white">{count}</span>

													<!-- Increment Button -->
													<button
														class="text-green-400 text-3xl font-bold w-12 h-12"
														on:click={increment}>+</button
													>
												</div>
											</div>

											<p class="text-center">~{Math.floor(count / 0.03)} NFTs</p>

											<div class="flex justify-center items-center pt-10">
												<Button
													variant="default"
													class="text-white text-2xl w-64 h-16 bg-green-400 hover:bg-fuchsia-400"
													>Proceed to Pay</Button
												>
											</div>
										</Sheet.Description>
									</Sheet.Header>
								</Sheet.Content>
							</Sheet.Root>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
