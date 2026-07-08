import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#293548] bg-[#080B12] px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-bold">
            Event<span className="text-[#FF8A3D]">Hub</span>
          </Link>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Discover and experience the best campus events.
          </p>
        </div>

        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#94A3B8]">

          <a
            href="mailto:eventhub@gmail.com"
            className="hover:text-[#FF8A3D]"
          >
            ✉️ Contact Us
          </a>

          <a
            href="tel:+919876543210"
            className="hover:text-[#FF8A3D]"
          >
            📞 +91 98765 43210
          </a>

          <a
            href="#"
            className="hover:text-[#FF8A3D]"
          >
            📸 Instagram
          </a>

        </div>
      </div>

      
      <div className="mx-auto mt-7 max-w-7xl border-t border-[#293548] pt-5 text-center text-sm text-[#64748B]">
        © 2026 EventHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;