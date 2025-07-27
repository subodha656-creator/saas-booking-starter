'use server'
import { createClient } from '@/lib/supabase/supabase-ssr'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function pricingAction({price}: {price: string}) {
  const supabase = await createClient()


    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        error: 'User not logged in'
      }
    }

    return {
        success: "Redirecting to payment"
    }



}