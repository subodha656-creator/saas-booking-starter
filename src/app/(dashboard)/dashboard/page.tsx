import { createClient } from '@/lib/supabase/supabase-ssr';
import { Calendar, MapPin, User, Clock } from 'lucide-react';

const BookingHistory: React.FC = async() => {

       const today = new Date();
     today.setHours(0, 0, 0, 0);
     const isoDate = today.toISOString();
     const supabase = await createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()
     const { data: bookings, error } = await supabase
       .from('bookings')
       .select('*')
       .eq('user_id', user?.id)
       .lte('booking_date', isoDate)
       .order('booking_date', { ascending: true });



    if(bookings?.length === 0){
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-calm-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-calm-primary" />
            </div>
            <p className="text-lg text-gray-600">No bookings history available</p>
            <p className="text-sm text-gray-500 mt-2">Your completed appointments will appear here</p>
          </div>
        </div>
      )
    }


  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-calm-tertiary/5 via-white to-calm-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-calm-primary/10 to-calm-tertiary/10 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-calm-primary/20 shadow-lg p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                  Booking History
                </h1>
                <p className="text-gray-600 mt-2">Your completed therapy sessions and appointments</p>
              </div>
              <div className="bg-gradient-to-r from-calm-primary to-calm-tertiary rounded-xl px-4 lg:px-6 py-3 shadow-md">
                <span className="text-sm text-white/90">Total Sessions: </span>
                <span className="font-bold text-xl text-white">{bookings?.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6">
          {bookings && bookings?.length > 0 && bookings.map((booking, index) => (
            <div 
              key={booking.id} 
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-calm-primary/10 p-6 lg:p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Decorative gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-calm-primary/20 via-calm-tertiary/20 to-calm-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-calm-primary to-calm-tertiary rounded-full flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    {/* <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{booking.service}</h3>
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-sm font-medium shadow-sm">
                        {booking.status}
                      </span>
                    </div> */}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-3 bg-calm-primary/5 rounded-xl p-3 border border-calm-primary/10">
                      <div className="w-8 h-8 bg-calm-primary/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-calm-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                        <p className="font-semibold text-gray-800">{booking.booking_date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-calm-tertiary/5 rounded-xl p-3 border border-calm-tertiary/10">
                      <div className="w-8 h-8 bg-calm-tertiary/20 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-calm-tertiary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                        <p className="font-semibold text-gray-800">{booking.start_time}-{booking.end_time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-orange-50 rounded-xl p-3 border border-orange-100">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                        <p className="font-semibold text-gray-800">{booking.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Attendees</p>
                        <p className="font-semibold text-gray-800">{booking.attendees} people</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* <div className="text-right ml-6">
                  <div className="bg-gradient-to-r from-calm-primary to-calm-tertiary rounded-xl p-4 shadow-md">
                    <div className="text-2xl lg:text-3xl font-bold text-white">{booking.amount}</div>
                    <div className="text-sm text-white/80">Total Cost</div>
                  </div>
                </div> */}
              </div>

              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-calm-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-calm-tertiary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom decorative section */}
        <div className="text-center py-8">
          <div className="w-16 h-1 bg-gradient-to-r from-calm-primary to-calm-tertiary rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-4">End of booking history</p>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;