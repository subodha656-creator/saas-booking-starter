'use client'
import { useState } from 'react';
import { Box } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setEmail('');
  };

  return (
    <footer className="bg-calm-tertiary border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex items-center gap-2">
              <Image alt='Logo' src={"/assets/image.png"} width={140} height={80}/>
            </div>
            
            <nav className="flex flex-wrap gap-6">
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Overview
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Services
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Help
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-900 transition-colors">
                Privacy
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-900">
              Join our newsletter
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 py-2 border border-calm-secondary rounded-lg text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-calm-primary focus:border-transparent min-w-[200px]"
                required
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-calm-primary text-white text-sm font-medium rounded-lg hover:bg-calm-primary/80 focus:outline-none focus:ring-2 focus:ring-calm-primary/80 focus:ring-offset-2 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-white">
              © 2025 Calm Clinic. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-white hover:text-gray-700 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-700 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-white hover:text-gray-700 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}