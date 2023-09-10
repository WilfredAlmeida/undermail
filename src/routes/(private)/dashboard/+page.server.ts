import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;
	
	const {user: { email }} = await locals.getSession();

	const { data: userData } = await supabase.from('users').select('id').eq('email', email);

	if (userData.length === 0) {
		return error(404, 'User not found');
	}
	const userIdInDb = userData[0].id;

	const { data: projectData } = await supabase
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
		.eq('user_id', userIdInDb);

	if (projectData.length === 0) {
		return { projects: [] };
	}

	// console.log(projectData);

	return { projects: projectData.reverse() };
};

export const actions = {
	createProject: async ({ request, locals, fetch }) => {
		// const {supabase} = locals;
		console.log('IN ACTION');

		const allowedExtensions = /(\jpg|\jpeg)$/i;

		const formData = await request.formData();

		const name = formData.get('projectName')?.toString();
		const description = formData.get('projectDescription')?.toString();
		const imageFile = formData.get('projectImage') as Blob;

		if (!name || name.length === 0 || !imageFile || !allowedExtensions.exec(imageFile.type)) {
			return fail(400, { message: 'Name, Image are required' });
		}

		const fd = new FormData();
		fd.append('image', imageFile);
		fd.append('name', name);
		/* @ts-ignore */
		fd.append('description', description?.trim().length === 0 ? null : description?.trim());

		const res = await fetch('/api/project', {
			method: 'POST',
			body: fd
		});

		console.log('RESPONSE');

		console.log(await res.json());
	}
};
