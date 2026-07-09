import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import EventCarousel from "../components/EventCarousel";
import events from "../data/events";

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#38340E]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white">
        {/* SOFT ORANGE GLOW */}
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#FFA13D]/15 blur-[150px]" />

        <div className="relative mx-auto min-h-[620px] max-w-7xl px-6 py-20">

          {/* BADGE */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#FFA13D]/40 bg-[#FFA13D]/10 px-5 py-3 font-semibold tracking-wide text-[#E56703]">
            <span>★</span>
            CAMPUS&apos;S PREMIER EVENT CENTER
          </div>

          {/* HERO CONTENT */}
          <div className="max-w-4xl">
            <h1 className="font-heading text-5xl font-bold leading-[1.15] tracking-tight md:text-6xl">
              Your Campus.

              <span className="block text-[#FFA13D]">
                Your Events.
              </span>

              <span className="block">
                Your Experience.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6D6131]">
              Discover the best events happening on your campus,
              connect with your community, and create unforgettable
              memories.
            </p>

            {/* HERO BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/events"
                className="rounded-xl bg-[#FFA13D] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#FFA13D]/20 transition hover:bg-[#E56703]"
              >
                Explore Events →
              </Link>

              <Link
                to="/dashboard"
                className="rounded-xl border border-[#F3E8D8] bg-white px-7 py-3.5 font-semibold text-[#38340E] shadow-sm transition hover:border-[#FFA13D] hover:text-[#E56703]"
              >
                Host an Event
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ================= CAROUSEL SECTION ================= */}
      <EventCarousel />


      {/* ================= FEATURED EVENTS ================= */}
      <section className="border-t border-[#F3E8D8] bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADING */}
          <div className="mb-10">
            <p className="font-medium text-[#E56703]">
              DON&apos;T MISS OUT
            </p>

            <h2 className="font-heading mt-2 text-4xl font-bold text-[#38340E]">
              Featured Events
            </h2>

            <p className="mt-3 text-[#6D6131]">
              Discover exciting events happening across your campus.
            </p>
          </div>

          {/* SMALL EVENT CARDS */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className="w-full max-w-72"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <div className="mt-12 text-center">
            <Link
              to="/events"
              className="inline-block rounded-xl border border-[#FFA13D] px-7 py-3 font-semibold text-[#E56703] transition hover:bg-[#FFA13D] hover:text-white"
            >
              View All Events →
            </Link>
          </div>

        </div>
      </section>


      {/* ================= EXPLORE BY CATEGORY ================= */}
      <section className="border-t border-[#F3E8D8] bg-[#FFF9F2] px-6 py-20">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADING */}
          <div className="mb-10 text-center">
            <p className="font-medium text-[#E56703]">
              FIND YOUR INTEREST
            </p>

            <h2 className="font-heading mt-2 text-4xl font-bold text-[#38340E]">
              Explore by Category
            </h2>

            <p className="mt-3 text-[#6D6131]">
              Find events that match your interests.
            </p>
          </div>

          {/* CATEGORY CARDS */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* TECHNOLOGY */}
            <Link
              to="/events"
              className="rounded-2xl border border-[#F3E8D8] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFA13D] hover:shadow-lg"
            >
              <div className="text-4xl">
                💻
              </div>

              <h3 className="font-heading mt-4 text-xl font-semibold text-[#38340E]">
                Technology
              </h3>

              <p className="mt-2 text-sm text-[#6D6131]">
                Hackathons and tech events
              </p>
            </Link>


            {/* MUSIC */}
            <Link
              to="/events"
              className="rounded-2xl border border-[#F3E8D8] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFA13D] hover:shadow-lg"
            >
              <div className="text-4xl">
                🎵
              </div>

              <h3 className="font-heading mt-4 text-xl font-semibold text-[#38340E]">
                Music
              </h3>

              <p className="mt-2 text-sm text-[#6D6131]">
                Concerts and music festivals
              </p>
            </Link>


            {/* SPORTS */}
            <Link
              to="/events"
              className="rounded-2xl border border-[#F3E8D8] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFA13D] hover:shadow-lg"
            >
              <div className="text-4xl">
                🏆
              </div>

              <h3 className="font-heading mt-4 text-xl font-semibold text-[#38340E]">
                Sports
              </h3>

              <p className="mt-2 text-sm text-[#6D6131]">
                Matches and sports trials
              </p>
            </Link>


            {/* ARTS */}
            <Link
              to="/events"
              className="rounded-2xl border border-[#F3E8D8] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFA13D] hover:shadow-lg"
            >
              <div className="text-4xl">
                🎨
              </div>

              <h3 className="font-heading mt-4 text-xl font-semibold text-[#38340E]">
                Arts
              </h3>

              <p className="mt-2 text-sm text-[#6D6131]">
                Creative and cultural events
              </p>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;