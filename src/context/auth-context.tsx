'use client'
import React from "react";
import { supabase } from '@/lib/supabase/client';
import { sign } from "crypto";


const AuthContext = React.createContext({
    user: null,
    signIn: async (email: string, password: string) => {},
    signUp: async (email: string, password: string) => {},
    signOut: async () => {},
    isAuthenticated: false,
});


const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
         return data;
    };

    const signUp = async(email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
  if (error) throw error;
    };

    return (
        <AuthContext.Provider value={{user, signIn, signUp,  signOut, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

}