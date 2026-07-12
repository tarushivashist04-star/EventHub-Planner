//used to display the ticket of stuent and view qr ticket
import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  QrCode,
  Ticket,
} from "lucide-react";

import QRCodeTicket from "../components/QRCodeTicket.jsx";

function Tickets() {
  //for selecte ticket true
  const [selectedTicket, setSelectedTicket] = useState(null);

  // GET CURRENT LOGGED-IN STUDENT
  const currentUser = JSON.parse(
    localStorage.getItem("eventhub-current-user")
  );

  // GET ALL SAVED TICKETS
  const allSavedTickets = JSON.parse(
    localStorage.getItem("eventhub-my-tickets") || "[]"
  );

  // SHOW ONLY THE CURRENT STUDENT'S TICKETS
  const savedTickets = currentUser
    ? allSavedTickets.filter(
        (ticket) => ticket.userId === currentUser.uid
      )
    : [];

  if (savedTickets.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF9F2] px-6 py-20 text-[#38340E]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFA13D]/10 text-[#E56703]">
            <Ticket size={38} />
          </div>

          <h1 className="font-heading mt-6 text-4xl font-bold">
            No Tickets Yet
          </h1>

          <p className="mt-4 text-[#6D6131]">
            Register for an event and your ticket will appear here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-6 py-16 text-[#38340E]">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div>
          <p className="font-medium text-[#E56703]">
            YOUR REGISTRATIONS
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold md:text-5xl">
            My Tickets
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#6D6131]">
            View your registered events and access your digital QR
            tickets.
          </p>
        </div>

        {/* ticket CARDS */}
        {/* map like 3 times react run sothe 3 card will be there*/}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {savedTickets.map((ticket) => (
            <article
              key={ticket.ticketId}
              className="overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white shadow-sm"
            >
              <img
                src={ticket.event.image}
                alt={ticket.event.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <span className="inline-flex rounded-full bg-[#FFA13D]/10 px-3 py-1 text-sm font-medium text-[#E56703]">
                  {ticket.event.category}
                </span>

                <h2 className="font-heading mt-3 text-xl font-bold">
                  {ticket.event.title}
                </h2>

                <div className="mt-5 space-y-3 text-sm text-[#6D6131]">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={17} />
                    {ticket.event.displayDate} • {ticket.event.time}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={17} />
                    {ticket.event.venue}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-[#FFF9F2] p-4">
                  <p className="text-xs text-[#6D6131]">
                    REGISTERED ATTENDEE
                  </p>

                  <p className="mt-1 font-semibold">
                    {ticket.attendee.fullName}
                  </p>

                  <p className="mt-1 text-sm text-[#6D6131]">
                    {ticket.attendee.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTicket(ticket)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
                >
                  <QrCode size={19} />
                  View QR Ticket
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* SELECTED QR TICKET */}
        {/*like if conditionistrue run jsx oterwise not*/}
        {selectedTicket && (
          <section className="mt-12 rounded-3xl border border-[#F3E8D8] bg-white p-6 shadow-sm md:p-10">
            <div className="mx-auto max-w-xl">
              <QRCodeTicket
                event={selectedTicket.event}
                attendee={selectedTicket.attendee}
              />

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="mt-5 w-full rounded-xl border border-[#F3E8D8] px-6 py-3.5 font-semibold transition hover:border-[#FFA13D] hover:text-[#E56703]"
              >
                Close Ticket
              </button>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default Tickets;