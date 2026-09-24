"use client";

import { useEffect, useState } from "react";

export default function StartupLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-[#faf7ff]">
      <img
        src="/shoply_clothes_infinity_loader.gif"
        alt="Shoply loading"
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-sm font-medium text-gray-600">
          Loading your shopping experience...
        </p>
      </div>
    </div>
  );
}