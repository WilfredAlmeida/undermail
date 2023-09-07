import { error } from '@sveltejs/kit';

const allowedExtensions =
    /(\jpg|\jpeg|\png|\gif)$/i;

export const POST = async ({ request }) => {
    console.log("IN API");
    
    const values = await request.formData();

    
    const name = values.get("name") as string;
    const imageFile = values.get("image") as File;

    console.log(name);
    console.log(imageFile);
    

    if (!name || name.length === 0 || !imageFile || !allowedExtensions.exec(imageFile.type)) {
        return new Response(JSON.stringify({
            status: "INVALID_INPUT",
            data: null,
            error: [{
                message: "Invalid name or image"
            }]
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return new Response(JSON.stringify({
        status: "PROJECT_CREATED",
        data: [{projectId: 1}],
        error: null
    }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })

}