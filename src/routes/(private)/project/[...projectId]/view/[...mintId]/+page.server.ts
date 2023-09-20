import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { fail } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
    // console.log(url);
    const { supabase } = locals;

    const projectId = url.pathname.split('/')[2];
    const mintId = url.pathname.split('/')[4];
    const pk = url.searchParams.get("pk")

    console.log(projectId);
    console.log(mintId);
    console.log(pk);

    const dbRes = await supabase.from("mints").select("name, viewedBy: viewed_by").eq("id", mintId).eq("project_id", projectId).contains("mint_addresses", [pk]);

    if (dbRes.error || dbRes.data.length === 0) {
        console.log(JSON.stringify(dbRes));

        return { found: false, message: "Oops, Mint not found" }
    }

    let viewedByOld = dbRes.data[0].viewedBy
    if (viewedByOld && viewedByOld.length > 0 && !viewedByOld.includes(pk)) {
        viewedByOld.push(pk)
    }
    else if (viewedByOld === null) {
        viewedByOld = [pk]
    }
    console.log(viewedByOld);


    const dbRes2 = await supabase.from("mints").update({
        viewed_by: viewedByOld
    }).eq("id", mintId)


    if (dbRes2.error || dbRes2.data.length === 0) {
        console.log(JSON.stringify(dbRes));
    }

    return { found: true, message: `Mint for ${dbRes.data[0].name} found for ${pk}` }

}