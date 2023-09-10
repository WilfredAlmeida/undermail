import { redirect } from '@sveltejs/kit';

export const load = async({url, locals})=>{
    const {supabase} = locals
    
    const projectId = url.pathname.split("/")[2]

    const dbRes = await supabase.from("projects").select("underdogId:underdog_id").eq("id", projectId)
    if (dbRes.data.length === 0) {
        throw redirect(307, `${url.origin}/404`)
    }
    
}