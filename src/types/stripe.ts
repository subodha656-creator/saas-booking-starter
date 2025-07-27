export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  plan: string;
  originalAmount: number;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}

export interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}