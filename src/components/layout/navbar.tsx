"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState< string | null >(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileSubmenu(null); 
  };

  const toggleMobileSubmenu = (menu: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  return (
    <main className="navbar md:px-6 px-0 bg-white shadow-lg h-16 my-6 rounded-2xl relative">
      <nav className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="px-2 flex items-center justify-between h-full">
          <Image src={"/assets/image.png"} width={160} height={160} alt="calm-clinic"/>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <Menubar className="shadow-none text-black border-none menu-large gap-12">
            <MenubarMenu>
              <MenubarTrigger className="text-lg">Services</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/services">All services</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/categories/therapy">Therapy</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/categories/wellness">Wellness</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-lg">Pricing</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/pricing">Plans</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/pricing/comparison">Compare Plans</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-lg">Account</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/settings">Settings</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Desktop Sign In Button */}
        <div className="hidden md:block">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1"
          >
            Sign In
          </Button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-2xl border-t z-50">
          <div className="py-4 px-4 space-y-2">
            <div>
              <button
                onClick={() => toggleMobileSubmenu('services')}
                className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Services
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    openMobileSubmenu === 'services' ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openMobileSubmenu === 'services' && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link 
                    href="/services" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    All Services
                  </Link>
                  <Link 
                    href="/categories/therapy" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Therapy
                  </Link>
                  <Link 
                    href="/categories/wellness" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Wellness
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleMobileSubmenu('pricing')}
                className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Pricing
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    openMobileSubmenu === 'pricing' ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openMobileSubmenu === 'pricing' && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link 
                    href="/pricing" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Plans
                  </Link>
                  <Link 
                    href="/pricing/comparison" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Compare Plans
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleMobileSubmenu('account')}
                className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Account
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    openMobileSubmenu === 'account' ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openMobileSubmenu === 'account' && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link 
                    href="/dashboard" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button 
                    className="block w-full text-left py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}