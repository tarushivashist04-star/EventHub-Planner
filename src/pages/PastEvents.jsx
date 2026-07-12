import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";

import pastEvents from "../data/pastEvents";

function PastEvents() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
//categories used to cret category button
//to view all events
  const categories = [
    "All",
    //.. remove duplicacy
    ...new Set(
      pastEvents.map((event) => event.category)
    ),
  ];

  const filteredEvents =
    selectedCategory === "All"
      ? pastEvents
      : pastEvents.filter(
          (event) =>
            event.category === selectedCategory
        );

  return (
    <main className="min-h-screen bg-[#FFF9F2] text-[#38340E]">

      {/* PAGE HEADER */}
      <section className="border-b border-[#F3E8D8] bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <p className="font-medium tracking-wide text-[#E56703]">
            CAMPUS MEMORIES
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold md:text-5xl">
            Past Events
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#6D6131]">
            Look back at memorable events, exciting
            moments, and experiences shared by our
            campus community.
          </p>

        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="border-b border-[#F3E8D8] bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "rounded-full bg-[#FFA13D] px-5 py-2.5 font-medium text-white"
                  : "rounded-full border border-[#F3E8D8] bg-white px-5 py-2.5 font-medium text-[#6D6131] transition hover:border-[#FFA13D] hover:text-[#E56703]"
              }
            >
              {category}
            </button>
          ))}

        </div>
      </section>

      {/* PAST EVENTS GALLERY */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="font-medium text-[#E56703]">
              EVENT HIGHLIGHTS
            </p>

            <h2 className="font-heading mt-2 text-3xl font-bold">
              Moments Worth Remembering
            </h2>

            <p className="mt-3 text-[#6D6131]">
              {filteredEvents.length} past events
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* EVENT IMAGE */}
                <div className="relative overflow-hidden">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#E56703] backdrop-blur-sm">
                    {event.category}
                  </span>

                </div>

                {/* EVENT CONTENT */}
                <div className="p-6">

                  <h3 className="font-heading text-xl font-bold">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-[#6D6131]">

                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {event.displayDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} />
                      {event.venue}
                    </p>

                  </div>

                  <p className="mt-5 leading-7 text-[#6D6131]">
                    {event.description}
                  </p>

                  {/* EVENT HIGHLIGHT */}
                  <div className="mt-5 rounded-xl bg-[#FFF9F2] p-4">

                    <div className="flex gap-3">

                      <Sparkles
                        size={20}
                        className="mt-0.5 shrink-0 text-[#E56703]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#38340E]">
                          Event Highlight
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#6D6131]">
                          {event.highlight}
                        </p>
                      </div>

                    </div>

                  </div>

                  <p className="mt-5 border-t border-[#F3E8D8] pt-4 text-sm font-medium text-[#E56703]">
                    Organized by {event.club}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}

export default PastEvents;