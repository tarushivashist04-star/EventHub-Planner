import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "rounded-xl border border-[#FF8A3D]/40 bg-[#FF8A3D]/10 px-5 py-3 font-semibold text-[#FF8A3D]"
      : "px-5 py-3 font-semibold text-[#CBD5E1] hover:text-[#FF8A3D]";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#293548] bg-[#080B12]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF8A3D]/40 bg-[#FF8A3D]/10 text-xl text-[#FF8A3D]">
            
          </div>

          <span className="text-2xl font-bold text-white">
            Event<span className="text-[#FF8A3D]">Hub</span>
          </span>
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

          <NavLink to="/dashboard" className={navLinkClass}>
            Organizer Dashboard
          </NavLink>
        </div>

        
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-[#293548] px-6 py-3 font-semibold text-white hover:border-[#FF8A3D] hover:text-[#FF8A3D]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-[#FF8A3D] px-6 py-3 font-bold text-white hover:bg-[#FFA15F]"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;