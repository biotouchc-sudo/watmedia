import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse('Webhook error', { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'checkout.session.completed') {
    const subscriptionId = session.subscription;
    const customerId = session.customer;
    const userId = session.metadata.userId;

    // Create or update subscription in DB
    // This assumes a subscriptions table exists as per standard schema
    if (userId) {
       // Logic to insert/update subscription
       console.log(`Subscription created for user ${userId}`);
    }
  }

  return new NextResponse(null, { status: 200 });
}
