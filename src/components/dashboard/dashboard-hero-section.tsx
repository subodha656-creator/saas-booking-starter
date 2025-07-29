'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Calendar, MessageCircle, BookOpen, TrendingUp, Clock, User } from "lucide-react";
import { useState } from "react";
import NewBookingForm from "./new-booking-form";

interface DashboardHeroProps {
  children?: React.ReactNode;
  userName?: string;
  nextAppointment?: {
    date: string;
    time: string;
    therapist: string;
  };
  stats?: {
    sessionsCompleted: number;
    streakDays: number;
    journalEntries: number;
  };
}

export default function DashboardHeroSection({
  children,
  userName = "Friend",
  nextAppointment,
  stats = {
    sessionsCompleted: 0,
    streakDays: 0,
    journalEntries: 0
  }
}: DashboardHeroProps) {
  const router = useRouter();
  const [bookSession, setBookSession] = useState(false);
  
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleBookSession = () => {
    setBookSession(!bookSession)
  };

  const handleViewJournal = () => {
    router.push("/journal");
  };

  const handleViewProgress = () => {
    router.push("/progress");
  };

  return (
    <>
    {
      bookSession && <NewBookingForm open={bookSession} onClose={handleBookSession as ()=> void}/>
    }
    <div
      className="relative min-h-[70vh] bg-gradient-to-r bg-[url('/assets/meditate.jpg')] bg-no-repeat bg-cover from-calm-primary/60 via-calm-primary/80 to-calm-primary/40 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8"
      
    >
        <div className="absolute backdrop:2xl:blur-2xl top-0 left-0 w-full h-full bg-black opacity-50">
  </div>
      <div className="absolute top-0 left-0 w-full z-50 px-2 sm:px-4 mb-6 md:mb-0">
        {children}
      </div>

      <div className="absolute lg:block hidden inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-4 sm:left-8 lg:left-16 top-1/4 transform -rotate-12 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-56 lg:w-72 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
            <div className="transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-12 bg-calm-primary/80 rounded-full mb-4 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {nextAppointment ? 'Next Session' : 'No Upcoming Sessions'}
              </h3>
              {nextAppointment ? (
                <div className="text-white/90 text-sm space-y-1">
                  <p className="font-medium">{nextAppointment.date}</p>
                  <p>{nextAppointment.time}</p>
                  <p className="text-white/70">with {nextAppointment.therapist}</p>
                </div>
              ) : (
                <p className="text-white/80 text-sm">
                  Ready to book your next session?
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute right-4 sm:right-8 lg:right-16 top-2/3 transform rotate-12 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-56 lg:w-72 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
            <div className="transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-12 bg-calm-primary/80 rounded-full mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-base mb-3">Your Progress</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/90">
                  <span>Sessions:</span>
                  <span className="font-medium">{stats.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>Streak:</span>
                  <span className="font-medium">{stats.streakDays} days</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>Journal Entries:</span>
                  <span className="font-medium">{stats.journalEntries}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-4 sm:right-8 lg:right-16 top-1/4 transform rotate-6 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-48 lg:w-56 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
            <div className="transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="w-10 h-10 bg-calm-primary/80 rounded-full mb-3 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">Today's Focus</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                Take a moment for mindfulness and self-care
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 max-w-7xl mx-auto relative z-10 text-center">
        <div className="mb-6">
          <p className="text-lg sm:text-xl text-white/80 font-light mb-2">
            {getGreeting()},
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {userName}
          </h1>
        </div>

        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 max-w-4xl mx-auto leading-tight">
            How are you feeling today?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Your mental wellness journey continues. Take time for yourself, reflect on your progress, and remember that every step forward matters.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 max-w-4xl mx-auto mb-8 w-full">
          <Button 
            onClick={handleBookSession}
            className="group bg-white/10 hover:bg-white hover:text-calm-primary text-white border border-white/20 backdrop-blur-md font-semibold py-4 px-6 text-base rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-5 h-5 mr-2 group-hover:text-calm-primary" />
            Book Session
          </Button>
          
         
        </div>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
          <h3 className="text-white font-semibold text-lg mb-3">Today's Reflection</h3>
          <blockquote className="text-white/90 text-base italic leading-relaxed">
            "Progress, not perfection. Every small step you take towards better mental health is a victory worth celebrating."
          </blockquote>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce md:hidden">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
    </>
  );
}