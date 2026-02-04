import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside of the component render to avoid recreating the Stripe object on every render.
// This assumes VITE_STRIPE_PUBLISHABLE_KEY is set in your .env file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const CheckoutForm = ({ onSuccess, onClose }: { onSuccess: () => void, onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We handle the redirect ourselves via if_required, but Stripe needs a return_url
        return_url: window.location.origin, 
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded!
      onSuccess();
    } else {
        // Unexpected state
        setErrorMessage("Payment failed or was cancelled.");
        setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <div className="flex gap-2 justify-end mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 text-sm hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={!stripe || processing} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 text-sm hover:bg-blue-700">
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
      </div>
    </form>
  );
};

const StripePaymentModal = ({ clientSecret, onSuccess, onClose }: { clientSecret: string, onSuccess: () => void, onClose: () => void }) => {
  const options = {
    clientSecret,
    appearance: {
        theme: 'stripe' as const,
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-2xl relative">
             <h2 className="text-xl font-bold mb-4 text-gray-800">Complete Payment</h2>
            <Elements stripe={stripePromise} options={options}>
                 <CheckoutForm onSuccess={onSuccess} onClose={onClose} />
            </Elements>
        </div>
    </div>
  );
};

export default StripePaymentModal;
