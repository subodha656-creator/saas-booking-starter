'use server'
import { createClient } from '@/lib/supabase/supabase-ssr'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type LogoutState = {
  error?: string;
  success?: boolean;
}

export async function logOut(): Promise<LogoutState> {
  const supabase = await createClient()

    const { error } = await supabase.auth.signOut();


  if (error) {
    return {
      error: error.message
    }
  }

  revalidatePath('/', 'layout')
    redirect('/')
}