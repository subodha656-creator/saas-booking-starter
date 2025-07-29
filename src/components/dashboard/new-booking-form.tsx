'use client'
import React, { useActionState, useState, useEffect } from 'react';
import { Clock, MapPin, Users, Calendar, DollarSign, X, Sparkles } from 'lucide-react';
import { bookingAction } from '@/app/(dashboard)/dashboard/actions/booking-action';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const initialState = {
  error: undefined as string | undefined,
  success: false
}

interface NewBookingFormProps {
  open: boolean;
  onClose: () => void;
}

const NewBookingForm: React.FC<NewBookingFormProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    notes: ''
  });

  const [formState, formAction, isPending] = useActionState(bookingAction, initialState);

  useEffect(() => {
    if (formState?.error) {
      toast.error(formState.error);
    } else if (formState?.success) {
      toast.success("Booking Completed");
      onClose();
      router.push("/dashboard/upcoming-bookings");
    }
  }, [formState, router, onClose]);

  const services = [
    {
      id: 'individual-therapy',
      name: 'Individual Therapy Session',
      price: 50,
      icon: '🧘‍♀️',
      billing: 'Per session',
      description: 'One-on-one therapy session focused on personal growth, mental clarity, and emotional well-being.'
    },
    {
      id: 'couples-therapy',
      name: 'Couples Therapy',
      price: 90,
      icon: '💑',
      billing: 'Per session',
      description: 'Support for couples looking to improve communication, resolve conflict, and rebuild trust.'
    },
    {
      id: 'group-therapy',
      name: 'Group Therapy',
      price: 30,
      icon: '👥',
      billing: 'Per person / per session',
      description: 'Join a supportive group of peers working through similar challenges under guided facilitation.'
    },
    {
      id: 'teen-counseling',
      name: 'Teen Counseling',
      price: 45,
      icon: '🧒',
      billing: 'Per session',
      description: 'Therapy designed for teens navigating stress, anxiety, social pressures, and identity exploration.'
    },
    {
      id: 'family-therapy',
      name: 'Family Therapy',
      price: 100,
      icon: '🏠',
      billing: 'Per session',
      description: 'Structured support for families working on conflict resolution, parenting challenges, and relationships.'
    },
    {
      id: 'mental-health-checkin',
      name: 'Mental Health Check-In',
      price: 25,
      icon: '🧠',
      billing: 'Quick 30-min session',
      description: 'A short session with a therapist to evaluate emotional well-being and recommend next steps.'
    }
  ];

  const locations = [
    'CalmClinic - Main Office',
    'Virtual (Online Session)',
    'Wellness Center - East Wing',
    'Downtown Counseling Hub'
  ];

  const selectedService = services.find(s => s.id === formData.service);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-10000 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-calm-primary/5 via-white to-calm-tertiary/5 rounded-3xl"></div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-calm-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-calm-tertiary/10 rounded-full blur-xl"></div>
          
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-calm-primary/20 overflow-hidden">
            <div className="relative bg-gradient-to-r from-calm-primary to-calm-tertiary p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Book Your Session</h2>
                    <p className="text-white/80">Schedule your path to wellness</p>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white border-none rounded-full p-0 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="absolute top-4 right-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-12 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
            </div>

            <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-calm-primary/5 to-calm-tertiary/5 rounded-2xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-calm-primary/10 shadow-lg p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <Sparkles className="w-5 h-5 text-calm-primary" />
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-calm-primary to-calm-tertiary bg-clip-text text-transparent">
                          Booking Details
                        </h3>
                      </div>
                      
                      <form 
                        action={async (formData: FormData) => {
                          const bookingFormData = {
                            service: formData.get('service') as string,
                            date: formData.get('date') as string,
                            start_time: formData.get('start_time') as string,
                            end_time: formData.get('end_time') as string,
                            location: formData.get('location') as string,
                            attendees: formData.get('attendees') as string,
                            notes: formData.get('notes') as string,
                          };
                          formAction(bookingFormData);
                        }} 
                        className="space-y-6"
                      >
                        <Input type="hidden" name='service' value={formData.service}/>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select Service <span className='text-red-500'>*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {services.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, service: service.id })}
                                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                  formData.service === service.id
                                    ? 'border-calm-primary bg-gradient-to-br from-calm-primary/10 to-calm-tertiary/10 shadow-md scale-105'
                                    : 'border-gray-200 hover:border-calm-primary/50 hover:bg-calm-primary/5'
                                }`}
                              >
                                <div className="text-2xl mb-2">{service.icon}</div>
                                <div className="text-sm font-medium text-gray-800">{service.name}</div>
                                {formData.service === service.id && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-calm-primary rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                              <Calendar className="w-5 h-5 text-calm-primary absolute left-3 top-3" />
                              <Input
                                type="date"
                                name='date'
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Attendees <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                              <Users className="w-5 h-5 text-calm-primary absolute left-3 top-3" />
                              <Input
                                type="number"
                                name='attendees'
                                placeholder="Number of people"
                                value={formData.attendees}
                                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Time <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                              <Clock className="w-5 h-5 text-calm-primary absolute left-3 top-3" />
                              <Input
                                type="time"
                                name='start_time'
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Time <span className='text-red-500'>*</span>
                            </label>
                            <div className="relative">
                              <Clock className="w-5 h-5 text-calm-primary absolute left-3 top-3" />
                              <Input
                                type="time"
                                name='end_time'
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location <span className='text-red-500'>*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="w-5 h-5 text-calm-primary absolute left-3 top-3" />
                            <select
                              name='location'
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                            >
                              <option value="">Select a location</option>
                              {locations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                          <textarea
                            name='notes'
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any special requirements or notes..."
                            rows={3}
                            className="w-full text-black pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calm-primary focus:border-transparent bg-white/70 backdrop-blur-sm"
                          />
                        </div>

                        <Button
                          disabled={isPending}
                          type="submit"
                          className="w-full bg-gradient-to-r from-calm-primary to-calm-tertiary text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPending ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </div>
                          ) : (
                            'Book Now'
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-calm-tertiary/5 to-calm-primary/5 rounded-2xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-calm-tertiary/10 shadow-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <DollarSign className="w-5 h-5 text-calm-tertiary" />
                          <h3 className="text-lg font-semibold bg-gradient-to-r from-calm-tertiary to-calm-primary bg-clip-text text-transparent">
                            Booking Summary
                          </h3>
                        </div>
                        
                        {selectedService ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Service</span>
                              <span className="font-medium">{selectedService.name}</span>
                            </div>
                            {formData.date && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Date</span>
                                <span className="font-medium">{formData.date}</span>
                              </div>
                            )}
                            {formData.startTime && formData.endTime && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium">{formData.startTime} - {formData.endTime}</span>
                              </div>
                            )}
                            
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-calm-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Calendar className="w-8 h-8 text-calm-primary" />
                            </div>
                            <p className="text-gray-500">Select a service to see booking summary</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 rounded-2xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center space-x-2">
                          <span>💡</span>
                          <span>Booking Tips</span>
                        </h3>
                        <ul className="text-sm text-orange-700 space-y-3">
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Book at least 24 hours in advance for best availability</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Group bookings (10+ people) qualify for discounts</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Free cancellation up to 2 hours before booking</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Premium locations may have additional fees</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBookingForm;