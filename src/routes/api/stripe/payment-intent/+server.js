import { SECRET_STRIPE_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import Stripe from "stripe";

const stripe = new Stripe(SECRET_STRIPE_KEY);
console.log("stripe", stripe);
/** @type {import('./$types').RequestHandler} */
export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "eur",
    payment_method_types: ["card"],
  });

  return json({
    clientSecret: paymentIntent.client_secret,
  });
}
