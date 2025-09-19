// components/Footer.tsx
"use client";
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-700 pb-6">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Freshkite</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering learners to grow skills, gain confidence, and land
              their dream jobs through interactive self-learning.
            </p>
          </div>

          {/* Socials */}
          <div className="ml-auto text-right">
            <h3 className="text-base font-semibold text-white mb-3">
              Connect With Us
            </h3>
            <div className="flex justify-end space-x-4">
              <a
                href="https://www.instagram.com/Freshkite2020/#"
                target="_blank"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@Freshkite2020"
                target="_blank"
                className="hover:text-red-500 transition"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/balashanmugam/"
                target="_blank"
                className="hover:text-blue-500 transition"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-sky-400 transition"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Freshkite. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Made with ❤️ by{" "}
            <span className="text-indigo-400">Freshkite Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
