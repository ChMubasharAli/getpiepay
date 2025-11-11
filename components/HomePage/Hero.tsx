import Image from "next/image";
import { usePathname } from "next/navigation";
import HeroImg from "../../public/Hero.webp";

export default function Hero() {
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
    <section
      className="
        relative flex items-center
        h-[750px] 3xl:h-[780px] min-h-[600px]
        px-6
        sm:px-8
        md:px-12
        lg:px-20
        xl:px-28
        2xl:px-[144px] 
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Optional overlay for text clarity */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container  py-10 z-10 mx-auto w-full">
        <div className="max-w-4xl text-left">
          <h1
            className="
              font-outfit font-bold uppercase leading-tight mb-6
              text-2xl xs:text-3xl sm:text-4xl md:text-5xl 
            "
          >
            <span className="text-[#F8F9FA]">Moving </span>
            <span className="text-[#F8F9FA]">
              Commerce, Financial Services, The World
            </span>
          </h1>

          <p
            className="
              font-outfit text-white leading-relaxed mb-8
              text-sm xs:text-base sm:text-lg md:text-lg
              max-w-[800px] mx-auto md:mx-0
            "
          >
            Every moment, Pie Pay brings people, businesses, and financial
            institutions closer together through innovative payment and
            financial services technology. With Pie Pay, the world becomes more
            accessible, and financial dreams become a reality.
          </p>

          <a
            className="
              font-outfit bg-[#01497C] text-white
              px-6 py-2 sm:px-8 sm:py-3
              rounded-md text-lg font-normal
              hover:bg-[#01497C]/80  transition-colors duration-300
            "
            href="#who-we-serve"
            onClick={(e) => handleScroll(e, "who-we-serve")}
          >
            See How We Help
          </a>
        </div>
      </div>
    </section>
  );
}
