"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type HeroSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  primaryBtn: string;
  secondaryBtn: string;
};

type SliderProps = {
  slides: HeroSlide[];
};

export default function Slider({ slides }: SliderProps) {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="home-hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[420px] overflow-hidden rounded-none md:h-[520px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-green-600/70" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-[92%] max-w-[1280px]">
                  <div className="max-w-[420px] text-white">
                    <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                      {slide.title}
                    </h2>

                    <p className="mt-4 text-lg md:text-2xl">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <button className="rounded-xl bg-white px-6 py-3 text-base font-semibold text-green-600 transition hover:bg-gray-100">
                        {slide.primaryBtn}
                      </button>

                      <button className="rounded-xl border border-white bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-green-600">
                        {slide.secondaryBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}