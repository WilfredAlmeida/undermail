import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({locals})=>{
    /* @ts-ignore */
    const {data} = await locals.supabase.auth.getSession();
    console.log("SESSION");
    console.log(data);
    
    if(!data.session){
        throw redirect(303, "/login")
    }
    
}