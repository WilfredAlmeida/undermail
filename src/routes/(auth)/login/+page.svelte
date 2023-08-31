<script lang="ts">
	import { goto } from '$app/navigation';
	import { fail, redirect } from '@sveltejs/kit';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	// Function to handle Google login
	const handleGoogleLogin = async () => {
		const { data: mdata, error: err } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		if (err) {
			console.log(err);
			return fail(400, {
				message: 'Something went wrong'
			});
		}

	};
</script>

<main
	class="flex items-center justify-center h-screen bg-gradient-to-b from-pink-400 to-purple-900"
>
	<div
		class="grid grid-cols-2 gap-6 bg-white bg-opacity-20 rounded-lg p-8 backdrop-blur-lg shadow-lg"
	>
		<!-- Left Side -->
		<div class="flex flex-col justify-center">
			<h1 class="text-3xl font-semibold text-white mb-4">NftChimp</h1>
			<ul class="text-white space-y-2">
				<li>
					<span class="text-green-400 mr-2">&#9679;</span>
					MailChimp with cNFTs
				</li>
				<li>
					<span class="text-green-400 mr-2">&#9679;</span>
					Bulk Mint and Track your cNFTs
				</li>
				<li>
					<span class="text-green-400 mr-2">&#9679;</span>
					Powered by Underdog
				</li>
			</ul>
		</div>

		<!-- Right Side -->
		<div class="flex items-center justify-center">
			<!-- Google Login Button -->
			<button
				class="flex items-center justify-center bg-green-600 text-white rounded-lg p-3 w-full"
				on:click={handleGoogleLogin}
			>
				<div class="pr-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="25"
						height="25"
						viewBox="0 0 48 48"
					>
						<path
							fill="#FFC107"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						/><path
							fill="#FF3D00"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						/><path
							fill="#4CAF50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						/><path
							fill="#1976D2"
							d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						/>
					</svg>
				</div>
				Login with Google
			</button>
		</div>
	</div>
</main>

<style>
	ul {
		list-style-type: none;
		padding-left: 0;
	}

	ul li::before {
		color: rgba(72, 160, 255, 1);
		font-size: 1.5rem;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
</style>
