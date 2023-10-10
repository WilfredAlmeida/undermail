import { UNDERDOG_KEY } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import { NETWORK_URL } from '$lib/utils';

export const actions = {
	createMint: async ({ request, fetch, url, locals }) => {
console.log("IN SERVER");

		const { supabase } = locals;

		const {
			user: { email }
		} = await locals.getSession();

		const projectId = url.pathname.split('/')[2];
		
		const formData = await request.formData();

		const nftName = formData.get('nameInput')?.toString();
		const imgFile = formData.get('imgInput') as File;
		let nftDescription: String | undefined | null = formData.get('descriptionInput')?.toString();

		const csvFile = formData.get('csvFile') as File;
		let publicKeys: String | undefined | null = formData.get('publicKeys')?.toString();

		let isGif = false;

		nftDescription = nftDescription?.trim() === '' ? null : nftDescription;
		publicKeys = publicKeys?.trim() === '' ? null : publicKeys;

		if (!nftName || nftName.trim().length === 0) {
			return fail(400, { message: 'Invalid name value' });
		}

		if (!imgFile || !/(\jpg|\jpeg|\gif|\mp4)$/i.exec(imgFile.type)) {
			return fail(400, { message: 'Image is required & only JPG/JPEG/GIF allowed' });
		}

		const mintAddresses: String[] = [];

		if (csvFile && /(csv)$/i.exec(csvFile.type)) {
			const csvData = await csvFile.text();
			mintAddresses.push(...csvData.split(',').map((e) => e.replaceAll('\n', '').trim()));
		}

		if (publicKeys) {
			mintAddresses.push(...publicKeys.split(',').map((e) => e.replaceAll('\n', '').trim()));
		}

		console.log(mintAddresses);
console.log("PRINTED ADDRESSES");

		if (mintAddresses.length === 0) {
			return fail(400, { message: 'No mint address provided!' });
		}

		// Checking if credits balance exists
		const {data } = await supabase.from("users").select("credits").eq("email", email)
		const credits = data![0].credits;

		if(credits < (mintAddresses.length*100)){
			return fail(400, { message: 'Insufficient credits!' });
		}

		const dbRes = await supabase
			.from('projects')
			.select('underdogId:underdog_id')
			.eq('id', projectId);
		if (dbRes!.data!.length === 0) {
			return fail(404, { message: 'Project not found' });
		}
		console.log("DID IF");
		const underdogProjectId = dbRes!.data![0].underdogId;
		console.log(underdogProjectId);

		
		isGif = /gif|mp4/.test(imgFile.type);
		let fileExtension = "jpg";

		switch (imgFile.type) {
			case "image/jpeg":
			case "image/jpg":
				fileExtension = "jpg";
				break;
			case "image/gif":
				fileExtension = "gif";
				break;
			case "video/mp4":
				fileExtension = "mp4";
				break;
			default:
				fileExtension = "jpg";
				break;
		}

		// isGif = imgFile.type === 'image/gif';
		const fileName = `${(Math.random() + 1).toString(36).substring(6)}.${fileExtension}`;


		let { data: uploadData, error } = await supabase.storage
			.from('nft-images')
			.upload(fileName, imgFile);

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
		if (dbRes2!.data!.length > 0) {
			mintId = dbRes2!.data![0].id;
		}
		console.log('MINT ID');
		console.log(mintId);

		for (let i = 0; i < mintAddresses.length; i++) {
			console.log('LOOP INIT');


			const reqBody = JSON.stringify({
				name: nftName,
				description: nftDescription === null ? '' : nftDescription,
				image: imgUrl,
				animationUrl: isGif ? imgUrl : "",
				receiverAddress: mintAddresses[i],
				externalUrl: `${url.origin}/project/${projectId}/view/${mintId}?pk=${mintAddresses[i]}`,
				attributes: 
					{
						view: `${url.origin}/project/${projectId}/view/${mintId}?pk=${mintAddresses[i]}`
					}
				
			});

			console.log(reqBody);

			fetch(`${NETWORK_URL}/v2/projects/${underdogProjectId}/nfts`, {
				method: 'POST',
				body: reqBody,
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					authorization: `Bearer ${UNDERDOG_KEY}`
				}
			}).then(async (r) => {
				await supabase.rpc("decrement_credits", {useremail: email, tosubtract: 3})
				console.log(await r.json());
			});

			console.log('LOOP DONE');
		}

		console.log('RESPONSE RETURNED');

		return { success: true, successMessage: 'Mint Initiated' };
	}
};
