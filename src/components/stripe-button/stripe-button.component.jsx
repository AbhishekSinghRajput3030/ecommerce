import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  //Use your own publishable key from ur own stripe account
  const publishableKey = 'pk_test_51KVMtASBQ5c0rt7wZ8m4Qs1FzphiQRuFKDEvb3pe0kBV5cnKRbx3sBjHrYeBO9vwKm2SThOHHthgm0RMEiYY1EbI00pDnGdPEK';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;