import { error, fail } from '@sveltejs/kit'

export const actions = {
    createMint: async ({ request, fetch, url, locals }) => {

        const { supabase } = locals

        const projectId = url.pathname.split("/")[2]

        const formData = await request.formData()

        const nftName = formData.get("nameInput")?.toString()
        const imgFile = formData.get("imgInput") as File
        let nftDescription = formData.get("descriptionInput")?.toString()

        const csvFile = formData.get("csvFile") as File
        let publicKeys = formData.get("publicKeys")?.toString()

        nftDescription = nftDescription?.trim() === "" ? null : nftDescription
        publicKeys = publicKeys?.trim() === "" ? null : publicKeys

        if (!nftName || nftName.trim().length === 0) {
            return fail(400, { message: "Invalid name value" })
        }

        if(!imgFile || !(/(\jpg|\jpeg)$/i).exec(imgFile.type) ){
            return fail(400, { message: "Image is required & only JPG/JPEG allowed" })
        }

        if(!imgFile || !(/(\csv)$/i).exec(csvFile.type) ){
            return fail(400, { message: "Only CSV allowed" })
        }

        const dbRes = await supabase.from("projects").select("underdogId:underdog_id").eq("id", projectId)
        if (dbRes.data.length === 0) {
            return fail(404, { message: "Project not found" })
        }


        const underProjectId = dbRes.data[0].underdogId
        console.log(underProjectId);


    }
}

