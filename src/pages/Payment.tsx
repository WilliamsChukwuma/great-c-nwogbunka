
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaymentForm from '@/components/ui/payment-form';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const Payment = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState(5000); // Default amount in Naira
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  
  const handlePaymentSuccess = (reference: string) => {
    setPaymentReference(reference);
    setShowPaymentForm(false);
    toast({
      title: "Payment Successful",
      description: `Your payment reference is: ${reference}`,
    });
  };
  
  const handleResetPayment = () => {
    setPaymentReference(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Nigerian Payment Methods</h1>
        
        {paymentReference ? (
          <div className="text-center p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Payment Completed!</h2>
            <p className="mb-4">Your payment reference: <span className="font-mono bg-white px-2 py-1 rounded">{paymentReference}</span></p>
            <p className="mb-6 text-gray-600">Thank you for your payment. Your transaction has been processed successfully.</p>
            <Button onClick={handleResetPayment}>Make Another Payment</Button>
          </div>
        ) : showPaymentForm ? (
          <PaymentForm 
            amount={amount} 
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPaymentForm(false)}
          />
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Sample Product</h2>
              <p className="mb-4">
                This is a demonstration of Nigerian payment methods integration.
                Choose an amount and proceed to payment.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Amount (₦)
                </label>
                <select 
                  className="w-full p-2 border rounded"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                >
                  <option value={1000}>₦1,000</option>
                  <option value={5000}>₦5,000</option>
                  <option value={10000}>₦10,000</option>
                  <option value={25000}>₦25,000</option>
                  <option value={50000}>₦50,000</option>
                </select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => setShowPaymentForm(true)}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
