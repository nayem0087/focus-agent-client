"use client";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Bot, Cpu, FileText } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="md:py-24 py-12 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-300 w-full">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Bot size={14} /> Agentic AI Workflow
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Let AI Handle Analysis, Content, and Organization.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            FocusAgent goes beyond simple lists. Our intelligent assistant evaluates your project parameters, drafts smart summaries, and automates repetitive categorization so you can focus on execution.
          </p>
          <div className="pt-2">
            <Link href="/explore" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Explore All AI Features <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
   
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 bg-white dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Smart Content Generator</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Generate structured descriptions and reports instantly using custom prompts.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 bg-white dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Contextual Chat Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Conversational AI that fully understands your app data and active tasks.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}