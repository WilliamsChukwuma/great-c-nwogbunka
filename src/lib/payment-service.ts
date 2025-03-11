
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Default destination account
const DEFAULT_DESTINATION_ACCOUNT = '3065836706';

export interface PaymentRequest {
  amount: number;
  email: string;
  name: string;
  phone?: string;
  bank?: string;
  accountNumber?: string;
  reference?: string;
  destinationAccount?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  reference?: string;
  transactionId?: string;
}

// Function to process Nigerian bank payments
export const processNigerianPayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    console.info('Processing Nigerian payment', paymentData);
    
    // Use the provided destination account or fall back to the default
    const destinationAccount = paymentData.destinationAccount || DEFAULT_DESTINATION_ACCOUNT;
    
    // Store payment request in Supabase
    const { data, error } = await supabase
      .from('payment_requests')
      .insert([
        {
          amount: paymentData.amount,
          email: paymentData.email,
          name: paymentData.name,
          phone: paymentData.phone,
          bank: paymentData.bank,
          account_number: paymentData.accountNumber,
          destination_account: destinationAccount,
          reference: paymentData.reference || `REF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          status: 'pending'
        }
      ])
      .select();
    
    if (error) {
      console.error('Error saving payment request:', error);
      return {
        success: false,
        message: 'Failed to process payment request'
      };
    }
    
    // In a real implementation, you would integrate with a payment gateway API here
    // For demo purposes, we'll simulate a successful payment
    return {
      success: true,
      message: `Payment request processed successfully. Funds will be sent to account: ${destinationAccount}`,
      reference: data[0].reference,
      transactionId: data[0].id
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      message: 'An error occurred while processing your payment'
    };
  }
};

// Nigerian banks list
export const nigerianBanks = [
  { code: '044', name: 'Access Bank' },
  { code: '023', name: 'Citibank Nigeria' },
  { code: '050', name: 'Ecobank Nigeria' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '214', name: 'First City Monument Bank' },
  { code: '058', name: 'Guaranty Trust Bank' },
  { code: '030', name: 'Heritage Bank' },
  { code: '301', name: 'Jaiz Bank' },
  { code: '082', name: 'Keystone Bank' },
  { code: '526', name: 'Parallex Bank' },
  { code: '076', name: 'Polaris Bank' },
  { code: '221', name: 'Stanbic IBTC Bank' },
  { code: '068', name: 'Standard Chartered Bank' },
  { code: '232', name: 'Sterling Bank' },
  { code: '100', name: 'Suntrust Bank' },
  { code: '032', name: 'Union Bank of Nigeria' },
  { code: '033', name: 'United Bank for Africa' },
  { code: '215', name: 'Unity Bank' },
  { code: '035', name: 'Wema Bank' },
  { code: '057', name: 'Zenith Bank' }
];
