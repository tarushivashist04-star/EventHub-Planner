import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import events from "../data/events";

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F19] text-white">

      {/* HOME HERO SECTION */}
      <section className="relative">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#FF8A3D]/10 blur-[150px]" />

        <div className="relative mx-auto min-h-[650px] max-w-7xl px-6 py-20">

          {/* BADGE */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#FF8A3D]/40 bg-[#FF8A3D]/10 px-5 py-3 font-bold tracking-wide text-[#FFA15F]">
            <span>★</span>
            CAMPUS&apos;S PREMIER EVENT CENTER
          </div>

          {/* HERO CONTENT */}
          <div className="max-w-4xl">
            <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight md:text-6xl">
              Your Campus.

              <span className="block text-[#FF8A3D]">
                Your Events.
              </span>

              <span className="block">
                Your Experience.
              </span>
            </h1>

       <p className="mt-7 max-w-2xl text-lg leading-8 text-[#94A3B8]">
              Discover the best events happening on your campus,
              connect with your community, and create unforgettable
              memories.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/events"
                className="rounded-xl bg-[#FF8A3D] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#FF8A3D]/20 hover:bg-[#FFA15F]"
              >
                Explore Events →
              </Link>

          <Link
                to="/dashboard"
                className="rounded-xl border border-[#293548] bg-[#131A2A] px-7 py-3.5 font-bold text-white hover:border-[#FF8A3D] hover:text-[#FF8A3D]"
              >
                Host an Event
          </Link>
          </div>
          </div>
        </div>
           </section>

      {/* FEATURED EVENTS SECTION */}
      <section className="border-t border-[#293548] bg-[#0B0F19] px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="font-semibold text-[#FF8A3D]">
              DON&apos;T MISS OUT
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              Featured Events
            </h2>

            <p className="mt-3 text-[#94A3B8]">
              Discover exciting events happening across your campus.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/events"
              className="inline-block rounded-xl border border-[#FF8A3D] px-7 py-3 font-bold text-[#FF8A3D] hover:bg-[#FF8A3D] hover:text-white"
            >
              View All Events →
            </Link>
          </div>

        </div>
      </section>
      {/* EXPLORE BY CATEGORY SECTION */}
<section className="border-t border-[#293548] bg-[#0E1420] px-6 py-20">
     <div className="mx-auto max-w-7xl">

  <div className="mb-10 text-center">
      <p className="font-semibold text-[#FF8A3D]">
        FIND YOUR INTEREST
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        Explore by Category
      </h2>

      <p className="mt-3 text-[#94A3B8]">
        Find events that match your interests.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      <Link
        to="/events"
        className="rounded-2xl border border-[#293548] bg-[#131A2A] p-7 text-center transition hover:-translate-y-1 hover:border-[#FF8A3D]"
      >
        <div className="text-4xl">💻</div>
        <h3 className="mt-4 text-xl font-bold">Technology</h3>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Hackathons and tech events
        </p>
      </Link>

      <Link
        to="/events"
        className="rounded-2xl border border-[#293548] bg-[#131A2A] p-7 text-center transition hover:-translate-y-1 hover:border-[#FF8A3D]"
      >
        <div className="text-4xl">🎵</div>
        <h3 className="mt-4 text-xl font-bold">Music</h3>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Concerts and music festivals
        </p>
      </Link>

      <Link
        to="/events"
        className="rounded-2xl border border-[#293548] bg-[#131A2A] p-7 text-center transition hover:-translate-y-1 hover:border-[#FF8A3D]"
      >
        <div className="text-4xl">🏆</div>
        <h3 className="mt-4 text-xl font-bold">Sports</h3>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Matches and sports trials
        </p>
      </Link>

      <Link
        to="/events"
        className="rounded-2xl border border-[#293548] bg-[#131A2A] p-7 text-center transition hover:-translate-y-1 hover:border-[#FF8A3D]"
      >
        <div className="text-4xl">🎨</div>
        <h3 className="mt-4 text-xl font-bold">Arts</h3>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Creative and cultural events
        </p>
      </Link>

    </div>
  </div>
</section>


{/* WHY EVENTHUB SECTION */}
<section className="border-t border-[#293548] bg-[#0B0F19] px-6 py-20">
  <div className="mx-auto max-w-7xl">

    <div className="mb-12 text-center">
      <p className="font-semibold text-[#FF8A3D]">
        EVERYTHING IN ONE PLACE
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        Why Choose EventHub?
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-[#94A3B8]">
        Discover, register, and manage your campus events with one
        simple platform.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl border border-[#293548] bg-[#131A2A] p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF8A3D]/10 text-3xl">
          🔍
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Discover Events
        </h3>

        <p className="mt-3 leading-7 text-[#94A3B8]">
          Search and filter events by category, date, venue, and
          organizer.
        </p>
      </div>

      <div className="rounded-2xl border border-[#293548] bg-[#131A2A] p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF8A3D]/10 text-3xl">
          🎟️
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Easy Registration
        </h3>

        <p className="mt-3 leading-7 text-[#94A3B8]">
          Register for events and receive your confirmation and
          digital QR ticket.
        </p>
      </div>

      <div className="rounded-2xl border border-[#293548] bg-[#131A2A] p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF8A3D]/10 text-3xl">
          📊
        </div>

        <h3 className="mt-6 text-xl font-bold">
          Organizer Dashboard
        </h3>

        <p className="mt-3 leading-7 text-[#94A3B8]">
          Create, edit, delete, and manage registrations for your
          college events.
        </p>
      </div>

    </div>
  </div>
</section>

    </main>
  );
}

export default Home;