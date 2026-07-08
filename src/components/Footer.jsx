import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#293548] bg-[#080B12] px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">

        
        <div>
          <Link to="/" className="text-2xl font-bold">
            Event<span className="text-[#FF8A3D]">Hub</span>
          </Link>

          <p className="mt-4 max-w-xs leading-7 text-[#94A3B8]">
            Discover, register, and experience the best events happening
            across your campus.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>

          <div className="mt-5 flex flex-col gap-3 text-[#94A3B8]">
            <Link to="/" className="hover:text-[#FF8A3D]">
              Home
            </Link>

            <Link to="/events" className="hover:text-[#FF8A3D]">
              Explore Events
            </Link>

            <Link to="/past-events" className="hover:text-[#FF8A3D]">
              Past Events
            </Link>

            <Link to="/dashboard" className="hover:text-[#FF8A3D]">
              Organizer Dashboard
            </Link>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>

          <div className="mt-5 flex flex-col gap-4 text-[#94A3B8]">
            <a
              href="mailto:eventhub@gmail.com"
              className="hover:text-[#FF8A3D]"
            >
              ✉️ eventhub@gmail.com
            </a>

            <p>📍 College Campus, India</p>

            <p>📞 +91 98765 43210</p>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-bold">Follow Us</h3>

          <p className="mt-5 text-[#94A3B8]">
            Stay connected for the latest campus events and updates.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#"
              className="rounded-xl border border-[#293548] px-4 py-3 hover:border-[#FF8A3D] hover:text-[#FF8A3D]"
            >
              Instagram
            </a>

          </div>
        </div>

      </div>

      
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-center gap-3 border-t border-[#293548] pt-7 text-center text-sm text-[#64748B]">
        <p>
          © 2026 EventHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;