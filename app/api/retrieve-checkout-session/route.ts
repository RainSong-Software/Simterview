import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe client with secret key 
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET!, {
  apiVersion: '2023-08-16',
});

/**
 * API Route: GET /api/retrieve-checkout-session
 * 
 * Retrieves a Stripe Checkout session by its ID and calculates the total SimCoins 
 * purchased based on product metadata. 
 * 
 * Query Params:
 *      session_id (string): The Stripe Checkout session ID to retrieve. 
 * 
 * Response: 
 *    200 OK:
 *     {
 *       simcoins: number, 
 *       session: Stripe.Checkout.Session 
 *     }
 *    400 Bad Request:
 *     { error: "Missing session_id"}
 *    500 Internal Server Error:
 *      {error: string }
 * @param req 
 * @returns 
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  // Validate required query parameter 
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Retrieve line items and expand to access product metadata
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });

    // Sum total simcoins based on product metadata and quantity purchased 
    const simcoins = lineItems.data.reduce((total, item) => {
      const product = item.price.product as Stripe.Product;
      const coins = parseInt(product.metadata.simcoins || '0', 10);
      return total + coins * (item.quantity || 1);
    }, 0);

    return NextResponse.json({ simcoins, session });
  } catch (error: any) {
    console.error('❌ Error retrieving session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}