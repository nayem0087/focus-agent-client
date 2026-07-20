"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="space-y-6 text-center">
        
        {/* এনিমেটেড স্পিনার লোগো */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-blue-600/20 border-t-blue-600 dark:border-blue-400/20 dark:border-t-blue-400"
          />
          <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-md">
            <Sparkles size={16} className="animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Loading FocusAgent</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Please wait while we prepare your workspace...</p>
        </div>

      </div>
    </div>
  );
}