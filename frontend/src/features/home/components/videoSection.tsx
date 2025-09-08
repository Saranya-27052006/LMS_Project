"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLIFrameElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // video must be at least 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="flex items-center justify-center bg-black py-10">
      <iframe
        ref={videoRef}
        width="50%"
        height="500"
        src={`https://www.youtube.com/embed/mlxpz9kIYUY?${isVisible ? "autoplay=1&mute=1" : "autoplay=0&mute=1"
          }`}
        title="Demo Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        className="rounded-2xl shadow-lg"
      />
    </section>
  );
}
