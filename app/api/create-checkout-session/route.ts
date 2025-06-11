// app/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with the secret key 
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET!, {
  apiVersion: '2023-08-16',
});

/**
 * API Route: POST /api/create-checkout-session 
 * 
 * This route creates a new Stripe Checkout session using the provided price ID.
 * It expects a JSON body with a `priceId` field.
 * On success, it returns the Checkout session URL to redirect the user to. 
 * 
 * Request body:
 * {
 *   "priceId": string // The Stripe price ID for the selected SimCoin bundle
 * }
 * 
 * Response:
 * {
 *  "url": string // Stripe Checkout session URL 
 * }
 * @param req 
 * @returns 
 */
export async function POST(req: Request) {
    try {
      //Extract priceId from the request body 
      const { priceId } = await req.json();
  
      // Create a new Stripe Checkout session 
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
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/simcoins`,
      });
  
      // Return the session URL
      return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (err: any) {
      console.error("Stripe error:", err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }