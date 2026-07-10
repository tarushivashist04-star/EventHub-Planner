import { Link } from "react-router-dom";

function EventCard({ event }) {
  const spotsLeft = Math.max(event.capacity - event.registered, 0);

  const percentage = Math.min(
    (event.registered / event.capacity) * 100,
    100
  );

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* EVENT IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* CATEGORY */}
        <span className="absolute left-4 top-4 rounded-full border border-[#FFA13D]/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#E56703] backdrop-blur-sm">
          {event.category}
        </span>

        {/* REGISTERED PEOPLE */}
        <span className="absolute bottom-3 right-3 rounded-lg bg-[#38340E]/90 px-3 py-1.5 text-sm font-medium text-white">
          👥 {event.registered}
        </span>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5">

        
        <h3 className="font-heading min-h-14 text-lg font-semibold leading-7 text-[#38340E]">
          {event.title}
        </h3>

        {/* EVENT DETAILS */}
        <div className="mt-4 space-y-2.5 text-sm text-[#6D6131]">
          <p className="flex items-start gap-2">
            <span>📅</span>
            <span>{event.displayDate}</span>
          </p>

          <p className="flex items-start gap-2">
            <span>🕒</span>
            <span>{event.time}</span>
          </p>

          <p className="flex items-start gap-2">
            <span>📍</span>
            <span className="line-clamp-1">
              {event.venue}
            </span>
          </p>
        </div>

        {/* REGISTRATION INFORMATION */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-[#6D6131]">
            <span>
              {event.registered} registered
            </span>

            <span>
              {spotsLeft === 0
                ? "Event Full"
                : `${spotsLeft} spots left`}
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F3E8D8]">
            <div
              className="h-full rounded-full bg-[#FFA13D]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-5 flex items-center justify-between border-t border-[#F3E8D8] pt-4">
          <p className="max-w-32 truncate text-xs text-[#6D6131]">
            {event.club}
          </p>

          <Link
            to={`/events/${event.id}`}
            className="rounded-lg bg-[#FFA13D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E56703]"
          >
            View Details
          </Link>
        </div>

      </div>
    </article>
  );
}

export default EventCard;