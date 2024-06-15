import express from 'express';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import Stripe from 'stripe';
import cors from 'cors';

// Initialize Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Create a new instance of Stripe
const stripe = new Stripe(
  process.env.stripe_Key,
  {
    apiVersion: '2020-08-27', // Use the latest Stripe API version
  }
);

// Define the route to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log(req.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Specify the payment method types
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: req.body.items.product,
            },
            unit_amount: req.body.items.prize*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: 'http://localhost:3000',
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Webhook endpoint for Stripe
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.expired':
        const session = event.data.object;
        console.log(`Checkout session expired: ${session.id}`);
        // Add your logic to handle the expired session
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);
const port= 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
