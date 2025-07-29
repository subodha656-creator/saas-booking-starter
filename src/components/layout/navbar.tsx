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
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Calendar, 
  History, 
  CreditCard,
  BookOpen,
  User,
  Settings,
  Home
} from "lucide-react";
import { useRouter } from "next/navigation";
import LoginModal from "../auth/login-modal";
import { logOut } from "@/app/(dashboard)/dashboard/actions/logout-action";
import SectionWrapper from "./section-wrapper";
import NewBookingForm from "../dashboard/new-booking-form";

export default function Navbar({
  user,
  accessNavbar = false,
}: {
  user: Record<string, any>;
  accessNavbar: boolean;
}) {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileSubmenu(null);
  };

  const [signInModal, setSignInModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  const toggleMobileSubmenu = (menu: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  const closeBookingModal = () =>{
    setBookingModal(false)
  }

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <>
      {signInModal && (
        <LoginModal open={signInModal} onClose={setSignInModal} />
      )}
      {
        bookingModal && (
          <NewBookingForm open={bookingModal} onClose={closeBookingModal as ()=> void}/>
        )
      }
      <SectionWrapper>
        <main className="navbar md:px-6 px-0 bg-gradient-to-r from-calm-primary/80 via-calm-primary/40 to-calm-primary/60 shadow-lg h-16 my-6 relative">
          <nav className="flex items-center justify-between h-full">
            <Link
              href={"/"}
              className="px-2 flex items-center justify-between h-full"
            >
              <Image
                src={"/assets/image.png"}
                width={160}
                height={160}
                alt="calm-clinic"
              />
            </Link>

            <div className="hidden md:block">
              {accessNavbar ? (
                <Menubar className="shadow-none text-white bg-calm-primary/40 border-none menu-large gap-8">
                  {/* Dashboard Home */}
                 

                  <MenubarMenu>
                    <MenubarTrigger className="text-lg flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Bookings
                    </MenubarTrigger>
                    <MenubarContent className="w-56">
                      <MenubarItem asChild>
                        <p onClick={()=> setBookingModal(true)} className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Book New Session
                        </p>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link href="/dashboard/upcoming-bookings" className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Upcoming Sessions
                        </Link>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem asChild>
                        <Link href="/dashboard/" className="flex items-center gap-2">
                          <History className="w-4 h-4" />
                          Booking History
                        </Link>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  {/* Subscription Menu */}
                  <MenubarMenu>
                    <MenubarTrigger className="text-lg flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Subscription
                    </MenubarTrigger>
                    <MenubarContent className="w-56">
                      <MenubarItem asChild>
                        <Link href="/dashboard/subscription" className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Subscription Details
                        </Link>
                      </MenubarItem>
                     
                    </MenubarContent>
                  </MenubarMenu>

                  {/* Account Menu */}
                  <MenubarMenu>
                    <MenubarTrigger className="text-lg flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Account
                    </MenubarTrigger>
                    <MenubarContent className="w-56">
                     
                      <MenubarItem onClick={handleLogout} className="text-red-600">
                        Logout
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              ) : (
                <Menubar className="shadow-none text-white bg-calm-primary/40 border-none menu-large gap-12">
                  <MenubarMenu>
                    <MenubarTrigger
                      onClick={() => {
                        const section = document.getElementById("services");
                        section?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-lg"
                    >
                      Services
                    </MenubarTrigger>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger
                      onClick={() => {
                        const section = document.getElementById("pricing");
                        section?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-lg"
                    >
                      Pricing
                    </MenubarTrigger>
                  </MenubarMenu>

                  {user && (
                    <MenubarMenu>
                      <MenubarTrigger className="text-lg">
                        Account
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem asChild>
                          <Link href="/dashboard">Dashboard</Link>
                        </MenubarItem>
                        <MenubarItem onClick={handleLogout}>
                          Logout
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  )}
                </Menubar>
              )}
            </div>

            <>
              {!user && (
                <div className="hidden md:block">
                  <Button
                    onClick={() => setSignInModal(true)}
                    className="bg-calm-accent cursor-pointer text-black hover:bg-calm-secondary"
                  >
                    Sign In
                  </Button>
                </div>
              )}

              <div className="md:hidden flex items-center space-x-2">
                {!user && (
                  <Button
                    onClick={() => setSignInModal(true)}
                    className="bg-blue-500 text-white hover:bg-calm-primary text-sm px-3 py-1 cursor-pointer"
                  >
                    Sign In
                  </Button>
                )}
                <Button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md bg-white hover:bg-gray-100 transition-colors mr-8"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </Button>
              </div>
            </>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-2xl border-t z-50">
              <div className="py-4 px-4 space-y-2">
                {accessNavbar ? (
                  <>
                   
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu("bookings")}
                        className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5" />
                          Bookings
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === "bookings" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileSubmenu === "bookings" && (
                        <div className="ml-8 mt-2 space-y-1">
                          <p
                            
                            className="flex items-center gap-2 py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={()=> {
                              toggleMobileMenu
                              setBookingModal(true)}}
                          >
                            <BookOpen className="w-4 h-4" />
                            Book New Session
                          </p>
                          <Link
                            href="/dashboard/upcoming-bookings"
                            className="flex items-center gap-2 py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            <Calendar className="w-4 h-4" />
                            Upcoming Sessions
                          </Link>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            <History className="w-4 h-4" />
                            Booking History
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Subscription Section */}
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu("subscription")}
                        className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5" />
                          Subscription
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === "subscription" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileSubmenu === "subscription" && (
                        <div className="ml-8 mt-2 space-y-1">
                          <Link
                            href="/dashboard/subscription"
                            className="flex items-center gap-2 py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            <CreditCard className="w-4 h-4" />
                            Subscription Details
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Account Section */}
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu("account")}
                        className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5" />
                          Account
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === "account" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileSubmenu === "account" && (
                        <div className="ml-8 mt-2 space-y-1">
                         
                          <button
                            className="flex items-center gap-2 w-full text-left py-2 px-3 text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => {
                              handleLogout();
                              toggleMobileMenu();
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu("services")}
                        className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Services
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === "services" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu("pricing")}
                        className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        Pricing
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === "pricing" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {user && (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu("account")}
                          className="flex items-center justify-between w-full py-3 px-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          Account
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openMobileSubmenu === "account" ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openMobileSubmenu === "account" && (
                          <div className="ml-4 mt-2 space-y-1">
                            <Link
                              href="/dashboard"
                              className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={toggleMobileMenu}
                            >
                              Dashboard
                            </Link>
                            <button
                              className="block w-full text-left py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => {
                                handleLogout();
                                toggleMobileMenu();
                              }}
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </SectionWrapper>
    </>
  );
}