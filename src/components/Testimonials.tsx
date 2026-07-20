"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      quote: "FocusAgent completely changed how I manage my daily deliverables. The AI prioritization saves me hours every week.",
      name: "Alex Morgan",
      role: "Senior Product Designer",
      rating: 5,
      company: "DesignCraft"
    },
    {
      quote: "The deep focus mode and automated task sorting are absolute game changers for remote engineering teams.",
      name: "Sarah Chen",
      role: "Tech Lead",
      rating: 5,
      company: "NexaTech"
    },
    {
      quote: "An incredible agentic AI experience. The smart context awareness and workflow syncing are remarkably accurate.",
      name: "David Miller",
      role: "Founder & CEO",
      rating: 5,
      company: "InnovateLabs"
    }
  ];

  return (
    <section className="md:py-24 py-12 bg-white dark:bg-gray-950 transition-colors duration-300 w-full overflow-hidden">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
     
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            See how leading creators and developers accelerate their workflow with FocusAgent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-sm hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Quote size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base italic mb-6 leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{rev.name}</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{rev.role}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-200/60 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
                  {rev.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}