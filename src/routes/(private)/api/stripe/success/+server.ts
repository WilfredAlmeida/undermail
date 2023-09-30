import { vercelDb } from "$lib/vercel.js"
import { redirect } from '@sveltejs/kit'

export const POST = async({request, locals})=>{

    const {supabase} = locals;
    const body = await request.json();

    const {data:{object:{id, amount_subtotal}}} = body

    const dbSession = await vercelDb.get<string>(id)

    console.log("DB SESSION");
    console.log(JSON.stringify(dbSession));

    // if(!dbSession) return new Response(JSON.stringify({message: "Session not found"}), {status: 404})

    const {credits, email} = JSON.parse(JSON.stringify(dbSession!));
    console.log(credits, email);
    

    const {data, error} = await supabase.rpc("update_credits", {toadd: credits, useremail:email})

    if(error) console.log(error);

    console.log("DATA");
    console.log(JSON.stringify(data));

    vercelDb.del(id)
    
    // throw redirect(307, "/account/billing")

    return new Response(JSON.stringify({message: "Success"}), {status: 200})

}