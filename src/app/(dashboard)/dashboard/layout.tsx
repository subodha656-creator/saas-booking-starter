// import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DashboardHeroSection from '@/components/dashboard/dashboard-hero-section';
import Navbar from '@/components/layout/navbar';
import { createClient } from '@/lib/supabase/supabase-ssr';
import SectionWrapper from '@/components/layout/section-wrapper';


async function Layout({
  children
}: {
  children: React.ReactNode
}){

  const supabase = await createClient()
    
   const { data: { user }, error: userError } = await supabase.auth.getUser()

  return (
 <>
        <DashboardHeroSection>
            <Navbar user={user!} accessNavbar={true}/>
          </DashboardHeroSection>
          <SectionWrapper>
 {
            children
          }
          </SectionWrapper>
         
          </>
  );
}

export default Layout;