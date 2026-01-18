import { j as json } from "../../../../../chunks/index.js";
import Stripe from "stripe";
const SECRET_STRIPE_KEY = "";
const stripe = new Stripe(SECRET_STRIPE_KEY);
console.log("stripe", stripe);
async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2e3,
    currency: "eur",
    payment_method_types: ["card"]
  });
  return json({
    clientSecret: paymentIntent.client_secret
  });
}
export {
  POST
};
