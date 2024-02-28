const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price: "price_1Ok4b0EgtBpXb4TYg5V2zxVu",
          quantity: 1,
        },
      ],
      payment_method_types: ["paypal", "card"],
      mode: "payment",
      return_url: `https://front-end-eight-eta-57.vercel.app/stripe/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json(err.message);
  }
}

export async function GET(req) {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.nextUrl.searchParams.get("session_id")
    );

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
