"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";
import { Card, CardContent } from "@/shared/components/Card";

const testimonials = [
  {
    name: "Aarav Patel",
    image: "/images/students/Nishok.jpg",
    video: "https://www.youtube.com/shorts/TNn9oTPR7HY",
    quote:
      "Freshkite helped me build confidence by asking me questions daily. I never felt like a student—I felt like a professional preparing for interviews.",
  },
  {
    name: "Meera Sharma",
    image: "/images/students/saraswathi.jpg",
    video: "https://www.youtube.com/shorts/_8gYUbWloZY",
    quote:
      "The unique way of teaching—where you explain instead of just listening—made me understand concepts deeply.",
  },
  {
    name: "Rohit Verma",
    image: "/images/students/ramesh.jpg",
    video: "https://www.youtube.com/shorts/L5TUz6Hv_SQ",
    quote:
      "I got my first freelance project thanks to Freshkite. The mock sessions really boosted my speaking skills.",
  },
  {
    name: "Priya Nair",
    image: "/images/students/Nishok.jpg",
    video: "https://www.youtube.com/shorts/TNn9oTPR7HY",
    quote:
      "Freshkite gave me the confidence to explain complex topics clearly. That helped me land my first teaching opportunity.",
  },
  {
    name: "Karan Singh",
    image: "/images/students/ramesh.jpg",
    video: "https://www.youtube.com/shorts/TNn9oTPR7HY",
    quote:
      "The daily Q&A format is amazing. It feels like a real interview environment every day.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">🌟 Testimonials</h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <Card className="shadow-lg bg-white/10 backdrop-blur-md border border-white/10 h-full">
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-indigo-500 shadow-lg"
                />
                <p className="italic text-gray-200 mb-6 flex-grow">“{t.quote}”</p>
                <h3 className="font-semibold text-lg text-indigo-300">{t.name}</h3>

                {/* Video Button placeholder */}
                <div className="mt-4">
                  {t.video ? (
                    <a
                      href={t.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition"
                    >
                      <FaPlayCircle className="text-xl" />
                      Watch Speech
                    </a>
                  ) : (
                    <div className="h-[40px]" /> // reserve space for cards without video
                  )}
                </div>
              </CardContent>
            </Card>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
