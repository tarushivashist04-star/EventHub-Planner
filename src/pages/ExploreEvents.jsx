import { useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../components/EventCard";
import events from "../data/events";

function ExploreEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [club, setClub] = useState("All");
  const [sortBy, setSortBy] = useState("upcoming");

  // GET ORGANIZER EVENTS FROM LOCAL STORAGE
  const savedOrganizerEvents = JSON.parse(
    localStorage.getItem("eventhub-dashboard-events") || "[]"
  );

  // CONVERT ORGANIZER EVENTS TO EVENTCARD FORMAT
  const organizerEvents = savedOrganizerEvents.map((event) => ({
    ...event,

    // Keep a unique ID
    id: `organizer-${event.id}`,

    // Dashboard uses "seats"
    // EventCard uses "capacity"
    capacity: Number(event.seats || 0),

    // Dashboard uses "registrations"
    // EventCard uses "registered"
    registered: Number(event.registrations || 0),

    // EventCard needs displayDate
    displayDate: event.date
      ? new Date(`${event.date}T00:00:00`).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      : "",

    // EventCard needs one time field
    time:
      event.startTime && event.endTime
        ? `${event.startTime} - ${event.endTime}`
        : event.startTime || "",

    // Organizer name for filter and card
    club: "EventHub Organizer",
  }));

  // COMBINE NORMAL EVENTS + ORGANIZER EVENTS
  const allEvents = [...organizerEvents, ...events];

  const categories = [
    "All",
    ...new Set(allEvents.map((event) => event.category)),
  ];

  const clubs = [
    "All",
    ...new Set(allEvents.map((event) => event.club)),
  ];

  const filteredEvents = allEvents
    .filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.venue
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.club
          .toLowerCase()
          .includes(search.toLowerCase());

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
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.registered - a.registered;
      }

      return new Date(a.date) - new Date(b.date);
    });

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSelectedDate("");
    setClub("All");
    setSortBy("upcoming");
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] text-[#38340E]">

      {/* PAGE HEADER */}
      <section className="border-b border-[#F3E8D8] bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <p className="font-medium tracking-wide text-[#E56703]">
            DISCOVER YOUR NEXT EXPERIENCE
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold text-[#38340E] md:text-5xl">
            Explore Events
          </h1>

          <p className="mt-4 max-w-2xl text-[#6D6131]">
            Search, filter, and discover exciting events happening
            across your campus.
          </p>

        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="bg-white px-6 pb-10">
        <div className="mx-auto max-w-7xl">

          <div className="relative">
            <Search
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6D6131]"
            />

            <input
              type="text"
              placeholder="Search events, venues, or clubs..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-[#F3E8D8] bg-white py-4 pl-14 pr-5 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D] focus:ring-4 focus:ring-[#FFA13D]/10"
            />
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">

          {/* FILTER SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-sm lg:sticky lg:top-28">

            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-[#38340E]">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-[#E56703] transition hover:text-[#FFA13D]"
              >
                Clear
              </button>
            </div>

            {/* CATEGORY FILTER */}
            <div className="mt-7">
              <label className="font-heading text-sm font-semibold text-[#38340E]">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-sm text-[#38340E] outline-none transition focus:border-[#FFA13D] focus:ring-4 focus:ring-[#FFA13D]/10"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE FILTER */}
            <div className="mt-6">
              <label className="font-heading text-sm font-semibold text-[#38340E]">
                Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-sm text-[#38340E] outline-none transition focus:border-[#FFA13D] focus:ring-4 focus:ring-[#FFA13D]/10"
              />
            </div>

            {/* CLUB FILTER */}
            <div className="mt-6">
              <label className="font-heading text-sm font-semibold text-[#38340E]">
                Organizer / Club
              </label>

              <select
                value={club}
                onChange={(event) =>
                  setClub(event.target.value)
                }
                className="mt-3 w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-sm text-[#38340E] outline-none transition focus:border-[#FFA13D] focus:ring-4 focus:ring-[#FFA13D]/10"
              >
                {clubs.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* RESULT INFORMATION */}
            <div className="mt-7 rounded-xl bg-[#FFF9F2] p-4">
              <p className="text-sm leading-6 text-[#6D6131]">
                Showing{" "}
                <span className="font-semibold text-[#E56703]">
                  {filteredEvents.length}
                </span>{" "}
                matching events
              </p>
            </div>

          </aside>

          {/* EVENTS AREA */}
          <div>

            {/* RESULT COUNT + SORT */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="font-heading text-2xl font-bold text-[#38340E]">
                  Available Events
                </h2>

                <p className="mt-1 text-sm text-[#6D6131]">
                  {filteredEvents.length} events found
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-[#6D6131]">
                  Sort by
                </label>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-sm font-medium text-[#38340E] outline-none transition focus:border-[#FFA13D]"
                >
                  <option value="upcoming">
                    Upcoming First
                  </option>

                  <option value="popular">
                    Most Popular
                  </option>
                </select>
              </div>

            </div>

            {/* EVENT CARDS */}
            {filteredEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#F3E8D8] bg-white px-6 py-20 text-center shadow-sm">

                <Search
                  size={48}
                  className="mx-auto text-[#E56703]"
                />

                <h3 className="font-heading mt-5 text-2xl font-semibold text-[#38340E]">
                  No events found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-[#6D6131]">
                  Try changing your search or removing some filters
                  to discover more campus events.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 rounded-xl bg-[#FFA13D] px-6 py-3 font-semibold text-white transition hover:bg-[#E56703]"
                >
                  Clear All Filters
                </button>

              </div>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}

export default ExploreEvents;