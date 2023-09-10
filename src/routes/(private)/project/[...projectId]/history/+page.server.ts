export const load = async ({ url, locals }) => {
	const { supabase } = locals;

	const projectId = url.pathname.split('/')[2];

	const dbRes = await supabase.from('mints').select('*').eq('project_id', projectId);

	if (dbRes.data.length === 0) {
		return {
			error: "No mints found or project doesn't exist"
		};
	}

	return {
		mints: dbRes.data.reverse()
	};
};
