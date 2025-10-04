'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AxiosError } from 'axios';
import house1 from "../../../public/house1.png"
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    toast.error(error.response?.data?.message || "Registration failed");
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen w-full flex">
    {/* Left Side - Image */}
    <div className="hidden lg:flex w-1/2 relative">
      <Image
        src={house1}
        alt="house"
        fill
        className="object-cover"
        priority
      />
    </div>


      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-[#141414]">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-[#999999]">Sign in to access your account</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none transition placeholder-[#666666]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#262626] text-white rounded-lg focus:ring-2 focus:ring-[#703BF7] focus:border-[#703BF7] outline-none transition placeholder-[#666666]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-[#703BF7] text-white py-3 rounded-lg font-semibold hover:bg-[#8254f8] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-[#999999]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#703BF7] font-semibold hover:text-[#8254f8] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

//   return (
//     <div className="min-h-screen w-full flex items-center justify-between">

//       <div className="w-[50%] h-full r">
// <Image src={house1} fill className="" alt="house"/>
//       </div>
//       <div className="w-[50%]">

//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <div className="bg-primary-100 p-4 rounded-full">
//               <Home className="w-10 h-10 text-primary-600" />
//             </div>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//             <p className="text-gray-600">Sign in to access your account</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <LoadingSpinner size="sm" />
//               ) : (
//                 <>
//                   <LogIn className="w-5 h-5" />
//                   <span>Sign In</span>
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Don&apos;t have an account?{' '}
//               <Link href="/register" className="text-primary-600 font-semibold hover:text-primary-700">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
 
//     </div>
//   );
}
