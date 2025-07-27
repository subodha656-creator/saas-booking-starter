'use client'
import React, { useState, createContext } from "react";

interface CheckoutContextType {
  price: string;
  plan: string;
  setData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const CheckoutContext = createContext<CheckoutContextType>({
  price: "",
  plan: "",
  setData: () => {}, // stub
});

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, any>>({
    price: "",
    plan: "",
  });

  return (
    <CheckoutContext.Provider value={{ price: data.price, plan: data.plan, setData }}>
      {children}
    </CheckoutContext.Provider>
  );
}
