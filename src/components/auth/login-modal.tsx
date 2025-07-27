'use client'

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Fragment } from 'react';
import { login } from '@/app/login/actions';

interface LoginModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: 0,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || formData.terms === 0) {
      return;
    }

    setLoading(true);
    
    try {
      const submitFormData = new FormData();
      submitFormData.append('email', formData.email);
      submitFormData.append('password', formData.password);
      submitFormData.append('terms', formData.terms.toString());

      const data = await login(submitFormData);

      if (data?.error) {
        toast.error(data?.error);
      } else if (data?.success) {
        toast.success(data?.success);
        router.push('/');
        onClose(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" leave="ease-in duration-200"
            enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-2xl w-full max-w-3xl mx-auto shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 lg:p-10 bg-calm-primary">
                  <div className="mb-6 text-center">
                    <Image src="/assets/image.png" alt="Logo" width={150} height={150} className="mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-2 text-white">Get Started Now</h2>
                  <p className="text-sm text-white text-center mb-6">Enter your credentials to access your account</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-white block mb-1">Email address</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        disabled={loading}
                      />
                    </div>

                    <div>
                   
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="min 8 chars"
                          className="pr-10"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2.5 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={!!formData.terms}
                        onChange={(e) => setFormData({ ...formData, terms: e.target.checked ? 1 : 0 })}
                        className="h-4 w-4"
                        disabled={loading}
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-white">
                        I agree to the{' '}
                        <a href="#" className="text-calm-tertiary hover:underline">Terms & Privacy</a>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!formData.email || !formData.password || formData.terms === 0 || loading}
                      className="w-full"
                      loading={loading}
                    >
                      Login
                    </Button>
                  </form>

                  <div className="mt-4 text-center text-sm">
                    <span className="text-white">Not a member? </span>
                    <Link href="/signup" className="text-calm-tertiary hover:underline font-medium">Sign up</Link>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-calm-tertiary/80 via-calm-tertiary/60 to-calm-tertiary/50 p-6 lg:p-10 text-gray-800 hidden lg:flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Welcome Back to Calm Clinic</h3>
                  <p className="text-sm text-white mb-6">A safe space for your mind and well-being.</p>

                  <div className="bg-white rounded-xl shadow p-4 space-y-3">
                    <div className="text-sm">
                      <strong className="text-white">Upcoming Session</strong>
                      <p>Therapist: Dr. Sarah Ellis</p>
                      <p>Date: July 28, 2025</p>
                      <p>Time: 3:00 PM - 4:00 PM</p>
                    </div>
                    <div className="border-t pt-2 text-sm">
                      <p>Mood Today: <span className="text-green-600 font-medium">😊 Positive</span></p>
                      <p>Sleep: <span className="text-blue-600 font-medium">7.5 hrs</span></p>
                      <p>Mindfulness: <span className="text-purple-600 font-medium">15 min</span></p>
                    </div>
                  </div>
                  <div className="mt-4 italic text-sm text-center text-white">
                    "Healing takes time, and asking for help is a courageous step."
                    <div className="not-italic text-xs mt-1">— Calm Clinic</div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}