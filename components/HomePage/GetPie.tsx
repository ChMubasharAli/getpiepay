import Image from "next/image";
import { BackgroundImage, Button } from "@mantine/core";
import { usePathname } from "next/navigation";
import Icon from "../Icon";

import hadndCard from "../../public/handcard.webp";
import girls from "../../public/girls.png";

export default function Index() {
  const pathname = usePathname();
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
  return (
    <div className=" overflow-hidden bg-gray-50 justify-center  py-12 lg:py-24 container mx-auto p-2">
      <h1 className="text-2xl lg:text-[28px]   font-bold leading-normal  ">
        GetPie.io <span className="text-[#6E6E73] ">Partner Program</span>
      </h1>
      <p className="w-full   text-[#6E6E73]  text-base md:text-lg  font-medium leading-normal">
        Work with us and we pay you monthly for referrals! Refer when you want,
        and build a book of business.
      </p>

      <section className=" flex  flex-col lg:flex-row gap-4 mt-4">
        {/* left section  */}
        <div className="relative lg:w-1/2 h-[400px] bg-gradient-to-b from-[#012A4A] to-[#014F86] px-4 pt-4 pb-0  md:px-8 md:pt-8 rounded-2xl overflow-hidden flex flex-col">
          <div className="z-20">
            <h2 className="text-[#F8F9FA] text-2xl md:text-[28px] font-[500] leading-normal">
              Flexible Referrals
            </h2>
            <p className="text-[#F8F9FA] text-base sm:text-lg font-light leading-normal mb-3">
              Empower your growing business with seamless payment solutions that
              scale with you. From your first sale to your thousandth, we're
              here to support your journey.
            </p>
          </div>

          {/* This will take the remaining height */}
          <div className="flex-1 relative  flex justify-end  ">
            <Image
              src={girls} // your image path
              alt="Illustration"
              fill
              className="object-contain object-bottom  " // bottom aligned & maintain aspect ratio
            />
          </div>
        </div>

        {/* right section  */}
        <div className="flex flex-col gap-4 lg:w-1/2 ">
          {/* Monthly Payments Card */}
          <BackgroundImage
            src={hadndCard.src}
            radius="lg"
            classNames={{
              root: "relative p-6 md:p-8 min-h-[180px] !flex-1 rounded-2xl overflow-hidden",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-white  text-2xl md:text-[28px] font-[500] leading-normal">
                Monthly Payments
              </h2>
              <p className="text-white text-base sm:text-lg font-medium leading-normal">
                Earn consistent, reliable income from your referrals
              </p>
            </div>
          </BackgroundImage>

          {/* Build Your Book Card */}
          <div className="bg-white w-full flex-1 flex flex-col  md:flex-row justify-between shadow-md  rounded-2xl p-6 md:p-8 ">
            <div className=" ">
              <h2 className="text-[#1D1D1F]   text-2xl md:text-[28px] font-[500] ">
                Build Your Book
              </h2>
              <p className="text-[#6E6E73] text-base sm:text-lg  mb-3 font-medium ">
                Grow a sustainable business portfolio over time
              </p>
              <a
                className="
                font-outfit bg-[#01497C] text-white inline-block
              px-6 py-2 sm:px-8 sm:py-3
              rounded-md text-lg font-normal
              hover:bg-[#01497C]/80  transition-colors duration-300
              "
                href="#giving-back"
                onClick={(e) => handleScroll(e, "who-we-serve")}
              >
                See GetPie.io &gt;
              </a>
            </div>
            {/* Chart Icon */}
            <div className="flex mt-6 md:mt-0 justify-center  md:items-end  ">
              <Icon
                src="https://cdn.lordicon.com/ihkpbcjb.json"
                trigger="loop"
                colors="primary:#121331,secondary:#35769f"
                style={{ width: "130px", height: "130px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
