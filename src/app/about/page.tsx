"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Cpu className="text-blue-500" size={24} />,
      title: "Autonomous Agentic Intelligence",
      description: "Engineered with advanced reasoning, memory, and tool-usage capabilities to automate complex engineering workflows effortlessly."
    },
    {
      icon: <Zap className="text-purple-500" size={24} />,
      title: "Zero-Latency Execution",
      description: "Optimized for lightning-fast real-time processing, ensuring your automated pipelines run with maximum efficiency and precision."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: "Enterprise-Grade Security",
      description: "Built on robust architecture ensuring your repositories, environment variables, and automated tasks remain completely secure."
    },
    {
      icon: <Workflow className="text-indigo-500" size={24} />,
      title: "Seamless Integration",
      description: "Designed specifically for modern web development stacks like Next.js, Node.js, and MongoDB for plug-and-play productivity."
    }
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[85%] mx-auto space-y-16">
        
        {/* হেডার অংশ */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800 shadow-sm">
            <Sparkles size={13} /> About FocusAgent
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Elevating Engineering Productivity Through <span className="text-blue-600 dark:text-blue-400">Autonomous AI</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            FocusAgent is a next-generation platform designed to bridge the gap between human intent and machine execution, empowering developers and teams to build faster and smarter.
          </p>
        </div>

        {/* গ্রিড ফিচার কার্ডসমূহ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* নিচের হাইলাইট ব্যানার */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-500/10"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Ready to transform your workflow?</h3>
            <p className="text-xs md:text-sm text-blue-100 max-w-xl">
              Deploy autonomous agents, generate precision content, and streamline your engineering operations today.
            </p>
          </div>
          <a 
            href="/agents" 
            className="px-6 py-3.5 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition shadow-lg shrink-0"
          >
            Explore All Agents 🚀
          </a>
        </motion.div>

      </div>
    </section>
  );
}