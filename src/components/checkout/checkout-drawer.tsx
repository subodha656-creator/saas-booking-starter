'use client'
import { useState, useEffect } from "react"
import { CreditCardIcon, ShieldCheckIcon, LockIcon, CheckIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import LoginModal from "../auth/login-modal"
import { login } from "@/app/login/actions"
import { supabase } from "@/lib/supabase/client"
import { pricingData } from "@/lib/constants/suscription"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
  planData?: {
    name: string;
    price: number;
    billing: string;
    features: string[];
    priceId?: string; // Stripe Price ID
  };
}

// Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false,
};

function CheckoutForm({ planData, onClose, setLoginModalOpen }: { planData: any, onClose: () => void, setLoginModalOpen: (arg:boolean)=> void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [clientSecret, setClientSecret] = useState<Record<string,any>>({

  });
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    country: 'us'
  });

  const tax = planData ? Math.round((Number(planData.price) * 0.08) * 100) / 100 : 0;
  const total = planData ? Number(planData.price) + tax : 0;


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!stripe || !elements) {
    toast.error('Payment system not ready');
    return;
  }

  setIsProcessing(true);

  try {
    // First, create the payment intent and wait for it
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: total,
        currency: 'usd',
        plan: planData?.name,
        originalAmount: planData?.price
      }),
    });

    const { clientSecret, user, error } = await response.json();
    
    if (error) {
      toast.error(error);
      return;
    }

    if (user === false) {
      toast.error("User not logged in!!");
      setLoginModalOpen(true);
      return;
    }

    // Now proceed with payment confirmation
    if (paymentMethod === 'card') {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        toast.error('Card element not found');
        return;
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.fullName,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zip,
              country: customerInfo.country,
            },
          },
        },
      });

      if (paymentError) {
        console.error('Payment failed:', paymentError);
        toast.error(paymentError.message || 'Payment failed');
        return ;
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful! Welcome to CalmClinic!');
          let feature =  (pricingData?.monthly.find((item)=> {
                  return item?.price == planData?.price;
                }) || pricingData?.yearly.find((item)=> {
                  return item?.price == planData?.price
                }))

                let nextDate = null;
                if(feature != undefined){
  nextDate = new Date();
nextDate.setDate(nextDate.getDate() + feature?.plan_end);
                }
        const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: user?.id,
        plan_name: planData?.name,
        amount: total,
        stripe_subscription_id: null,
        client_secret: paymentIntent.client_secret,
        status: 'active',
        current_period_start: new Date(),
        current_period_end: nextDate,
      } ])
        
        onClose();
      }
    } else {
      toast.info('PayPal integration coming soon!');
    }
  } catch (error) {
    console.error('Payment error:', error);
    toast.error('Payment processing failed');
  } finally {
    setIsProcessing(false);
  }
};



  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
   
    <div className="flex flex-col h-full">
      {planData && (
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{planData.name}</h4>
                <p className="text-sm text-gray-600">{planData.billing}</p>
                
                <div className="mt-2">
                  <details className="group">
                    <summary className="text-sm text-calm-primary cursor-pointer hover:underline">
                      View included features
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {planData.features.slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckIcon className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {planData.features.length > 3 && (
                        <li className="text-xs text-gray-500">
                          +{planData.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </details>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${planData.price}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${planData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Contact Information</Label>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className="mt-1"
                  value={customerInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Payment Method</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === 'card' 
                    ? 'border-calm-primary bg-calm-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCardIcon className="w-5 h-5" />
                <span className="font-medium">Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === 'paypal' 
                    ? 'border-calm-primary bg-calm-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  P
                </div>
                <span className="font-medium">PayPal</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <>
              {/* Card Information */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Card Information</Label>
                
                <div className="p-3 border border-gray-300 rounded-lg">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Billing Address</Label>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="address" className="text-sm">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      className="mt-1"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-sm">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        className="mt-1"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-sm">ZIP Code</Label>
                      <Input
                        id="zip"
                        placeholder="10001"
                        className="mt-1"
                        value={customerInfo.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="country" className="text-sm">Country</Label>
                    <Select value={customerInfo.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="gb">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Test Card Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  Test Mode - Use Test Cards
                </p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Success:</strong> 4242 4242 4242 4242</p>
                  <p><strong>Decline:</strong> 4000 0000 0000 0002</p>
                  <p><strong>3D Secure:</strong> 4000 0025 0000 3155</p>
                  <p>Use any future expiry date and any 3-digit CVC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Secure Payment
                </p>
                <p className="text-xs text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>
              <LockIcon className="w-4 h-4 text-green-600" />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-calm-primary hover:bg-calm-primary/90 text-white py-3 text-base font-semibold"
            disabled={isProcessing}
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <>Pay ${total}</>
            )}
          </Button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By completing your purchase, you agree to our{' '}
            <a href="#" className="text-calm-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-calm-primary hover:underline">Privacy Policy</a>
          </p>
        </form>
      </div>

      {/* Trust Footer */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <LockIcon className="w-4 h-4" />
            <span>256-bit Encryption</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Powered by Stripe
          </Badge>
        </div>
      </div>
    </div>
    </>
  );
}

export function CheckoutDrawer({ open, onClose, planData }: CheckoutDrawerProps) {
const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      return;
    }
  };
  const [loginModal, setLoginModalOpen] = useState(false);


  return (
    <>
    
     {
      loginModal && 
        <LoginModal open={loginModal} onClose={setLoginModalOpen}/>
  
    }
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg bg-white p-0 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="bg-calm-tertiary p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold text-white">
                Complete Your Order
              </SheetTitle>
              <SheetDescription className="text-white/80 mt-2">
                Secure checkout powered by Stripe
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <Elements stripe={stripePromise}>
          <CheckoutForm planData={planData} onClose={onClose} setLoginModalOpen={setLoginModalOpen as ()=>void}/>
        </Elements>
      </SheetContent>
    </Sheet>
    </>

  );
}