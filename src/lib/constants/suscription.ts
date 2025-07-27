export const pricingData = {
  monthly: [
    {
      sn: "1",
      id: 'starter',
      name: 'Starter',
      price: 10,
      billing: 'Per user / billed monthly',
      description: 'Ideal for individuals',
      features: [
        '1 user',
        'Email support',
        'Booking calendar',
        'Basic therapy sessions',
        'Progress tracking'
      ],
      popular: false,
      savings: null,
      plan_end: 30,
    },
    {
      sn: "2",
      id: 'professional',
      name: 'Professional',
      price: 29,
      billing: 'Per user / billed monthly',
      description: 'Best for small teams',
      features: [
        'Up to 5 users',
        'Priority email support',
        'Advanced analytics',
        'Group therapy sessions',
        'Custom wellness plans',
        'Video consultations'
      ],
      popular: true,
      savings: null,
      plan_end: 30,

    },
    {
      sn: "3",
      id: 'enterprise',
      name: 'Enterprise',
      price: 79,
      billing: 'Per user / billed monthly',
      description: 'For larger organizations',
      features: [
        'Unlimited users',
        'Dedicated support',
        'Custom integrations',
        'White-label solution',
        'Advanced reporting',
        'API access',
        'Custom branding'
      ],
      popular: false,
      savings: null,
      plan_end: 30,

    }
  ],
  yearly: [
    {
      sn: "4",
      id: 'starter',
      name: 'Starter',
      price: 100,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 8.33,
      description: 'Ideal for individuals',
      features: [
        '1 user',
        'Email support',
        'Booking calendar',
        'Basic therapy sessions',
        'Progress tracking',
        '2 months free'
      ],
      popular: false,
      savings: 17,
      plan_end: 365,

    },
    {
      sn: "5",
      id: 'professional',
      name: 'Professional',
      price: 290,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 24.17,
      description: 'Best for small teams',
      features: [
        'Up to 5 users',
        'Priority email support',
        'Advanced analytics',
        'Group therapy sessions',
        'Custom wellness plans',
        'Video consultations',
        '2 months free'
      ],
      popular: true,
      savings: 17,
      plan_end: 365,

    },
    {
      sn: "6",
      id: 'enterprise',
      name: 'Enterprise',
      price: 790,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 65.83,
      description: 'For larger organizations',
      features: [
        'Unlimited users',
        'Dedicated support',
        'Custom integrations',
        'White-label solution',
        'Advanced reporting',
        'API access',
        'Custom branding',
        '2 months free'
      ],
      popular: false,
      savings: 17,
      plan_end: 365,

    }
  ]
};