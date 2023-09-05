import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({locals})=>{
    /* @ts-ignore */
    const {data: sessionData} = await locals.supabase.auth.getSession();
    if(!sessionData.session){
        throw redirect(303, "/login")
    }
    
}