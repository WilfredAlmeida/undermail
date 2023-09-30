import Stripe from "stripe";
import { STRIPE_KEY, STRIPE_VERSION } from '$env/static/private';

const stripe = new Stripe(STRIPE_KEY, {
	apiVersion: '2023-08-16', // Errors when given env variable
  });

export const POST = async ({ request, url }) => {

    const body = await request.json();

    const { credits } = body;

    if (!credits || typeof credits !== "number" || credits < 5) {
        return new Response(JSON.stringify({ message: "Invalid credits value" }), { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: "USD",
                product_data: {
                    name: "UnderMail Credits",
                    images: [],
                },
                unit_amount: Number.parseInt(credits.toString())*100,
            },
            quantity: 1,
        }],
        mode: "payment",
        success_url: `${url.origin}/api/stripe/success`,
        cancel_url: `${url.origin}/api/stripe/cancel`
    })

    console.log("SESSION");
    console.log(JSON.stringify(session));
    

    return new Response(JSON.stringify({url: session.url}), {status: 200})
}