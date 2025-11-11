"use client";

import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  // Helper to smoothly scroll to a section
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#014F86] font-['Outfit'] scroll-smooth">
      {/* Main Footer Content */}
      <div className="container mx-auto px-2  pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 lg:gap-16 mb-12">
          {/* Company Info */}
          <div className=" space-y-6">
            <div>
              <h3 className="text-white text-2xl md:text-[28px] font-[500] mb-4">
                PiePay
              </h3>
              <p className="text-white/80 max-w-md text-base leading-relaxed">
                Empowering businesses with seamless payment solutions and
                financial services that scale with your ambitions.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="">
            <h4 className="text-white  text-2xl md:text-[28px] font-[500] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Hero", href: "#hero" },
                { name: "Who We Serve", href: "#who-we-serve" },
                { name: "GetPie.io", href: "#get-pie" },

                { name: "Giving Back", href: "#giving-back" },
                { name: "Apply Now", href: "#hero" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-white/80 hover:text-[#5B9FB8] transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="">
            <h4 className="text-white  text-2xl md:text-[28px] font-[500]  mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#5B9FB8] mt-0.5 flex-shrink-0" />
                <Link
                  href="mailto:hello@piepay.com"
                  className="text-white/80 hover:text-[#5B9FB8] transition-colors duration-200"
                >
                  info@gofreepay.net
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#5B9FB8] mt-0.5 flex-shrink-0" />
                <Link
                  href="tel:+1234567890"
                  className="text-white/80 hover:text-[#5B9FB8] transition-colors duration-200"
                >
                  +1 (234) 567-890
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5B9FB8] mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  123 Finance Street
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-white text-sm font-semibold mb-3">
                Follow Us
              </h5>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Facebook, label: "Facebook" },
                ].map(({ icon: Icon, label }) => (
                  <Link
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#5B9FB8] hover:border-[#5B9FB8] transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <p className="text-white/60 text-center">
            © {new Date().getFullYear()} PiePay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
