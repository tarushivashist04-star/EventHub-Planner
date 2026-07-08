import { useState } from "react";
import EventCard from "../components/EventCard";
import events from "../data/events";

function ExploreEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [club, setClub] = useState("All");
  const [sortBy, setSortBy] = useState("upcoming");

  const categories = [
    "All",
    "Technology",
    "Music",
    "Arts",
    "Business",
    "Sports",
    "Workshop",
    "Competition",
    "Trials",
  ];

  const clubs = [...new Set(events.map((event) => event.club))];

  let filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.club.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || event.category === category;

    const matchesDate =
      selectedDate === "" || event.date === selectedDate;

    const matchesClub =
      club === "All" || event.club === club;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate &&
      matchesClub
    );
  });

  filteredEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "upcoming") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortBy === "popular") {
      return b.registered - a.registered;
    }

    return 0;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSelectedDate("");
    setClub("All");
    setSortBy("upcoming");
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-12 text-white">
      <div className="mx-auto max-w-375">

        {/* PAGE HEADING */}
        <div className="mb-8">
          <p className="font-bold text-[#FF8A3D]">
            DISCOVER YOUR CAMPUS
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Explore Events
          </h1>

          <p className="mt-3 text-[#94A3B8]">
            Search and filter events by category, date, and club.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍  Search events, clubs, venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#293548] bg-[#131A2A] px-6 py-5 text-lg text-white outline-none placeholder:text-[#64748B] focus:border-[#FF8A3D]"
          />
        </div>

        {/* FILTER + EVENTS */}
        <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* LEFT FILTER SIDEBAR */}
          <aside className="rounded-3xl border border-[#293548] bg-[#131A2A] p-6 lg:sticky lg:top-28">

            <h2 className="text-2xl font-bold text-[#FF8A3D]">
              ⚙ Filters
            </h2>

            {/* SORT */}
            <div className="mt-8">
              <label className="font-bold text-[#CBD5E1]">
                SORT BY
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-3 w-full rounded-xl border border-[#293548] bg-[#0B0F19] p-4 text-white outline-none focus:border-[#FF8A3D]"
              >
                <option value="upcoming">Upcoming First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div className="mt-8">
              <p className="font-bold text-[#CBD5E1]">
                CATEGORY
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={
                      category === item
                        ? "rounded-lg bg-[#FF8A3D] px-3 py-2 text-sm font-semibold text-white"
                        : "rounded-lg border border-[#293548] bg-[#0B0F19] px-3 py-2 text-sm text-[#CBD5E1] hover:border-[#FF8A3D] hover:text-[#FF8A3D]"
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* DATE */}
            <div className="mt-8">
              <label className="font-bold text-[#CBD5E1]">
                EVENT DATE
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-3 w-full rounded-xl border border-[#293548] bg-[#0B0F19] p-4 text-white outline-none focus:border-[#FF8A3D]"
              />
            </div>

            {/* CLUB */}
            <div className="mt-8">
              <label className="font-bold text-[#CBD5E1]">
                CLUB / ORGANIZER
              </label>

              <select
                value={club}
                onChange={(e) => setClub(e.target.value)}
                className="mt-3 w-full rounded-xl border border-[#293548] bg-[#0B0F19] p-4 text-white outline-none focus:border-[#FF8A3D]"
              >
                <option value="All">All Clubs</option>

                {clubs.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* RESULTS COUNT */}
            <div className="mt-8 border-t border-[#293548] pt-6 text-center">
              <span className="text-xl font-bold text-[#FF8A3D]">
                {filteredEvents.length}
              </span>

              <span className="ml-2 text-[#94A3B8]">
                events found
              </span>
            </div>

            {/* CLEAR BUTTON */}
            <button
              onClick={clearFilters}
              className="mt-6 w-full rounded-xl border border-[#FF8A3D] py-3 font-bold text-[#FF8A3D] transition hover:bg-[#FF8A3D] hover:text-white"
            >
              Clear Filters
            </button>
          </aside>

          {/* RIGHT SIDE EVENTS */}
          <section className="min-w-0">
            <p className="mb-5 text-[#94A3B8]">
              Showing{" "}
              <span className="font-bold text-[#FF8A3D]">
                {filteredEvents.length}
              </span>{" "}
              events
            </p>

            {filteredEvents.length > 0 ? (
              <div className="grid gap-6 xl:grid-cols-2">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#293548] bg-[#131A2A] p-16 text-center">
                <h2 className="text-2xl font-bold">
                  No events found
                </h2>

                <p className="mt-3 text-[#94A3B8]">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-[#FF8A3D] px-6 py-3 font-bold text-white hover:bg-[#FFA15F]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}

export default ExploreEvents;