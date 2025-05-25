// app/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET!, {
  apiVersion: '2023-08-16',
});



export async function POST(req: Request) {
    try {
      const { priceId } = await req.json();
  
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancelled`,
      });
  
      return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (err: any) {
      console.error("Stripe error:", err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }