import { error } from '@sveltejs/kit';
import { UNDERDOG_KEY } from '$env/static/private';

const allowedExtensions = /(\jpg|\jpeg)$/i;

export const POST = async ({ request, locals }) => {
	console.log('IN API');
	const { supabase } = locals;

	const values = await request.formData();

	const name = values.get('name') as string;
	const description = values.get('description') as string;
	const imageFile = values.get('image') as File;

	console.log(name);
	console.log(description);
	console.log(imageFile);

	if (!name || name.length === 0 || !imageFile || !allowedExtensions.exec(imageFile.type)) {
		return new Response(
			JSON.stringify({
				status: 'INVALID_INPUT',
				data: null,
				error: [
					{
						message: 'Invalid name or image'
					}
				]
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	const { data: uploadData, error } = await supabase.storage
		.from('project-images')
		.upload(`${(Math.random() + 1).toString(36).substring(6)}.jpeg`, imageFile);

	if (error) {
		console.log(error);
		return new Response(
			JSON.stringify({
				status: 'UPLOAD_FAILED',
				data: null,
				error: [{ message: error }]
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	const imgData = supabase.storage.from('project-images').getPublicUrl(uploadData?.path!);

	const imgUrl = imgData.data.publicUrl;

	console.log('IMGURL');
	console.log(imgUrl);

	const res = await fetch('https://dev.underdogprotocol.com/v2/projects', {
	    method: 'POST',
	    body: JSON.stringify({
	        name: name,
	        description: description===null?'':description,
	        image: imgUrl
	    }),
	    headers: {
	        accept: 'application/json',
	        'content-type': 'application/json',
	        authorization: `Bearer ${UNDERDOG_KEY}`
	    }
	})

	const resJson = await res.json()

	if(res.status!==202){
	    return new Response(JSON.stringify({
	        status: "UNDERDOG_PROJECT_CREATION_FAILED",
	        data: null,
	        error: [JSON.stringify(resJson)]
	    }), {
	        status: res.status,
	        headers: { 'Content-Type': 'application/json' }
	    })
	}

	const underdogProjectId = resJson.projectId;

	const projectId = generateAlphanumericString(6);
	const {
		data: {
			user: { email }
		}
	} = await supabase.auth.getUser();

	const { data } = await supabase.from('users').select('id').eq('email', email);

	if (data.length === 0) {
		return new Response(
			JSON.stringify({
				status: 'USER_NOT_FOUND',
				data: null,
				error: [
					{
						message: 'User not found'
					}
				]
			}),
			{
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
	const userIdInDb = data[0].id;

	console.log(userIdInDb);

	const res2 = await supabase.from('projects').insert({
		id: projectId,
		user_id: userIdInDb,
		name: name.trim(),
		description: description,
		underdog_id: underdogProjectId,
		image_url: imgUrl
	});

	console.log(res2);

	return new Response(
		JSON.stringify({
			status: 'PROJECT_CREATED',
			data: [{ projectId: projectId }],
			error: null
		}),
		{
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		}
	);
};

const generateAlphanumericString = (length: number): string => {
	const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		result += charset.charAt(randomIndex);
	}

	return result;
};
