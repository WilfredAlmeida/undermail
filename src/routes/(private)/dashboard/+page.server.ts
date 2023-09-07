import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({locals})=>{

    const {supabase} = locals

    const {data} = await supabase.from("projects").select("*").eq("email","")
    
}

export const actions = {
    createProject: async({request, locals, fetch})=>{
        // const {supabase} = locals;
        console.log("IN ACTION");
        
        const allowedExtensions =
        /(\jpg|\jpeg)$/i;

        const formData = await request.formData();

        const name = formData.get('projectName')?.toString()
        const description = formData.get('projectDescription')?.toString()
        const imageFile = formData.get('projectImage') as Blob
        
        if(!name || name.length===0 || !imageFile || !allowedExtensions.exec(imageFile.type)){
            return fail(400, {message: "Name, Image are required"})
        }

        const fd = new FormData()
        fd.append('image', imageFile)
        fd.append('name', name)
        /* @ts-ignore */
        fd.append('description', description?.trim().length===0?null:description?.trim())

        const res = await fetch("/api/project",{
            method: 'POST',
            body: fd,
        })

        console.log("RESPONSE");
        
        console.log(await res.json());
        

    }
}