import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	const { supabase } = locals;
	const projectId = url.pathname.split('/')[2];

	const res = await supabase
		.from('projects')
		.select(
			`
    projectId:id,
    projectName:name,
    imageUrl:image_url,
    projectDescription:description,
    mintCount:mint_count,
    createdAt:created_at
    `
		)
		.eq('id', projectId);

	if (res.data.length === 0) {
		throw redirect(307, `${url.origin}/404`);
		return error(404, { message: 'Project not found' });
	}

	return {
		project: res.data[0]
	};
};
