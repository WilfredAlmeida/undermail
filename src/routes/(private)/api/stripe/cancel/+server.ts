import { redirect } from "@sveltejs/kit"

export const GET = async({request})=>{

    // const body = await request.json()

    // console.log("IN CANCEL");
    // console.log(JSON.stringify(request));    

    throw redirect(307, "/account/billing")

    return new Response()

}