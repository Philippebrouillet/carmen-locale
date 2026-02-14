import { SECRET_STRIPE_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import Stripe from "stripe";

const stripe = new Stripe(SECRET_STRIPE_KEY);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const body = await request.json();
  console.log("body", body);
  const test = await stripe.applePayDomains.create(
    {
      domain_name: "carmen-locale.vercel.app",
    },
    { stripeAccount: body.connectAccount },
  );

  console.log("test", test);
  return json({
    test,
  });
}
