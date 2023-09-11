import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { fail } from '@sveltejs/kit';

export const load = async ({url, locals}) =>{
    // console.log(url);
    const {supabase} = locals;
    
    const projectId = url.pathname.split('/')[2];
    const mintId = url.pathname.split('/')[4];
    const pk = url.searchParams.get("pk")

    console.log(projectId);
    console.log(mintId);
    console.log(pk);
    
    const dbRes = await supabase.from("mints").select("name").eq("id", mintId).eq("project_id", projectId).contains("mint_addresses",[pk]);

    if(dbRes.error || dbRes.data.length === 0){
        console.log("NOT FOUND");
        
        return {found: false, message:"Oops, Mint not found"}
    }
    
    return {found: true, message:`Mint for ${dbRes.data[0].name} found for ${pk}`}

}