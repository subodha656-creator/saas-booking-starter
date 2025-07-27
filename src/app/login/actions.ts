'use server'
import { createClient } from '@/lib/supabase/supabase-ssr'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return {
      error: error.message
    }
  }
  else{
    return {
        success: "Login Successfull"
    }
  }

}