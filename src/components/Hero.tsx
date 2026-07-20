"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const aiPrompts = [
    "AI is organizing your high-priority tasks...",
    "Optimizing daily workflow and reducing distractions...",
    "Analyzing deadlines to keep you fully focused..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % aiPrompts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[65vh] min-h-[550px] flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
   
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center gap-6">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-medium animate-bounce">
          <Sparkles size={16} />
          <span>Next-Gen Agentic AI Productivity</span>
        </div>

     
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          Master Your Focus, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Let AI Handle the Chaos.
          </span>
        </h1>

        <div className="h-8 flex items-center justify-center text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
          <Zap size={16} className="text-blue-500 mr-2 inline animate-pulse" />
          <span className="transition-all duration-500">{aiPrompts[activeTab]}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link 
            href="/items/add" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link 
            href="/explore" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-3 rounded-full transition-all"
          >
            Explore Tasks
          </Link>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-blue-600" /> AI Task Prioritization</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-blue-600" /> Real-time Sync</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-blue-600" /> Smart Analytics</span>
        </div>

      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70">
        <span className="text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-500 mb-1">Scroll Down</span>
        <div className="w-1 h-3 rounded-full bg-blue-600" />
      </div>

    </section>
  );
};

export default Hero;