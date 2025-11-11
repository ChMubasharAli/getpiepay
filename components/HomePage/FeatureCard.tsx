import Image from "next/image";
import React from "react";
import Icon from "../Icon";

type Props = {
  title: string;
  subtitle: string;
  imgUrl: string;
};

export default function FeatureCard({ title, subtitle, imgUrl }: Props) {
  return (
    <div className="flex items-start gap-4 max-w-300 rounded-xl bg-[#FFFFFF] shadow-md p-4">
      <div className="w-14 h-14 relative flex items-center justify-center bg-[#FFFFFF]  rounded-2xl flex-shrink-0">
        <Icon
          src={imgUrl}
          trigger="loop"
          colors="primary:#004400,secondary:#4db91d"
          style={{ width: "150px", height: "150px" }}
        />
      </div>

      <div className="flex flex-col">
        <div className="text-[#1D1D1F] font-semibold text-lg">{title}</div>
        <div className="text-[#6E6E73] text-base font-medium">{subtitle}</div>
      </div>
    </div>
  );
}
