import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { bypassAuthRoutes } from '$lib/utils';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if(bypassAuthRoutes.includes(url.pathname.split("/")[3])){
		console.log("BYPASS AUTH ROUTE");
		return {};
	}
	console.log("GONNA RUN");
	/* @ts-ignore */
	const session = await locals.getSession();
	if (!session) throw redirect(303, '/login');
	return {};
};
