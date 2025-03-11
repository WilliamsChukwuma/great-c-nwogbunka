
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nigerianBanks, processNigerianPayment } from '@/lib/payment-service';

interface PaymentFormProps {
  amount: number;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount = 0, 
  onSuccess, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'card'>('bank_transfer');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    bank: '',
    accountNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const response = await processNigerianPayment({
        amount,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        bank: formData.bank,
        accountNumber: formData.accountNumber,
        reference: `PAY-${Date.now()}`,
        destinationAccount: '3065836706' // The specific account to receive the payment
      });
      
      if (response.success) {
        toast({
          title: "Payment Initiated",
          description: response.message,
        });
        if (onSuccess && response.reference) {
          onSuccess(response.reference);
        }
      } else {
        toast({
          title: "Payment Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Complete your payment using Nigerian payment methods</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select 
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as 'bank_transfer' | 'card')}
            >
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="card">Card Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+234 XXX XXX XXXX"
            />
          </div>
          
          {paymentMethod === 'bank_transfer' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <Select
                  value={formData.bank}
                  onValueChange={(value) => handleSelectChange('bank', value)}
                >
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianBanks.map((bank) => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="10-digit account number"
                  maxLength={10}
                />
              </div>
            </>
          )}
          
          <div className="pt-2">
            <p className="font-medium">Amount: ₦{amount.toLocaleString()}</p>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex-col items-start text-sm text-muted-foreground">
        <p>Secured by Supabase + Nigerian Payment Providers</p>
        <p>Note: This is a demonstration integration. In a production environment, you would integrate with actual Nigerian payment processors like Paystack, Flutterwave, or Remita.</p>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
