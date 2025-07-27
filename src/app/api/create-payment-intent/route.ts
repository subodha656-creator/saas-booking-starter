import { pricingData } from '@/lib/constants/suscription';
import { createClient } from '@/lib/supabase/supabase-ssr';
import { PaymentIntentRequest, PaymentIntentResponse } from '@/types/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
   
  try {
    const { amount, currency = 'usd', plan, originalAmount }: PaymentIntentRequest = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }



     const supabase = await createClient()
     const { data: { user }, error: userError } = await supabase.auth.getUser()
     if(!user){
      return  NextResponse.json(
      { error: "User not logged in", user: false },
      { status: 500 }
    );
     }


     const today = new Date();
 today.setHours(0, 0, 0, 0);
 const isoDate = today.toISOString();
      const {data: subscription} = await supabase
       .from('subscriptions').select('*')
        .eq('user_id', user?.id).gte("current_period_end", isoDate).eq("status", "active");
console.log(subscription)
        if(subscription != null && subscription.length > 0){
            return NextResponse.json({error: "Subscription already present", user: user}, {
              status: 500
            });
        }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response: PaymentIntentResponse = {
      clientSecret: paymentIntent.client_secret!,
    };


   
       

    
    return NextResponse.json({...response, user});
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}