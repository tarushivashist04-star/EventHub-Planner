function Footer() {
  return (
    <footer className="border-t border-[#F3E8D8] bg-white px-6 py-10">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        {/* LOGO */}
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl font-bold text-[#38340E]">
            Event<span className="text-[#FFA13D]">Hub</span>
          </h2>

          <p className="mt-2 text-sm text-[#6D6131]">
            Discover the best events on your campus.
          </p>
        </div>


        {/* CONTACT DETAILS */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#6D6131]">

          {/* EMAIL */}
          <a
            href="mailto:eventhub@gmail.com"
            className="transition hover:text-[#E56703]"
          >
            ✉️ eventhub@gmail.com
          </a>

          {/* PHONE */}
          <a
            href="tel:+919876543210"
            className="transition hover:text-[#E56703]"
          >
            📞 +91 98765 43210
          </a>

          {/* INSTAGRAM */}
          <a
            href="#"
            className="font-medium transition hover:text-[#E56703]"
          >
            📷 Instagram
          </a>

        </div>
      </div>


      {/* COPYRIGHT */}
      <div className="mx-auto mt-8 max-w-7xl border-t border-[#F3E8D8] pt-6 text-center">
        <p className="text-sm text-[#6D6131]">
          © 2026 EventHub. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;