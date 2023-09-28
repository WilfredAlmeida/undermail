export const load = async ({locals, parent}) => {

    const {supabase}=locals;
    
    const {
		user: { email }
	} = await locals.getSession();
    
    const dbRes= await supabase.from("users").select("credits").eq("email",email)

    if(dbRes.error || dbRes.data.length===0){
        return {message: "Something Went Wrong"}
    }

    const credits = dbRes.data[0].credits

    return {credits: credits}

}