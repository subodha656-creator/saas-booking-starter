'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { signUp } from './actions'; 
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/auth/login-modal';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const submitFormData = new FormData();
   submitFormData.append('email', formData.email);
      submitFormData.append('password', formData.password);
      submitFormData.append('confirm_password', formData.confirmPassword);
    try {
      setIsLoading(true)
      const result = await signUp(submitFormData)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.success) {
        toast.success('Account created successfully, please check your email for verification!')
        router.push("/");
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;


  

  return (
    <>
    {
      loginModal && (
        <LoginModal open={loginModal} onClose={setLoginModal}/>
      )
    }
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">
        
        <div className="p-4 sm:p-6 lg:p-12 flex flex-col justify-center order-2 lg:order-1 bg-calm-primary">
          <div className="mb-6 sm:mb-8">
            <Link href={"/"} className=" rounded-lg flex items-center justify-center">
               <Image src="/assets/image.png" alt="Logo" width={200} height={200} />
              
            </Link>
          </div>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-sm sm:text-base text-white">Join thousands of teams already using our platform</p>
          </div>


          
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 sm:py-3 pl-10 border placeholder:text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-tertiary focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 sm:py-3 pl-10 pr-10 border placeholder:text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-tertiary focus:border-transparent text-sm sm:text-base"
                  placeholder="Create a strong password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-white" />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 text-xs text-gray-500">
                  Password strength: {formData.password.length >= 8 ? 
                    <span className="text-green-600 font-medium">Strong</span> : 
                    <span className="text-orange-600 font-medium">Weak</span>
                  }
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 placeholder:text-white py-2.5 sm:py-3 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                    formData.confirmPassword 
                      ? passwordsMatch 
                        ? 'border-green-300 focus:ring-green-500 focus:border-transparent' 
                        : 'border-red-300 focus:ring-red-500 focus:border-transparent'
                      : 'border-gray-300 focus:ring-calm-tertiary focus:border-transparent'
                  }`}
                  placeholder="Confirm your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-white" />
                  ) : (
                    <Eye className="h-4 w-4 text-white" />
                  )}
                </button>
                {passwordsMatch && (
                  <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                )}
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <div className="mt-2 text-xs text-red-600">
                  Passwords do not match
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-calm-tertiary focus:ring-calm-tertiary border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-white">
                I agree to the{' '}
                <a href="#" className="text-calm-tertiary hover:text-calm-tertiary font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-calm-tertiary hover:text-calm-tertiary font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              loading={isLoading}
              type="submit"
              className="w-full bg-calm-tertiary text-white py-6 sm:py-3 px-4 rounded-lg font-medium hover:bg-calm-tertiary/80 focus:outline-none focus:ring-2 focus:ring-calm-tertiary focus:ring-offset-2 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.email || !formData.password || !passwordsMatch}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base flex justify-center gap-6">
            <span className="text-white">Already have an account? </span>
            <p onClick={()=> setLoginModal(true)} className="text-white cursor-pointer hover:text-calm-tertiary font-medium">
              Sign in
            </p>
          </div>

          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-white">
            2025 Calm Clinic. All right Reserved
          </div>
        </div>

      <div className="bg-gradient-to-br from-calm-tertiary to-calm-tertiary/40 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-gray-800 order-1 lg:order-2 min-h-[300px] lg:min-h-0">
  <div className="mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-white">
      Start Your Wellness Journey
    </h2>
    <p className="text-sm sm:text-base text-white">
      Join a caring community focused on mental clarity, emotional balance, and well-being.
    </p>
  </div>

  <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-gray-900 shadow-xl">
    <div className="mb-5">
      <h3 className="text-base sm:text-lg font-semibold mb-3 text-calm-primary">Why Join CalmCare?</h3>
      <ul className="space-y-4 text-sm sm:text-base text-white">
        <li className="flex items-start gap-3 text-calm-primary">
          <CheckCircle className="w-4 h-4 text-calm-primary mt-1" />
          Personalized anxiety & stress tracking
        </li>
        <li className="flex items-start gap-3 text-calm-primary">
          <CheckCircle className="w-4 h-4 text-calm-primary mt-1" />
          Guided meditation & breathing exercises
        </li>
        <li className="flex items-start gap-3 text-calm-primary">
          <CheckCircle className="w-4 h-4 text-calm-primary mt-1" />
          Access to licensed therapists & support groups
        </li>
        <li className="flex items-start gap-3 text-calm-primary">
          <CheckCircle className="w-4 h-4 text-calm-primary mt-1" />
          Secure and private emotional journal
        </li>
      </ul>
    </div>

    <div className="border-t pt-4 text-xs sm:text-sm text-gray-500">
      “You don’t have to control your thoughts. You just have to stop letting them control you.”
      <div className="mt-1 text-right font-medium text-gray-600">– Dan Millman</div>
    </div>
  </div>

  <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-white text-sm font-medium opacity-80">
    <span>Mayo Clinic</span>
    <span className="hidden sm:inline">Mindful.org</span>
    <span>Psychology Today</span>
    <span className="hidden sm:inline">BetterHelp</span>
    <span>Calm App</span>
  </div>
</div>

      </div>
    </div>
    </>
  );
}