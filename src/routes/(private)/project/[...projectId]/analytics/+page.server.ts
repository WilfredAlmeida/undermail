export const load = async({url, locals})=>{

    const {supabase} = locals

    const projectId = url.pathname.split('/')[2];

    const {data,error} = await supabase.from("projects").select("plausibleUrl:plausible_url").eq("id", projectId)

    if(error){
        return {
            message: "Something went wrong"
        }
    }

    const {plausibleUrl} = data[0] || null
    

    return{
        plausibleUrl
    }

}