"use client";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FaqCtaSection() {
  return (
    <section className="md:py-24 py-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 md:p-16 shadow-xl overflow-hidden text-center transition-colors duration-300"
        >
       
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles size={14} className="animate-pulse" /> Get Started Today
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Ready to Master Your Focus?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              Join thousands of professionals using FocusAgent to streamline their workflow, automate tasks, and achieve peak productivity today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/login" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              
              <Link 
                href="/explore" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-200/70 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-4 rounded-full border border-gray-300 dark:border-gray-700 transition-all duration-300"
              >
                Explore Dashboard
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}