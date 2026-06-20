"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full">
        <div className="relative mb-6 select-none">
          <p className="text-[10rem] sm:text-[13rem] font-extrabold text-teal-900/10 leading-none">404</p>
          <p className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl font-extrabold text-teal-800 leading-none">
            404
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center shadow-inner">
            <svg className="w-8 h-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Redirecting to home in{" "}
          <span className="font-bold text-teal-700">{count}</span> seconds…
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#0E4541] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-teal-900 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/services"
            className="border border-teal-700 text-teal-900 font-medium px-8 py-3 rounded-full hover:bg-teal-50 transition-all duration-300"
          >
            Browse Services
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400 uppercase tracking-widest">
          HomeSewa · Kathmandu, Nepal
        </p>
      </div>
    </div>
  );
}
