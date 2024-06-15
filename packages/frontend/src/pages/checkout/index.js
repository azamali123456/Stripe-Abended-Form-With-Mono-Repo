import React, { useState, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const stripePromise = loadStripe(
  'pk_live_51NFKZLAgDjJFNJDFSVoAd5y8R3vkc5ZXcLDGaYCNImx4yHjTfsy9ZlDI70FnSjD7x7H2cLltSXQghB5kl4quD67W00iay3tl1h'
);

const PayNow = ({ itemForCheckout }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch client secret
  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/create-checkout-session',
        { items: itemForCheckout } // Pass itemForCheckout to the API call
      );
      if (!response.data.clientSecret) {
        throw new Error('Client secret is missing');
      }
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
      setError(error);
    }
  }, [itemForCheckout]);

  // Call fetchClientSecret if itemForCheckout has items
  useEffect(() => {
      fetchClientSecret();
  }, [itemForCheckout, fetchClientSecret]);

  const options = {
    clientSecret: clientSecret,
  };



  return (
    <div>
          {error && <div>Error: {error.message}</div>}
          {clientSecret ? (
            <div id='checkout'>
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        
    </div>
  );
};

export default PayNow;
