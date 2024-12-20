"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import Image from "next/image";

type TProps = {
  images: string[];
};

export default function ProductGallery({ images }: TProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="">
      <div className="border-2  shadow-sm py-5 rounded-md">
        <Swiper
          spaceBetween={10}
          // navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((imageUrl, idx) => (
            <SwiperSlide key={idx}>
              {/* <div className="w-full h-[370px] object-fill"> */}
              <div className="relative w-full aspect-video">
                <Image
                  src={imageUrl}
                  alt="not-img"
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper  mt-4 w-64 float-start "
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-14 h-10">
              <Image
                src={imageUrl}
                alt="not-img"
                fill
                className="cursor-pointer "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
