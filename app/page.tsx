"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/HomePage/Hero";
import WhoWeServe from "@/components/HomePage/WhoWeServe";
import CloverPlatform from "@/components/HomePage/CloverPlatform";
import GetPie from "@/components/HomePage/GetPie";
import LifeAtPiePay from "@/components/HomePage/LifeAtPiePay";
import Footer from "@/components/Footer";
import { GivingBack } from "@/components/HomePage/GivingBack";
import ApplyNowModal from "@/components/ApplyNowModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Allow Navbar to trigger modal open
    (window as unknown as { openApplyNowModal: () => void }).openApplyNowModal =
      () => setShowModal(true);
  }, []);

  return (
    <main className=" bg-gray-50">
      <section id="hero">
        <Hero />
      </section>

      <section id="who-we-serve">
        <WhoWeServe />
      </section>

      <section id="clover-platform">
        <CloverPlatform />
      </section>

      <section id="get-pie">
        <GetPie />
      </section>

      <section id="life-at-piepay">
        <LifeAtPiePay />
      </section>

      <section id="giving-back">
        <GivingBack />
      </section>

      <Footer />

      {showModal && <ApplyNowModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
