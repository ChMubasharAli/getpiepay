import React from "react";
import Image from "next/image";
import FeatureCard from "@/components/HomePage/FeatureCard";

export default function Hero() {
  const features = [
    {
      title: "Seamless Payments",
      subtitle: "Accept all payment types with ease and security",
      imageUrl: "https://cdn.lordicon.com/lnpwcryl.json",
    },
    {
      title: "Robust Analytics",
      subtitle: "Track performance with real-time insights and reporting",
      imageUrl: "https://cdn.lordicon.com/jowpmocr.json",
    },
    {
      title: "Customizable Features",
      subtitle: "Tailor the platform to your unique business needs",
      imageUrl: "https://cdn.lordicon.com/orbjywpi.json",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-20 font-outfit overflow-hidden">
      <div className=" container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 px-2 ">
        <div className=" ">
          <div className="rounded-2xl overflow-hidden ">
            <Image
              src="/clover.webp" // 🔹 Add your image URL here later
              alt="clover composite"
              width={820}
              height={920}
              className="w-full "
            />
          </div>
        </div>

        <div className="space-y-4">
          <span className="inline-flex items-center px-5 py-2 rounded-full border-2 border-[#004400] text-[#004400] font-semibold text-sm uppercase">
            All In One Platform
          </span>

          <div className="flex items-center gap-4">
            <svg
              width="50"
              height="51"
              viewBox="0 0 50 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
              aria-hidden
            >
              <mask
                id="mask0"
                maskUnits="userSpaceOnUse"
                x="0"
                y="1"
                width="50"
                height="49"
              >
                <path d="M50 1.28564H0V49.2856H50V1.28564Z" fill="white" />
              </mask>
              <g mask="url(#mask0)">
                <path
                  d="M23.3583 12.4976C23.3583 6.3099 18.1269 1.28564 11.6767 1.28564C5.22794 1.28564 0 6.30352 0 12.4912C0 18.6789 5.22783 23.7096 11.6795 23.7096H23.3583V12.4976Z"
                  fill="#004400"
                />
                <path
                  d="M26.6418 12.4976C26.6418 6.3099 31.8733 1.28564 38.3235 1.28564C44.7723 1.28564 50.0002 6.30352 50.0002 12.4913C50.0002 18.6789 44.7723 23.7096 38.3206 23.7096H26.6418V12.4976Z"
                  fill="#004400"
                />
                <path
                  d="M26.6418 38.0736C26.6418 44.2674 31.8718 49.2856 38.3246 49.2856C44.7702 49.2856 50.0002 44.271 50.0002 38.0772C50.0002 31.8894 44.7702 26.8616 38.3204 26.8616H26.6418V38.0736Z"
                  fill="#004400"
                />
                <path
                  d="M23.3583 38.0736C23.3583 44.2674 18.1284 49.2856 11.6756 49.2856C5.22998 49.2856 0 44.271 0 38.0772C0 31.8894 5.22988 26.8616 11.6796 26.8616H23.3583V38.0736ZM11.6756 46.124C16.3109 46.124 20.082 42.5142 20.082 38.0772V30.0086H11.6863C7.04892 30.0086 3.2759 33.6422 3.2759 38.0772C3.2759 42.5142 7.04385 46.124 11.6756 46.124Z"
                  fill="#004400"
                />
              </g>
            </svg>

            <h1 className="text-[#004400] text-2xl text-[28px] font-bold tracking-tight">
              Clover Platform
            </h1>
          </div>

          <p className="text-[#6E6E73] text-base md:text-lg  font-medium">
            Empower your growing business with seamless payment solutions that
            scale with you. From your first sale to your thousandth, we're here
            to support your journey.
          </p>

          <div className="flex flex-col space-y-4 ">
            {features.map((f, i) => (
              <FeatureCard
                key={i}
                title={f.title}
                subtitle={f.subtitle}
                imgUrl={f.imageUrl}
              />
            ))}
          </div>

          <div>
            <a
              href="https://www.clover.com/" // ← replace with your real URL
              target="_blank"
              rel="noopener noreferrer"
              className="
              font-outfit bg-[#004400] inline-block text-white
              px-6 py-2 sm:px-8 sm:py-3
              rounded-md text-lg font-normal
              hover:bg-[#004400]/80  transition-colors duration-300
            "
            >
              See Clover &gt;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
