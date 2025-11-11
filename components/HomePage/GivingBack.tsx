export const GivingBack = () => {
  const videoLinks = [
    "https://www.youtube.com/embed/n4yFSNCqt7g?si=ibDMDqvmIHxlwY-S",
    "https://www.youtube.com/embed/X8g-ZgKOLxk?si=yoAZkRWMjZtnHElu",
    "https://www.youtube.com/embed/X3Jxb2a5zNU?si=7dH4wEWvboGMe7Kw",
  ];

  return (
    <section
      id="giving_back"
      className="bg-white py-12 sm:py-16 lg:py-24 font-outfit"
    >
      <div className="container mx-auto px-2 ">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-8">
          {/* Heading */}
          <h2 className=" text-2xl md:text-[28px] font-bold tracking-tight text-[#002855]">
            Giving <span className="text-[#6E6E73] ">Back</span>
          </h2>

          {/* Paragraph */}
          <p className="max-w-3xl text-base md:text-lg  text-[#6E6E73] font-medium leading-relaxed">
            Our Getpie.io merchant community is growing daily. We strive to save
            and help them make money!
          </p>

          {/* Button link */}
          <div>
            <a
              href="https://www.youtube.com/@GetPiePay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[18px] font-medium text-[#01497C] hover:text-[#01497C]/80 transition-colors"
            >
              See the impact
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14"
                  stroke="#118C4F"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 6l6 6-6 6"
                  stroke="#01497C"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Videos grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {videoLinks.map((src) => (
            <article
              key={src}
              className="group rounded-lg overflow-hidden border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md transform-gpu transition-all duration-400 hover:-translate-y-1"
            >
              <div className="p-3 sm:p-4">
                <div className="rounded-md overflow-hidden bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      src={src}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-[#118C4F] font-semibold">
                    GetPie Stories
                  </div>
                  <a
                    href="https://www.youtube.com/@GetPiePay"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#002855] font-medium hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
