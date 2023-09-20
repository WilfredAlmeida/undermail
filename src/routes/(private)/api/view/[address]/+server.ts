export const GET = async ({ locals, params }) => {
	const { supabase } = locals;
	console.log('IN SERVER');
	console.log(params);

	const { address = null } = params;

	if (address === null) {
		return new Response(
			JSON.stringify({
				status: 'INVALID_ADDRESS',
				data: null,
				error: null
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	// const res = await supabase.from("mints").select("*").filter('mint_addresses','contains',address);
	const res = await supabase.from('mints').select('*').contains('mint_addresses', [address]);

	if (res.error || res.data.length === 0) {
		console.log(res.error);

		return new Response(
			JSON.stringify({
				status: 'ADDRESS_NOT_FOUND',
				data: null,
				error: null
			}),
			{
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	return new Response(
		JSON.stringify({
			status: 'RECEIVER_FOUND',
			data: res.data,
			error: null
		}),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	);
};

export const PATCH = async ({ request, locals }) => {
	const { ip, headers } = request;

	const { supabase } = locals;
	const body = await request.json();
	const { mintId = null, pk = null } = body;

	if (!mintId || !pk) {
		return new Response(
			JSON.stringify({
				message: 'mintId & Mint Address are required'
			}),
			{ status: 400 }
		);
	}

	const dbRes = await supabase
		.from('mints')
		.select('name, viewedBy: viewed_by')
		.eq('id', mintId)
		.contains('mint_addresses', [pk]);

	if (dbRes.error || dbRes.data.length === 0) {
		console.log(JSON.stringify(dbRes));

		return new Response(
			JSON.stringify({
				found: false,
				message: 'Oops, Mint not found'
			}),
			{ status: 404 }
		);
	}

	let viewedByOld = dbRes.data[0].viewedBy;
	if (viewedByOld && viewedByOld.length > 0 && !viewedByOld.includes(pk)) {
		viewedByOld.push(pk);
	} else if (viewedByOld === null) {
		viewedByOld = [pk];
	}
	console.log(viewedByOld);

	const dbRes2 = await supabase
		.from('mints')
		.update({
			viewed_by: viewedByOld
		})
		.eq('id', mintId);

	const dbRes3 = await supabase.from('headers').insert({
		headers: JSON.stringify(headers),
		mint_id: mintId
	});

	/* @ts-ignore */
	// if (dbRes2.error || dbRes2.data.length === 0) {
	//     console.log(JSON.stringify(dbRes));
	// }

	return new Response(JSON.stringify({ updated: true, message: 'Updated' }), { status: 200 });
};
