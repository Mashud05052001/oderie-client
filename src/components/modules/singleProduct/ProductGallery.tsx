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
    <div className="w-80">
      <div className="border-[1px] shadow-sm p-2 rounded-md">
        <Swiper
          loop={true}
          spaceBetween={10}
          // navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((imageUrl, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={imageUrl}
                alt="not-img"
                width={300}
                height={300}
                className="rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={6}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper  mt-4 w-52 float-start"
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={imageUrl}
              alt="not-img"
              width={400}
              height={400}
              className="cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
