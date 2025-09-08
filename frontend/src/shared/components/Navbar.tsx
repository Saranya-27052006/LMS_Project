"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/userContext";

import { useState } from "react";
import Login from "@/features/auth/pages/login";
import ProfileNavbar from "./profileNav";


export default function Navbar() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const LoginButton = () => (
    <>
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.07, backgroundColor: "#4F46E5" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500 text-white font-medium shadow-md transition"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaUserCircle className="text-2xl" />
        </motion.div>
        <span className="hidden sm:inline" onClick={() => setShowModal(true)}>Login</span>
      </motion.button>

      {showModal && <Login />}
    </>
  );


  return (
    <motion.nav className="sticky bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block">
          <motion.img
            src="/images/freshkiteLogo.webp"
            alt="Freshkite Logo"
            width={150}
            height={150}
            className="cursor-pointer"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
          />
        </Link>

        {/* Login Button or Profile */}
        <div>
          {!user ? (
            <Link href="/login">
              <LoginButton />
            </Link>
          ) : (
            <ProfileNavbar />
          )}
        </div>
      </div>
    </motion.nav>
  );
}


