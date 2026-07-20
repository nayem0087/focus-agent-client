"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

export function FaqCtaSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center space-y-8 p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-xl"
      >
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ready to Master Your Focus?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals using FocusAgent to streamline their workflow and achieve peak productivity today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/25 transition">
            Get Started Free
          </Link>
          <Link href="/explore" className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-3.5 rounded-full transition">
            Explore Dashboard
          </Link>
        </div>
      </motion.div>
    </section>
  );
}