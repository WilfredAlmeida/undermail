import { redirect } from "@sveltejs/kit"

export const GET = async({request})=>{

    throw redirect(307, "/account/billing")

}