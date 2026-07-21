"use client";

import Link from "next/link";
import { 
  Envelope, 
  Handset, 
  Cpu, 
  LogoFacebook, 
  LogoGithub, 
  LogoLinkedin, 
  MapPin 
} from "@gravity-ui/icons";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#07070a] text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          
          {/* Logo & About Section */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex md:h-12 h-8 md:w-12 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-md">
                <span className="text-base font-black text-white tracking-wider">
                  <Cpu />
                </span>
              </div>
              <span className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Focus<span className="text-blue-600">Agent</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400/80 leading-relaxed max-w-sm">
              Your next-gen Agentic AI productivity partner. Empowering professionals and teams to manage tasks, optimize workflows, and maintain deep focus effortlessly.
            </p>
            <div className="flex items-center gap-4 pt-6">
              <SocialLink href="https://www.facebook.com" icon={<LogoFacebook className="h-5 w-5" />} />
              <SocialLink href="https://github.com/nayem0087" icon={<LogoGithub className="h-5 w-5" />} />
              <SocialLink href="https://www.linkedin.com/in/nayem-ahmmed" icon={<LogoLinkedin className="h-5 w-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Home</Link></li>
              <li><Link href="/agents" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Browse Agents</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition duration-200">About Us</Link></li>
              <li><Link href="/register" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Get Started</Link></li>
            </ul>
          </div>

          {/* Management & AI Features */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Dashboard</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/add-agent" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Add New Task</Link></li>
              <li><Link href="/manage" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Manage Tasks</Link></li>
              <li><Link href="/agents" className="hover:text-blue-600 dark:hover:text-white transition duration-200">AI Recommendations</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-white transition duration-200">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Envelope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:naymk0087@gmail.com" className="hover:text-blue-600 dark:hover:text-white transition duration-200">naymk0087@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Handset className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="hover:text-gray-900 dark:hover:text-white transition duration-200">+8801888-252746</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} FocusAgent. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-300 transition duration-200">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-300 transition duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/15 text-gray-800 dark:text-white transition hover:bg-blue-600 hover:text-white"
    >
      {icon}
    </Link>
  );
}