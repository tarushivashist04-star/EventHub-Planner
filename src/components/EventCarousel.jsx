import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import events from "../data/events";

function EventCarousel() {
  return (
    <section className="border-y border-[#F3E8D8] bg-[#FFF9F2] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="mb-10 text-center">
          <p className="font-medium tracking-wide text-[#E56703]">
            WHAT&apos;S HAPPENING
          </p>

          <h2 className="font-heading mt-2 text-4xl font-bold text-[#38340E]">
            Trending on Campus
          </h2>

          <p className="mt-3 text-[#6D6131]">
            Explore the events students are excited about.
          </p>
        </div>

        {/* SWIPER CAROUSEL */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={events.length > 3}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >

          {events.map((event) => (
            <SwiperSlide key={event.id}>

              <Link
                to={`/events/${event.id}`}
                className="group block overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* CATEGORY */}
                  <span className="absolute left-4 top-4 rounded-full border border-[#FFA13D]/40 bg-white/90 px-4 py-2 text-sm font-semibold text-[#E56703] backdrop-blur-sm">
                    {event.category}
                  </span>

                  {/* REGISTERED */}
                  <span className="absolute bottom-4 right-4 rounded-lg bg-[#38340E]/90 px-3 py-2 text-sm font-medium text-white">
                    👥 {event.registered}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-[#38340E]">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#6D6131]">
                    📅 {event.displayDate}
                  </p>

                  <p className="mt-2 truncate text-sm text-[#6D6131]">
                    📍 {event.venue}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#F3E8D8] pt-4">
                    <span className="text-sm text-[#6D6131]">
                      {event.club}
                    </span>

                    <span className="font-semibold text-[#E56703] transition group-hover:translate-x-1">
                      View →
                    </span>
                  </div>
                </div>

              </Link>

            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  );
}

export default EventCarousel;