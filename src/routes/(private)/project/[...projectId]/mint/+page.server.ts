import { UNDERDOG_KEY } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';

export const actions = {
	createMint: async ({ request, fetch, url, locals }) => {
		const { supabase } = locals;
		console.log(url);
		const projectId = url.pathname.split('/')[2];

		const formData = await request.formData();

		const nftName = formData.get('nameInput')?.toString();
		const imgFile = formData.get('imgInput') as File;
		let nftDescription = formData.get('descriptionInput')?.toString();

		const csvFile = formData.get('csvFile') as File;
		let publicKeys = formData.get('publicKeys')?.toString();

		nftDescription = nftDescription?.trim() === '' ? null : nftDescription;
		publicKeys = publicKeys?.trim() === '' ? null : publicKeys;

		if (!nftName || nftName.trim().length === 0) {
			return fail(400, { message: 'Invalid name value' });
		}

		if (!imgFile || !/(\jpg|\jpeg)$/i.exec(imgFile.type)) {
			return fail(400, { message: 'Image is required & only JPG/JPEG allowed' });
		}

		const mintAddresses = [];

		if (csvFile && /(csv)$/i.exec(csvFile.type)) {
			const csvData = await csvFile.text();
			mintAddresses.push(...csvData.split(',').map((e) => e.replaceAll('\n', '')));
		}

		if (publicKeys) {
			mintAddresses.push(...publicKeys.split(',').map((e) => e.replaceAll('\n', '')));
		}

		console.log(mintAddresses);

		if (mintAddresses.length === 0) {
			return fail(400, { message: 'No mint address provided!' });
		}

		const dbRes = await supabase
			.from('projects')
			.select('underdogId:underdog_id')
			.eq('id', projectId);
		if (dbRes.data.length === 0) {
			return fail(404, { message: 'Project not found' });
		}

		const underdogProjectId = dbRes.data[0].underdogId;
		console.log(underdogProjectId);

		const { data: uploadData, error } = await supabase.storage
			.from('nft-images')
			.upload(`${(Math.random() + 1).toString(36).substring(6)}.jpeg`, imgFile);

		if (error) {
			console.log(error);
			return fail(500, { message: 'Something went wrong' });
		}

		const imgData = supabase.storage.from('nft-images').getPublicUrl(uploadData?.path!);

		const imgUrl = imgData.data.publicUrl;

		console.log(imgUrl);

		const dbRes2 = await supabase
			.from('mints')
			.insert({
				project_id: projectId,
				image_url: imgUrl,
				name: nftName,
				description: nftDescription,
				mint_addresses: mintAddresses
			})
			.select('id');

		let mintId;
		if (dbRes2.data.length > 0) {
			mintId = dbRes2.data[0].id
		}
		console.log("MINT ID");
		console.log(mintId);

		// const fetchPromises = mintAddresses.map(async (mintAddress) => {
		// 	console.log('LOOP INIT');

		// 	const reqBody = JSON.stringify({
		// 		name: nftName,
		// 		description: nftDescription === null ? '' : nftDescription,
		// 		image: imgUrl,
		// 		receiverAddress: mintAddress,
		// 		attributes: {

		// 		}
		// 	});

		// try {
		// 	const response = await fetch(
		// 		`https://dev.underdogprotocol.com/v2/projects/${underdogProjectId}/nfts`,
		// 		{
		// 			method: 'POST',
		// 			body: reqBody,
		// 			headers: {
		// 				accept: 'application/json',
		// 				'content-type': 'application/json',
		// 				authorization: `Bearer ${UNDERDOG_KEY}`
		// 			}
		// 		}
		// 	);

		// 	const data = await response.json();
		// 	console.log(data);

		// 	console.log('LOOP DONE');
		// 	return data;
		// } catch (error) {
		// 	console.error(error);
		// 	return null;
		// }
		// });

		// Promise.all(fetchPromises)
		// 	.then((results) => {
		// 		// Handle the results here if needed
		// 		console.log('All fetch calls completed:', results);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error in Promise.all:', error);
		// 	});

		// http://localhost:5173/project/nkIEZE/view/31?pk=HiCxdbmyx73QisDrPRBSTNmq6f6wn5Rib356aCQiipt6
		for (let i = 0; i < mintAddresses.length; i++) {
			console.log("LOOP INIT");

			const reqBody = JSON.stringify({
				name: nftName,
				description: nftDescription === null ? "" : nftDescription,
				image: imgUrl,
				receiverAddress: mintAddresses[i],
				attributes: {
					view: `${url.origin}/project/${projectId}/view/${mintId}?pk=${mintAddresses[i]}`
				}
			})

			console.log(reqBody);

			fetch(`https://dev.underdogprotocol.com/v2/projects/${underdogProjectId}/nfts`, {
			    method: "POST",
			    body: reqBody,
			    headers: {
			        accept: 'application/json',
			        'content-type': 'application/json',
			        authorization: `Bearer ${UNDERDOG_KEY}`
			      }
			}).then(async (r)=>{
			    console.log(await r.json());
			})

			console.log("LOOP DONE");

		}

		console.log('RESPONSE RETURNED');

		return { success: true, successMessage: 'Mint Initiated' };
	}
};
