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

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

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

  const userName = session?.user?.name ?? "";
  const userImage = session?.user?.image ?? null;
  const userInitial = userName ? userName[0] : "?";

  return (
    <>
      <Toaster position="top-center" />
      <nav className="w-full h-16 sm:h-18 md:h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50 transition-colors duration-300">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-md">
              <span className="text-base font-black text-white tracking-wider">
                <Cpu />
              </span>
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Focus<span className="text-blue-600">Agent</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-600 dark:text-gray-300 font-medium text-sm xl:text-base">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/agents" className="hover:text-blue-600 transition">Browse Agents</Link>

          {isLoggedIn ? (
            <>
              <Link href="/add-agent" className="hover:text-blue-600 transition">Add Agent</Link>
              <Link href="/manage" className="hover:text-blue-600 transition">Manage</Link>
              <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            </>
          ) : (
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-400 sm:w-5 sm:h-5" /> : <Moon size={18} className="text-gray-700 sm:w-5 sm:h-5" />}
          </button>

          <button
            className="lg:hidden p-2 dark:text-white"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop / tablet auth area */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="w-20 h-9 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {userInitial}
                    </div>
                  )}
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 max-w-[100px] truncate">{userName}</span>
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

        {/* Mobile / tablet dropdown menu */}
        {isOpen && (
          <div className="absolute top-16 sm:top-18 left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 lg:hidden shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link href="/" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/agents" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
              Browse Agents
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/add-agent" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
                  Add Agent
                </Link>
                <Link href="/manage" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
                  Manage
                </Link>
                <Link href="/about" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
                  About
                </Link>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      {userInitial}
                    </div>
                  )}
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{userName}</span>
                </div>

                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold mt-1"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/about" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-3 rounded-xl font-semibold dark:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={18} /> Login
                  </Link>
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
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