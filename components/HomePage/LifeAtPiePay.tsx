"use client";
import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import { BackgroundImage } from "@mantine/core";
import Image from "next/image";

import group from "../../public/group.webp";

const LifeAtPiePay = () => {
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsXL(window.innerWidth >= 1280); // xl breakpoint ~1280px
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = [
    {
      icon: "https://cdn.lordicon.com/usdjfsai.json",
      title: "Who We Are",
      description:
        "Discover our mission, values, and the passionate team driving innovation in commerce and financial services.",
    },
    {
      icon: "https://cdn.lordicon.com/yueeicmf.json",
      title: "Diversity & Inclusion",
      description:
        "We celebrate diverse perspectives and foster an inclusive environment where everyone can thrive and contribute.",
    },
    {
      icon: "https://cdn.lordicon.com/mdhlfkta.json",
      title: "Join Us",
      description:
        "Explore exciting career opportunities and become part of our journey to transform financial experiences.",
    },
  ];

  return (
    <div className=" bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className=" text-2xl md:text-[28px] font-bold leading-normal  ">
            Life At <span className="text-[#6E6E73] ">PiePay</span>
          </h1>
          <p className="w-full   text-[#6E6E73]  text-base md:text-lg  font-normal leading-normal ">
            Learn more about the culture and people behind the commerce and
            financial services experiences that move our world
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {/* Card 1 - Who We Are */}
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col min-h-[320px]">
            <h2 className="text-[#1D1D1F]  text-2xl md:text-[28px] font-[500]   leading-normal">
              Who We Are
            </h2>
            <p className="text-[#6E6E73] text-base sm:text-lg  font-medium leading-normal">
              A purpose-driven, human company focused on our clients’ success.
            </p>
            <div className="flex justify-center mt-auto">
              <Icon
                src="https://cdn.lordicon.com/mzcapxae.json"
                trigger="loop"
                colors="primary:#121331,secondary:#35769f"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          </div>

          {/* Card 2 - Join Us */}
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col min-h-[320px]">
            <h2 className="text-[#1D1D1F]  text-2xl md:text-[28px] font-[500]  leading-normal">
              Join Us
            </h2>
            <p className="text-[#6E6E73] text-base sm:text-lg font-medium leading-normal">
              Join a global leader in commerce, fintech and payments.
            </p>

            <div className="flex justify-around flex-1 items-center gap-4 mt-4">
              {/* Company logos using Next.js Image */}
              <div className="relative w-20 h-20">
                <Image
                  src="/microsoft.png"
                  alt="Microsoft"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative w-20 h-20">
                <Image
                  src="/google.png"
                  alt="Google"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative w-20 h-20">
                <Image
                  src="/adidas.png"
                  alt="Adidas"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Card 3 - Diversity & Inclusion */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[320px]">
            <BackgroundImage
              src={group.src}
              radius="lg"
              classNames={{
                root: "relative !h-full p-6 md:p-8 lg:flex-1 rounded-2xl overflow-hidden",
              }}
            >
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-[#1D1D1F]  text-2xl md:text-[28px] font-medium leading-normal">
                  Diversity & Inclusion
                </h2>
                <p className="text-[#6E6E73] text-base sm:text-lg  font-medium leading-normal">
                  A place where our people are recognized as unique individuals
                  and celebrated as one team.
                </p>
              </div>
            </BackgroundImage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeAtPiePay;
