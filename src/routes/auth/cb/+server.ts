import { redirect, type RequestHandler } from '@sveltejs/kit';
import { ulid } from 'ulid';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	} else {
		console.warn('no code in redirect');
	}

	const {
		data: {
			/* @ts-ignore */
			session: { user }
		}
	} = await supabase.auth.getSession();

	try {
		const user_id = ulid();

		const { name, email, avatar_url } = user.user_metadata;

		const res = await supabase.from('users').insert({
			id: user_id,
			name,
			email,
			image_url: avatar_url
		});

		console.log(res);
	} catch (e) {
		console.log(e);
	}

	throw redirect(307, '/dashboard');
};
