// import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from "$env/static/private";
// import Stripe from "stripe";

// /** @type {Stripe.Event[]} */
// const store = [];

// const stripe = new Stripe(SECRET_STRIPE_KEY);

// /** @type {import('./$types').RequestHandler} */
// export async function POST({ request }) {
//   const body = await request.text();
//   const signature = request.headers.get("stripe-signature");
//   if (signature == null) {
//     return Response.error();
//   }

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.warn("⚠️  Webhook signature verification failed.", err);
//     return new Response(undefined, { status: 400 });
//   }

//   store.push(event);

//   if (event.type == "charge.succeeded") {
//     const charge = event.data.object;
//     // TODO: fulfill the order
//     console.log(`✅ Charge succeeded ${charge.id}`);
//   }

//   return new Response(undefined);
// }

// /** @type {import('./$types').RequestHandler} */
// export async function GET({ request }) {
//   return new Response(JSON.stringify(store));
// }
