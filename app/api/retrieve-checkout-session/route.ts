import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });

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