import { walletStore, walletStore as walletStore$ } from '@svelte-on-solana/wallet-adapter-core';

export const load = async ({ url, locals }) => {
	const { supabase } = locals;

	const projectId = url.pathname.split('/')[2];

	const dbRes = await supabase.from('mints').select('*').eq('project_id', projectId);

	if (dbRes!.data!.length === 0) {
		return {
			error: "No mints found or project doesn't exist"
		};
	}

	// console.log('$walletStore$: ', walletStore$);
	// console.log('IN LOAD');
	

	return {
		mints: []
	};
	// return {
	// 	mints: dbRes!.data!.reverse()
	// };
};