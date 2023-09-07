import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({locals})=>{
    /* @ts-ignore */
    const {data} = await locals.supabase.auth.getSession();
    // console.log("SESSION");
    // console.log(data);
    
    if(!data.session){
        throw redirect(303, "/login")
    }
    
}

export const actions = {
    createProject: async({request, locals, fetch})=>{
        // const {supabase} = locals;
        console.log("IN ACTION");
        
        const allowedExtensions =
        /(\jpg|\jpeg|\png|\gif)$/i;

        const formData = await request.formData();

        const name = formData.get('projectName')?.toString()
        const imageFile = formData.get('projectImage') as Blob

        if(!name || name.length===0 || !imageFile || !allowedExtensions.exec(imageFile.type)){
            return fail(400, {message: "Name, Image are required"})
        }
console.log("SENDING REQUEST");
const fd = new FormData()
fd.append('image', imageFile)
fd.append('name', name)
        const res = await fetch("/api/project",{
            method: 'POST',
            body: fd,
            // headers: {'Content-type': 'multipart/form-data'}
        })

        console.log("RESPONSE");
        
        console.log(await res.json());
        

    }
}

const generateAlphanumericString = (length: number): string => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
  
    return result;
  }