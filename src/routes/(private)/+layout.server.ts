import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	/* @ts-ignore */
	const session = await locals.getSession();
	if (!session) throw redirect(303, '/login');
	return {};
};
