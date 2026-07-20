"use client";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-12 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6 p-8 md:p-12 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight">404</h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 transition-all text-sm"
          >
            <Home size={16} /> Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-200/70 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3 rounded-full transition-all text-sm border border-gray-300 dark:border-gray-700"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}