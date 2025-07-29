import { Button } from "../ui/button";
import { Heart, Star, Users, Award, Calendar, Phone } from 'lucide-react';

const cards = [
    {
      id: 1,
      icon: <Heart className="w-6 h-6" />,
      title: "Mental Wellness",
      description: "Comprehensive therapy sessions with certified professionals to support your mental health journey.",
      stats: "500+ Sessions"
    },
    {
      id: 2,
      icon: <Star className="w-6 h-6" />,
      title: "Expert Therapists",
      description: "Connect with licensed therapists who specialize in various areas of mental health and wellness.",
      stats: "50+ Experts"
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6" />,
      title: "Group Sessions",
      description: "Join supportive group therapy sessions to connect with others on similar wellness journeys.",
      stats: "Daily Groups"
    },
    {
      id: 4,
      icon: <Award className="w-6 h-6" />,
      title: "Certified Programs",
      description: "Evidence-based treatment programs designed to provide the best outcomes for your wellbeing.",
      stats: "25+ Programs"
    },
    {
      id: 5,
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for you, with 24/7 availability and easy rescheduling.",
      stats: "24/7 Available"
    },
    {
      id: 6,
      icon: <Phone className="w-6 h-6" />,
      title: "Crisis Support",
      description: "Immediate support when you need it most, with trained professionals available around the clock.",
      stats: "Instant Help"
    },
    {
        id: 7,
        icon: <Heart className="w-6 h-6" />,
        title: "Secure Payments",
        description: "Safe and secure payment options for all your therapy sessions, ensuring peace of mind.",
        stats: "SSL Encrypted"
    },
    {
        id: 8,
        icon: <Star className="w-6 h-6" />,
        title: "Personalized Plans",
        description: "Tailored therapy plans that adapt to your unique needs and progress over time.",
        stats: "Customizable"
    },
    {
        id: 9,
        icon: <Users className="w-6 h-6" />,
        title: "Book Anytime",
        description: "Easily book, reschedule, or cancel sessions through our user-friendly dashboard.",
        stats: "24/7 Access"
    }
];

export default function FeaturesSection(){
    return (
        <section id="services" className="px-4 sm:px-6 lg:px-8 flex items-center flex-col justify-start py-12 bg-white">
            <Button className="bg-cream-100 shadow-sm text-black hover:bg-calm-primary/40 hover:text-white border border-orange-200 px-6 py-2 text-sm font-medium">
                Features
            </Button>
            <h3 className="mt-6 text-2xl mb-8 font-semibold text-black drop-shadow-black/40">
                Why Consultants and Customers Love our Website
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className="group border border-[outset]/40 h-[200px] relative overflow-hidden rounded-xl bg-gradient-to-br from-calm-primary/80 to-red-50/60  shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-orange-300/70"
                        style={{
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-red-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-200/30 rounded-full blur-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-red-200/30 rounded-full blur-lg"></div>

                        <div className="relative p-5 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-calm-primary/300 to-calm-primary/200 text-white shadow-sm group-hover:shadow-orange-300/30 transition-shadow duration-300">
                                    {card.icon}
                                </div>
                                <span className="text-xs text-white font-medium bg-calm-primary/60 px-2 py-1 rounded-full border border-calm-primary/50">
                                    {card.stats}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-calm-tertiary mb-2 group-hover:text-calm-tertiary/800 transition-colors duration-300">
                                {card.title}
                            </h3>
                            <p className="text-calm-tertiary text-sm leading-relaxed flex-grow group-hover:text-calm-tertiary/800 transition-colors duration-300">
                                {card.description}
                            </p>

                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-calm-tertiary to-calm-tertiary/30 group-hover:w-full transition-all duration-300 rounded-b-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}