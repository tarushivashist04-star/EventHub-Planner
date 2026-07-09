import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "rounded-xl border border-[#FFA13D]/40 bg-[#FFA13D]/10 px-5 py-3 font-medium text-[#E56703]"
      : "px-5 py-3 font-medium text-[#38340E] transition hover:text-[#E56703]";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#F3E8D8] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link
          to="/"
          className="font-heading text-2xl font-bold text-[#38340E]"
        >
          Event<span className="text-[#FFA13D]">Hub</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Explore Events
          </NavLink>

          <NavLink to="/past-events" className={navLinkClass}>
            Past Events
          </NavLink>

          <NavLink
            to="/organizer-login"
            className={navLinkClass}
          >
            Create Event
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-[#F3E8D8] px-6 py-3 font-semibold text-[#38340E] transition hover:border-[#FFA13D] hover:text-[#E56703]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-[#FFA13D] px-6 py-3 font-semibold text-white transition hover:bg-[#E56703]"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;