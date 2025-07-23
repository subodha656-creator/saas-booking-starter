'use client'


import { useState } from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const Faqs = [
  {
    "category": "General",
    "faqs": [
      {
        "question": "What is CalmClinic?",
        "answer": "CalmClinic is an online platform that connects you with certified therapists and wellness professionals for easy appointment booking and mental health support."
      },
      {
        "question": "Who can use CalmClinic?",
        "answer": "Anyone looking to improve their mental well-being through therapy, counseling, or wellness coaching can use CalmClinic."
      },
      {
        "question": "Is CalmClinic available in my country?",
        "answer": "Currently, CalmClinic operates in select countries. Check our signup page or contact support for availability."
      },
      {
        "question": "Do I need a referral to use CalmClinic?",
        "answer": "No referral is needed. You can register, choose a therapist, and book a session directly."
      },
      {
        "question": "Are services offered online or in-person?",
        "answer": "Most sessions are conducted online via secure video, but some therapists may offer in-person visits depending on location."
      }
    ]
  },
  {
    "category": "Booking & Appointments",
    "faqs": [
      {
        "question": "How do I book an appointment?",
        "answer": "After logging in, go to the 'Book a Session' page, choose a therapist, select a time, and confirm your appointment."
      },
      {
        "question": "Can I reschedule or cancel an appointment?",
        "answer": "Yes, you can reschedule or cancel up to 24 hours before the appointment from your dashboard."
      },
      {
        "question": "How will I be reminded of my session?",
        "answer": "You’ll receive email reminders 24 hours and 1 hour before your session begins."
      },
      {
        "question": "How do I access my video session?",
        "answer": "Log in to your dashboard and click the 'Join Session' button 5 minutes before your scheduled time."
      },
      {
        "question": "What if I miss my appointment?",
        "answer": "Missed appointments without prior cancellation are non-refundable, but exceptions may apply based on therapist policies."
      }
    ]
  },
  {
    "category": "Therapists & Services",
    "faqs": [
      {
        "question": "Are the therapists certified?",
        "answer": "Yes, all therapists on CalmClinic are licensed and verified before being listed on the platform."
      },
      {
        "question": "Can I choose my own therapist?",
        "answer": "Absolutely. You can browse therapist profiles, check their specialties, and choose who best fits your needs."
      },
      {
        "question": "What types of therapy are offered?",
        "answer": "We offer cognitive-behavioral therapy (CBT), couples counseling, wellness coaching, trauma therapy, and more."
      },
      {
        "question": "Can I switch therapists later?",
        "answer": "Yes, you can switch therapists anytime via your dashboard with no additional fees."
      },
      {
        "question": "Do therapists speak different languages?",
        "answer": "Many of our therapists offer services in multiple languages. Check their profile for language availability."
      }
    ]
  },
  {
    "category": "Payments & Pricing",
    "faqs": [
      {
        "question": "How much does a session cost?",
        "answer": "Pricing depends on the therapist and plan you choose. We offer Basic, Pro, and Enterprise plans starting at $10/month."
      },
      {
        "question": "Is there a free trial available?",
        "answer": "Yes, we offer a 7-day free trial with limited features so you can explore the platform."
      },
      {
        "question": "How do I pay for sessions?",
        "answer": "Payments are processed securely via Stripe. You can use credit/debit cards and other supported payment methods."
      },
      {
        "question": "Can I upgrade or downgrade my plan?",
        "answer": "Yes, you can change your subscription at any time from your billing settings."
      },
      {
        "question": "Do you offer refunds?",
        "answer": "Refunds are provided for billing errors or unused plans, subject to our refund policy."
      }
    ]
  },
  {
    "category": "Technical & Support",
    "faqs": [
      {
        "question": "I forgot my password. What should I do?",
        "answer": "Click the 'Forgot Password' link on the login page to reset your password."
      },
      {
        "question": "Why can’t I join the video session?",
        "answer": "Check your internet connection and allow access to your camera/mic. Contact support if the issue continues."
      },
      {
        "question": "How secure is my data?",
        "answer": "We use end-to-end encryption and industry-standard security protocols to protect your personal data and session content."
      },
      {
        "question": "Can I use CalmClinic on mobile?",
        "answer": "Yes, CalmClinic is mobile-friendly and works on all modern smartphones and tablets."
      },
      {
        "question": "How do I contact customer support?",
        "answer": "You can reach us via the chat widget, support email, or our Help Center available on your dashboard."
      }
    ]
  }
];


export default function FAQSection(){
    const [category, setCategory] = useState<string>("General");

    const categories = Faqs.map((faq) => faq.category);
    const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const category = target.dataset.cat;
        if(category){
            setCategory(category);
        }
    }

    const currentFaqs = Faqs.find(faq => faq.category === category)?.faqs || [];
    return (
       <section className="px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
  <Button className="bg-white shadow-lg text-black hover:text-white">
    FAQs
  </Button>

  <h3 className="mt-8 text-3xl mb-10 font-bold text-center max-w-2xl">
    Everything you need to know about our services
  </h3>

  <div className="w-full grid md:grid-cols-4 gap-8 items-center">
    <div className="col-span-1">
      <div className="flex flex-col gap-4 sticky top-24">
        {categories.map((cat, index) => (
          <Button
            key={index}
            data-cat={cat}
            onClick={changeCategory}
            variant="outline"
            className={`${cat === category ? "bg-black text-white": "bg-transparent text-black"} text-sm rounded-full font-semibold border-black/20 hover:text-white hover:bg-black/20 transition`}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>

    <div className="col-span-1 md:col-span-3">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {currentFaqs.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance text-sm text-muted-foreground">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>

    );
}