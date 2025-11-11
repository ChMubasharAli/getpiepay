"use client";
import { usePathname } from "next/navigation";

import { useState } from "react";

const WhoWeServe = () => {
  const slides = [
    {
      title: "Small Businesses",
      text: "Empower your growing business with seamless payment solutions that scale with you. From your first sale to your thousandth, we're here to support your journey.",
    },
    {
      title: "Financial Institutions",
      text: "Partner with Pie Pay to streamline operations, improve customer engagement, and modernize your payment infrastructure for the digital age.",
    },
    {
      title: "Enterprises",
      text: "Unlock the power of integrated financial services designed for scale. We help enterprises connect, transact, and grow efficiently across borders.",
    },
  ];
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [current, setCurrent] = useState(0);
  const pathname = usePathname();

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div
      className="
        overflow-hidden flex items-center justify-center h-auto py-12 sm:py-16 lg:pt-28   font-outfit bg-gray-50 "
    >
      <div className="grid grid-cols-1 h-full lg:grid-cols-2  gap-4 lg:gap-8 w-full container mx-auto px-2">
        {/* Left Content */}

        <div className="flex flex-col justify-center   space-y-3 text-center lg:text-left">
          <h1 className="text-2xl text-[28px] font-bold text-[#051923] leading-tight">
            Who <span className="text-[#6E6E73] ">We Serve</span>
          </h1>
          <p className="text-base text-left tracking-wide sm:text-lg 2xl:text-[20px] text-[#6E6E73] font-medium leading-relaxed">
            Growing your business in a rapidly changing world demands knowledge,
            persistence, and unwavering determination. Partnering with a trusted
            ally can transform your journey, offering invaluable support and
            expertise.
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              className="
              font-outfit bg-[#01497C] text-white
              px-6 py-2 sm:px-8 sm:py-3
              rounded-md text-lg font-normal
              hover:bg-[#01497C]/80  transition-colors duration-300
            "
              href="#giving-back"
              onClick={(e) => handleScroll(e, "giving-back")}
            >
              See Who We Help &gt;
            </a>
          </div>
        </div>

        {/* Right Card - Carousel */}

        <div
          className="
            relative flex flex-col text-white justify-center items-center 
            bg-[#013A63] rounded-2xl h-[290px]
            px-6 sm:px-8 md:px-10 lg:px-14 py-8 sm:py-10  
            w-full max-w-2xl  shadow-lg 
            transition-all duration-500
          "
        >
          <div>
            <div className="text-center space-y-1 mb-6">
              <h3 className="font-medium text-2xl lg:text-[28px] ">
                {slides[current].title}
              </h3>
              <p className="text-base md:text-lg   font-medium leading-relaxed text-white/95">
                {slides[current].text}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={prevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border-2 border-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-lg sm:text-xl"
                aria-label="Previous"
              >
                &lt;
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                      i === current
                        ? "bg-[#61A5C2] w-8"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border-2 border-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-lg sm:text-xl"
                aria-label="Next"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeServe;
