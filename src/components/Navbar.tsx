"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, LogIn, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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

  return (
    <nav className="w-full h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50 transition-colors duration-300">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg text-xl">F</div>
        <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Focus<span className="text-blue-600">Agent</span>
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/explore" className="hover:text-blue-600 transition">Explore</Link>
        {isLoggedIn && <Link href="/items/manage" className="hover:text-blue-600 transition">Dashboard</Link>}
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Auth Button */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6 md:hidden shadow-lg">
          <Link href="/" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/explore" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>Explore</Link>
          <Link href="/about" className="text-lg font-medium dark:text-white" onClick={() => setIsOpen(false)}>About</Link>
          {!isLoggedIn && (
            <Link href="/login" className="bg-blue-600 text-white py-3 rounded-lg text-center font-semibold" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;