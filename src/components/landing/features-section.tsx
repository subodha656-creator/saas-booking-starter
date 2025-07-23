import { Button } from "../ui/button";
import { Heart, Star, Users, Award, Calendar, Phone } from 'lucide-react';

const cards = [
    {
      id: 1,
      icon: <Heart className="w-8 h-8" />,
      title: "Mental Wellness",
      description: "Comprehensive therapy sessions with certified professionals to support your mental health journey.",
      stats: "500+ Sessions"
    },
    {
      id: 2,
      icon: <Star className="w-8 h-8" />,
      title: "Expert Therapists",
      description: "Connect with licensed therapists who specialize in various areas of mental health and wellness.",
      stats: "50+ Experts"
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8" />,
      title: "Group Sessions",
      description: "Join supportive group therapy sessions to connect with others on similar wellness journeys.",
      stats: "Daily Groups"
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8" />,
      title: "Certified Programs",
      description: "Evidence-based treatment programs designed to provide the best outcomes for your wellbeing.",
      stats: "25+ Programs"
    },
    {
      id: 5,
      icon: <Calendar className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for you, with 24/7 availability and easy rescheduling.",
      stats: "24/7 Available"
    },
    {
      id: 6,
      icon: <Phone className="w-8 h-8" />,
      title: "Crisis Support",
      description: "Immediate support when you need it most, with trained professionals available around the clock.",
      stats: "Instant Help"
    },
    {

        id: 7,
        icon: <Heart className="w-8 h-8" />,
        title: "Secure Payments",
        description: "Safe and secure payment options for all your therapy sessions, ensuring peace of mind.",
        stats: "SSL Encrypted"
    },

    {
        id: 8,
        icon: <Star className="w-8 h-8" />,
        title: "Personalized Plans",
        description: "Tailored therapy plans that adapt to your unique needs and progress over time.",
        stats: "Customizable"
    },

    {
        id: 9,
        icon: <Users className="w-8 h-8" />,
        title: "Book Anytime",
        description: "Easily book, reschedule, or cancel sessions through our user-friendly dashboard.",
        stats: "24/7 Access"
    }
  ];


export default function FeaturesSection(){
    return <section className="px-4 sm-px-6 lg-px-8 flex items-center flex-col justify-start py-16">
        <Button className="bg-white shadow-lg text-black hover:text-white">Features</Button>
        <h3 className="mt-8 text-3xl mb-8 font-bold">
            Why Consultants and Customers Love our Website
        </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="group h-[240px]  relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-calm-accent/80 to-red-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-300/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-300/20 rounded-full blur-xl"></div>

              <div className="relative p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg group-hover:shadow-orange-400/50 transition-shadow duration-300">
                    {card.icon}
                  </div>
                  <span className="text-sm font-semibold text-calm-secondary bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    {card.stats}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-orange-100 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-black leading-relaxed flex-grow group-hover:text-white transition-colors duration-300">
                  {card.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </div>
            </div>
          ))}
        </div>
    </section>
}