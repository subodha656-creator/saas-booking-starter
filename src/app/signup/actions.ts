'use server'
import { createClient } from '@/lib/supabase/supabase-ssr'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type SignUpState = {
  error?: string;
  success?: boolean;
}

export async function signUp(formData: FormData): Promise<SignUpState> {
  const supabase = await createClient()

  if(formData.get('password') != formData.get('confirm_password')) {
    return {
      error: "Passwords don't match"
    }
  }

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return {
      error: error.message
    }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}