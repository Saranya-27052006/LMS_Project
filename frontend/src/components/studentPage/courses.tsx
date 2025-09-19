"use client";

import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

export default function Courses() {
    const courses = [
        { id: 1, title: "React Basics", description: "Learn fundamentals of React." },
        { id: 2, title: "Next.js 15", description: "Build modern full-stack apps." },
        { id: 3, title: "Tailwind CSS", description: "Style apps quickly and responsively." },
        { id: 4, title: "Node.js & Express", description: "Backend APIs with Node." },
    ];

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold mb-10 text-gray-900">Courses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-primary text-white p-3 rounded-full">
                                <FaBook className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                        </div>
                        <p className="text-gray-600">{course.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
