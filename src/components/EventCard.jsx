import { Link } from "react-router-dom";

function EventCard({ event }) {
  const spotsLeft = event.capacity - event.registered;
  const percentage = (event.registered / event.capacity) * 100;

  return (
    <article className="overflow-hidden rounded-3xl border border-[#293548] bg-[#131A2A] transition duration-300 hover:-translate-y-1 hover:border-[#FF8A3D]/60">

      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <span className="absolute left-4 top-4 rounded-full border border-[#FF8A3D]/40 bg-[#0B0F19]/90 px-4 py-2 text-sm font-bold text-[#FF8A3D]">
          {event.category}
        </span>

        <span className="absolute bottom-4 right-4 rounded-xl bg-[#0B0F19]/90 px-3 py-2 text-sm text-white">
          👥 {event.registered}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-white">
          {event.title}
        </h2>

        <div className="mt-5 space-y-3 text-[#94A3B8]">
          <p>📅 {event.displayDate}</p>
          <p>🕒 {event.time}</p>
          <p>📍 {event.venue}</p>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-[#94A3B8]">
            <span>{event.registered} registered</span>
            <span>{spotsLeft} spots left</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#293548]">
            <div
              className="h-full rounded-full bg-[#FF8A3D]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#293548] pt-5">
          <p className="text-sm text-[#94A3B8]">
            {event.club}
          </p>

          <Link
            to={`/events/${event.id}`}
            className="rounded-xl bg-[#FF8A3D] px-5 py-3 font-bold text-white hover:bg-[#FFA15F]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;