import React from 'react';
import { CreditCard, Check, X, Calendar, DollarSign, Zap, Shield, Users, Star, Crown, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/supabase-ssr';
import { PricingSection } from '@/components/landing/pricing-section';
import { pricingData } from '@/lib/constants/suscription';

const SubscriptionDetails: React.FC = async() => {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const {data: currentPlan} = await supabase
    .from('subscriptions').select('*')
    .eq('user_id', user?.id).eq("status", "active");
  const {data: otherPlans} = await supabase
    .from('subscriptions').select('*')
    .eq('user_id', user?.id).neq("status", "active");

  

  let feature = currentPlan && currentPlan?.length > 0 && (pricingData?.monthly.find((item)=> {
    return item?.price == currentPlan[0]?.amount;
  }) || pricingData?.yearly.find((item)=> {
    return item?.price == currentPlan[0]?.amount
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-calm-tertiary/10 via-white to-calm-primary/10">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-calm-primary/20 to-calm-tertiary/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl border border-calm-primary/30 shadow-2xl p-4">
            
            <div className="block md:hidden text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary bg-clip-text text-transparent">
                Subscription & Billing
              </h1>
              <p className="text-gray-600 text-sm mt-1 flex items-center justify-center">
                <Star className="w-3 h-3 text-amber-500 mr-1" />
                Manage your subscription
              </p>
            </div>

            <div className="hidden md:flex md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary bg-clip-text text-transparent">
                    Subscription & Billing
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-1" />
                    Manage your subscription and billing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {currentPlan && currentPlan.length > 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-calm-primary/10 to-calm-tertiary/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-calm-primary/5 via-white to-calm-tertiary/5 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-calm-primary/20 p-4 md:p-6 overflow-hidden">
              
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-calm-primary/10 to-calm-tertiary/10 rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-calm-tertiary/10 to-calm-primary/10 rounded-full translate-y-8 -translate-x-8 md:translate-y-12 md:-translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="block md:hidden">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                      {currentPlan[0]?.plan_name} Plan
                    </h2>
                    <p className="text-gray-600 text-sm">Your current subscription</p>
                    <div className="mt-3">
                      <div className="text-3xl font-black bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                        ${currentPlan[0]?.amount}
                      </div>
                      <div className="text-sm text-gray-600">per {currentPlan[0]?.billingCycle}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-calm-primary/20 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Next Billing</div>
                          <div className="font-bold text-gray-800 text-sm">{new Date(currentPlan[0]?.current_period_end).toLocaleDateString('en-GB')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-emerald-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Status</div>
                          <div className="font-bold text-emerald-600 text-sm capitalize">{currentPlan[0]?.status}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-orange-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Payment Method</div>
                          <div className="font-bold text-gray-800 text-sm">Card</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                          {currentPlan[0]?.plan_name} Plan
                        </h2>
                        <p className="text-gray-600">Your current subscription</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                        ${currentPlan[0]?.amount}
                      </div>
                      <div className="text-sm text-gray-600">per billing cycle</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-calm-primary/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-calm-primary" />
                        <div>
                          <div className="text-sm text-gray-600">Next Billing</div>
                          <div className="font-semibold text-gray-800">{new Date(currentPlan[0]?.current_period_end).toLocaleDateString('en-GB')}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6 text-emerald-500" />
                        <div>
                          <div className="text-sm text-gray-600">Status</div>
                          <div className="font-semibold text-emerald-600 capitalize">{currentPlan[0]?.status}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-orange-200 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-600">Payment Method</div>
                          <div className="font-semibold text-gray-800">Card</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {feature && feature?.features && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Plan Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((featureItem, index) => (
                        <span key={index} className="bg-gradient-to-r from-calm-primary/10 to-calm-tertiary/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700 border border-calm-primary/20 shadow-sm">
                          {featureItem}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-amber-200 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <X className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                No Active Subscription
              </h2>
              <p className="text-gray-600 mb-4">Subscribe to a plan to unlock premium features</p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto"></div>
            </div>
          </div>
        )}

       

        <PricingSection/>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-calm-primary/20 p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-lg flex items-center justify-center mr-3">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            Recent Billing History
          </h3>
          
          {otherPlans && otherPlans.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {otherPlans.map((bill, index) => (
                <div key={index} className="group bg-gradient-to-r from-calm-primary/5 to-calm-tertiary/5 rounded-xl p-4 border border-calm-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
                  
                  {/* Mobile Layout */}
                  <div className="block md:hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{bill.invoice || 'Invoice'}</div>
                          <div className="text-xs text-gray-600">{bill.date || 'Date'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${bill.amount}</div>
                        <div className="text-xs text-emerald-600 capitalize">{bill.status}</div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{bill.invoice || 'Invoice'}</div>
                        <div className="text-sm text-gray-600">{bill.date || 'Date'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${bill.amount}</div>
                        <div className="text-sm text-emerald-600 capitalize">{bill.status}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-calm-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-500">No billing history available</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mt-3 opacity-50"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="w-20 h-1 bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Secure billing powered by Stripe</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <Shield className="w-3 h-3 text-emerald-400" />
            <Star className="w-3 h-3 text-amber-400" />
            <Shield className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;