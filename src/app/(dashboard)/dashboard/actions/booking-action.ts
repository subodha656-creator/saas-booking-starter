'use server'
import { createClient } from '@/lib/supabase/supabase-ssr'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface BookingFormData {
  service: string
  date: string
  attendees: string
  start_time: string
  end_time: string
  location: string
  notes: string
}

export type BookingState = {
  error?: string
  success?: boolean
  data?: any
}

export async function bookingAction(prevState: BookingState, formData: BookingFormData): Promise<BookingState> {
  try {
    const supabase = await createClient()


    const { data: { user }, error: userError } = await supabase.auth.getUser()

    const today = new Date();
 today.setHours(0, 0, 0, 0);
 const isoDate = today.toISOString();

       const {data} = await supabase
       .from('subscriptions').select('*')
        .eq('user_id', user?.id).gte("current_period_end", isoDate);
      console.log(data)
        if(data?.length === 0){
              return {
        error: "You are not subscribed to any plans."
      }
        }


    
    if (userError || !user) {
      return {
        error: 'User not authenticated'
      }
    }

    if (!formData.attendees || !formData.location || !formData.service || !formData.date || !formData.start_time || !formData?.end_time) {
      return {
        error: 'Missing required fields'
      }
    }

   if(today?.getTime() > new Date(formData.date).getTime()){
    return {
      error: "Date cannot be earlier than today!!"
    }
   }

    const bookingData = {
      user_id: user.id,
      service: formData.service,
      booking_date: formData.date,
      attendees: parseInt(formData.attendees) || 1,
      start_time: formData.start_time,
      end_time: formData.end_time,
      location: formData.location,
      notes: formData.notes,
      created_at: new Date().toISOString()
    }


    const { error: insertError, data: insertedData } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()

    if (insertError) {
      return {
        error: insertError.message
      }
    }

    return { success: true, data: insertedData }

  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Something went wrong'
    }
  }
}