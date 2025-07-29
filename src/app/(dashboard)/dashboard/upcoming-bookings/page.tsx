import React from 'react';
import { Calendar, Clock, MapPin, Users, Edit3, Trash2, Star, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/supabase-ssr';
import { Button } from '@/components/ui/button';
import DeleteBooking from '@/components/dashboard/delete-booking';

const daysAway = (booking_date: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const bookingDate = new Date(booking_date);
  bookingDate.setHours(0, 0, 0, 0);
  
  const diffTime = bookingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const UpcomingBookings: React.FC = async() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isoDate = today.toISOString();
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
 
  const { data: upcomingBookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user?.id)
    .gte('booking_date', isoDate)
    .order('booking_date', { ascending: true });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-200';
      case 'Pending':
        return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md shadow-amber-200';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md shadow-gray-200';
    }
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200';
    if (days <= 7) return 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-200';
    return 'bg-gradient-to-br from-calm-primary to-calm-tertiary text-white shadow-lg shadow-calm-primary/30';
  };

  const getCardGradient = (days: number) => {
    if (days <= 3) return 'from-red-50 via-rose-50 to-pink-50 border-red-200';
    if (days <= 7) return 'from-orange-50 via-amber-50 to-yellow-50 border-orange-200';
    return 'from-calm-primary/5 via-white to-calm-tertiary/5 border-calm-primary/20';
  };

  const getEarliestBooking = (bookings: any[]) => {
    if (!bookings || bookings.length === 0) return null;
    
    return bookings.reduce((earliest, current) => {
      const currentDate = new Date(current.booking_date);
      const earliestDate = new Date(earliest.booking_date);
      return currentDate < earliestDate ? current : earliest;
    });
  };

  const earliestBooking = getEarliestBooking(upcomingBookings || []);

  if (!upcomingBookings || upcomingBookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-calm-tertiary/10 via-white to-calm-primary/10 p-4">
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-calm-primary/20">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent mb-2">
              No Upcoming Bookings
            </h2>
            <p className="text-gray-600 mb-4 text-sm">Your future therapy sessions will appear here</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-calm-primary to-calm-tertiary rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-calm-tertiary/10 via-white to-calm-primary/10">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-calm-primary/20 to-calm-tertiary/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl border border-calm-primary/30 shadow-2xl p-4">
            
            <div className="block md:hidden">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary bg-clip-text text-transparent">
                  Upcoming Sessions
                </h1>
                <p className="text-gray-600 text-sm mt-1 flex items-center justify-center">
                  <Star className="w-3 h-3 text-amber-500 mr-1" />
                  Your scheduled appointments
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-calm-tertiary to-calm-tertiary/40 rounded-xl px-3 py-3 shadow-lg text-center">
                  <div className="text-lg font-bold text-white">
                    {earliestBooking ? daysAway(earliestBooking.booking_date) : 0}
                  </div>
                  <div className="text-xs text-blue-100">Days to Next</div>
                </div>
                <div className="bg-gradient-to-r from-calm-primary to-calm-primary/40 rounded-xl px-3 py-3 shadow-lg text-center">
                  <div className="text-lg font-bold text-white">{upcomingBookings.length}</div>
                  <div className="text-xs text-emerald-100">Total Sessions</div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary bg-clip-text text-transparent">
                    Upcoming Sessions
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-1" />
                    Your scheduled therapy appointments
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="bg-gradient-to-r from-calm-tertiary to-calm-tertiary/40 rounded-2xl px-6 py-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-white">
                    {earliestBooking ? daysAway(earliestBooking.booking_date) : 0}
                  </div>
                  <div className="text-sm text-blue-100">Days to Next</div>
                </div>
                <div className="bg-gradient-to-r from-calm-primary to-calm-primary/40 rounded-2xl px-6 py-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-white">{upcomingBookings.length}</div>
                  <div className="text-sm text-emerald-100">Total Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingBookings.map((booking, index) => {
            const daysUntil = daysAway(booking.booking_date);
            
            return (
              <div 
                key={booking.id} 
                className={`group relative bg-gradient-to-br ${getCardGradient(daysUntil)} backdrop-blur-sm rounded-2xl shadow-xl border-2 p-4 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
              >
                <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-calm-primary/10 to-calm-tertiary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-calm-tertiary/10 to-calm-primary/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="block md:hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-gray-800 truncate">{booking.service}</h3>
                          <p className="text-xs text-gray-500">Therapy Session</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(daysUntil)} flex-shrink-0 ml-2`}>
                        {daysUntil}d
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-calm-primary/20 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-calm-primary/100 to-calm-primary/50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-3 h-3 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-semibold">Date</p>
                            <p className="font-bold text-gray-800 text-xs truncate">{booking.booking_date}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-emerald-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-3 h-3 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-semibold">Time</p>
                            <p className="font-bold text-gray-800 text-xs truncate">{booking.start_time}-{booking.end_time}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-orange-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-3 h-3 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-semibold">Location</p>
                            <p className="font-bold text-gray-800 text-xs truncate">{booking.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-purple-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-3 h-3 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 font-semibold">People</p>
                            <p className="font-bold text-gray-800 text-xs">{booking.attendees}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <DeleteBooking id={booking?.id}/>
                      <div className="flex items-center text-calm-primary text-xs">
                        <span className="mr-1">Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-14 h-14 bg-gradient-to-br from-calm-primary to-calm-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                              <Users className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800">{booking.service}</h3>
                              <p className="text-sm text-gray-500">Therapy Session</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <div className={`px-4 py-2 rounded-full text-sm font-bold ${getUrgencyColor(daysUntil)}`}>
                              {daysUntil} days
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-calm-primary/20 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Date</p>
                                <p className="font-bold text-gray-800 text-lg">{booking.booking_date}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Time</p>
                                <p className="font-bold text-gray-800 text-lg">{booking.start_time} - {booking.end_time}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-orange-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Location</p>
                                <p className="font-bold text-gray-800 text-lg">{booking.location}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Attendees</p>
                                <p className="font-bold text-gray-800 text-lg">{booking.attendees} people</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <DeleteBooking id={booking?.id}/>
                          <div className="flex items-center text-calm-primary hover:text-calm-tertiary transition-colors cursor-pointer">
                            <span className="text-sm font-medium mr-2">View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-8">
                        <div className={`${getUrgencyColor(daysUntil)} rounded-3xl p-6 shadow-xl text-center min-w-[120px]`}>
                          <div className="text-4xl lg:text-5xl font-black mb-2">
                            {daysUntil}
                          </div>
                          <div className="text-sm font-medium opacity-90">
                            {daysUntil === 1 ? 'day away' : 'days away'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute top-6 right-6 w-3 h-3 bg-calm-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
                <div className="hidden md:block absolute bottom-6 left-6 w-2 h-2 bg-calm-tertiary/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce"></div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center py-8">
          <div className="w-20 h-1 bg-gradient-to-r from-calm-primary via-calm-tertiary to-calm-primary rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Ready for your healing journey</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <Star className="w-3 h-3 text-amber-400" />
            <Star className="w-3 h-3 text-amber-400" />
            <Star className="w-3 h-3 text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingBookings;