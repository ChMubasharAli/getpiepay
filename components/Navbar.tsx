"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handles internal scrolling to sections
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
    setMenuOpen(false);
  };

  // Email for Careers link (still opens email app)
  const emailAddress = "info@gofreepay.net";

  return (
    <nav className="w-full max-w-[1920px] mx-auto flex items-center h-[73px] bg-white px-5 sm:px-8 md:px-12 lg:px-[144px] relative font-outfit">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={173}
            height={53}
            className="w-[130px] xs:w-[140px] sm:w-[150px] md:w-[160px] lg:w-[173px] h-auto"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center justify-between text-gray-900 gap-6 xl:gap-10 h-[53px]">
          <a
            href="#who-we-serve"
            onClick={(e) => handleScroll(e, "who-we-serve")}
            className="transition hover:text-[#49AA43]"
          >
            Who We Serve
          </a>
          <a
            href="#get-pie"
            onClick={(e) => handleScroll(e, "get-pie")}
            className="transition hover:text-[#49AA43]"
          >
            GetPie.io
          </a>
          <a
            href="#life-at-piepay"
            onClick={(e) => handleScroll(e, "life-at-piepay")}
            className="hover:text-[#49AA43] transition"
          >
            Life at PiePay
          </a>
          <a
            href="#giving-back"
            onClick={(e) => handleScroll(e, "giving-back")}
            className="hover:text-[#49AA43] transition"
          >
            Giving Back
          </a>

          {/* Careers (styled like other nav items, still mailto link) */}
          <a
            href={`mailto:${emailAddress}`}
            className="hover:text-[#49AA43] transition"
          >
            Careers
          </a>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              (
                window as unknown as { openApplyNowModal?: () => void }
              ).openApplyNowModal?.();
            }}
            className="flex items-center justify-center px-4 py-2 text-white bg-[#01497C] rounded-md hover:bg-[#01497C]/80 transition"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-white shadow-md border-t border-gray-100 flex flex-col items-start gap-5 px-5 sm:px-8 md:px-12 py-6 text-gray-900 text-base lg:hidden z-50 animate-slideDown">
          <a
            href="#who-we-serve"
            onClick={(e) => handleScroll(e, "who-we-serve")}
          >
            Who We Serve
          </a>
          <a href="#get-pie" onClick={(e) => handleScroll(e, "get-pie")}>
            GetPie.io
          </a>
          <a
            href="#life-at-piepay"
            onClick={(e) => handleScroll(e, "life-at-piepay")}
          >
            Life at PiePay
          </a>
          <a
            href="#giving-back"
            onClick={(e) => handleScroll(e, "giving-back")}
          >
            Giving Back
          </a>

          {/* Careers (Mobile, styled like normal links, opens mail app) */}
          <a
            href={`mailto:${emailAddress}`}
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#49AA43] transition"
          >
            Careers
          </a>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              (
                window as unknown as { openApplyNowModal?: () => void }
              ).openApplyNowModal?.();
            }}
            className="flex items-center w-full justify-center py-3 text-white bg-[#01497C] rounded-md hover:bg-[#01497C]/80 transition"
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
