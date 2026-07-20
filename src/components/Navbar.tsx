"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { Cpu } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!");
            router.push('/login');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed");
          }
        }
      });
    } catch (err) {
      toast.error("An unexpected error occurred during logout.");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <nav className="w-full h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50 transition-colors duration-300">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex md:h-12 h-8 md:w-12 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-md">
              <span className="text-base font-black text-white tracking-wider">
                <Cpu />
              </span>
            </div>
            <span className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Focus<span className="text-blue-600">Agent</span>
            </span>
          </Link>
        </div>

        {/* Desktop Links (লগআউট অবস্থায় ৩টি, লগইন অবস্থায় ৫টি রুট) */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/explore" className="hover:text-blue-600 transition">Explore</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
              <Link href="/items/manage" className="hover:text-blue-600 transition">Manage</Link>
              <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            </>
          ) : (
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </button>

          <button className="md:hidden p-2 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Auth Buttons (Get Started & Login) */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-20 h-9 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {session.user.name?.[0]}
                    </div>
                  )}
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{session.user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-semibold text-sm transition">
                  <LogIn size={16} /> Login
                </Link>
                <Link href="/register" className="flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-500/20">
                  <UserPlus size={16} /> Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 md:hidden shadow-lg">
            <Link href="/" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/explore" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Explore</Link>
            
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link href="/items/manage" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Manage</Link>
                <Link href="/about" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>About</Link>
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold mt-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/about" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>About</Link>
                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/login" className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-3 rounded-xl font-semibold dark:text-white" onClick={() => setIsOpen(false)}>
                    <LogIn size={18} /> Login
                  </Link>
                  <Link href="/register" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold" onClick={() => setIsOpen(false)}>
                    <UserPlus size={18} /> Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}