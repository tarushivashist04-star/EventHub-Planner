import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Modal from "../components/Modal.jsx";
import QRCodeTicket from "../components/QRCodeTicket.jsx";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    phone: "",
  });

  const event = events.find(
    (item) => item.id === Number(id)
  );

  function handleChange(e) {
  const { name, value } = e.target;

  if (name === "phone") {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

    setFormData((previousData) => ({
      ...previousData,
      phone: onlyNumbers,
    }));

    return;
  }

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
}

  function handleSubmit(e) {
  e.preventDefault();

  const fullName = formData.fullName.trim();
  const email = formData.email.trim();
  const studentId = formData.studentId.trim();
  const phone = formData.phone.trim();

  if (!fullName || !email || !studentId || !phone) {
    return;
  }

  if (phone.length !== 10) {
    return;
  }

  const currentUser = JSON.parse(
    localStorage.getItem("eventhub-current-user")
  );

  if (!currentUser) {
    alert("Please login before registering for an event.");
    return;
  }

  const savedTickets = JSON.parse(
    localStorage.getItem("eventhub-my-tickets") || "[]"
  );

  const newTicket = {
    ticketId: `EVH-${Date.now()}`,
    userId: currentUser.uid,
    userEmail: currentUser.email,

    event: {
      id: event.id,
      title: event.title,
      image: event.image,
      category: event.category,
      displayDate: event.displayDate,
      time: event.time,
      venue: event.venue,
      club: event.club,
    },

    attendee: {
      fullName,
      email,
      studentId,
      phone,
    },

    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem(
    "eventhub-my-tickets",
    JSON.stringify([newTicket, ...savedTickets])
  );

  setIsRegistered(true);
}

  function handleCloseModal() {
  setIsModalOpen(false);
  setIsRegistered(false);
  setShowTicket(false);

  setFormData({
    fullName: "",
    email: "",
    studentId: "",
    phone: "",
  });
}
  if (!event) {
    return (
      <main className="min-h-screen bg-[#FFF9F2] px-6 py-20 text-center">
        <h1 className="font-heading text-4xl font-bold text-[#38340E]">
          Event Not Found
        </h1>

        <p className="mt-4 text-[#6D6131]">
          The event you are looking for does not exist.
        </p>

        <Link
          to="/events"
          className="mt-8 inline-block rounded-xl bg-[#FFA13D] px-6 py-3 font-semibold text-white transition hover:bg-[#E56703]"
        >
          Back to Events
        </Link>
      </main>
    );
  }

  const spotsLeft = Math.max(
    event.capacity - event.registered,
    0
  );

  const percentage = Math.min(
    (event.registered / event.capacity) * 100,
    100
  );

  return (
    <main className="min-h-screen bg-[#FFF9F2] text-[#38340E]">

      {/* Top section*/}
      <section className="border-b border-[#F3E8D8] bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <Link
            to="/events"
            className="font-medium text-[#E56703] transition hover:text-[#FFA13D]"
          >
            ← Back to Events
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">

            {/* EVENT IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-[#F3E8D8]">
              <img
                src={event.image}
                alt={event.title}
                className="h-full max-h-125 w-full object-cover"
              />
            </div>

            {/* EVENT DETAILS */}
            <div className="flex flex-col justify-center">

              <span className="w-fit rounded-full border border-[#FFA13D]/40 bg-[#FFA13D]/10 px-4 py-2 text-sm font-semibold text-[#E56703]">
                {event.category}
              </span>

              <h1 className="font-heading mt-5 text-4xl font-bold leading-tight text-[#38340E] md:text-5xl">
                {event.title}
              </h1>

              <p className="mt-6 text-[#6D6131]">
                Organized by{" "}
                <span className="font-medium text-[#38340E]">
                  {event.club}
                </span>
              </p>

              <div className="mt-8 space-y-4 text-[#6D6131]">
                <p>📅 {event.displayDate}</p>

                <p>🕒 {event.time}</p>

                <p>📍 {event.venue}</p>

                <p>
                  👥 {event.registered} of {event.capacity} registered
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* main detail */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">

        
          <div className="space-y-8">

            
            <div className="rounded-2xl border border-[#F3E8D8] bg-white p-8 shadow-sm">

              <h2 className="font-heading text-2xl font-bold text-[#38340E]">
                About This Event
              </h2>

              <p className="mt-5 leading-8 text-[#6D6131]">
                Join us for an exciting {event.title}. This event brings
                students together to learn, connect, and enjoy a memorable
                campus experience.
              </p>

              <p className="mt-4 leading-8 text-[#6D6131]">
                Whether you are attending to learn something new, meet
                people with similar interests, or simply enjoy the event,
                everyone is welcome to participate.
              </p>

            </div>
  


            {/* spaker info */}
            {event.speaker && (
              <div className="rounded-2xl border border-[#F3E8D8] bg-white p-8 shadow-sm">

                <p className="font-medium text-[#E56703]">
                  MEET THE SPEAKER
                </p>

                <h2 className="font-heading mt-2 text-2xl font-bold text-[#38340E]">
                  Speaker Information
                </h2>

                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">

                  {/* Image */}
                 <img
                    src={event.speaker.image}
                    alt={event.speaker.name}
                    className="h-28 w-28 shrink-0 rounded-2xl object-cover"
                  />

                  
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#38340E]">
                      {event.speaker.name}
                    </h3>

                    <p className="mt-1 font-medium text-[#E56703]">
                      {event.speaker.role}
                    </p>

                    <p className="mt-1 text-sm text-[#6D6131]">
                      {event.speaker.organization}
                    </p>

                    <p className="mt-4 leading-7 text-[#6D6131]">
                      {event.speaker.bio}
                    </p>
                  </div>

                </div>
              </div>
            )}


            {/* Event info */}
            <div className="rounded-2xl border border-[#F3E8D8] bg-white p-8 shadow-sm">

              <h2 className="font-heading text-2xl font-bold text-[#38340E]">
                Event Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl bg-[#FFF9F2] p-5">
                  <p className="text-sm text-[#6D6131]">
                    Date
                  </p>

                  <p className="mt-2 font-medium text-[#38340E]">
                    {event.displayDate}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF9F2] p-5">
                  <p className="text-sm text-[#6D6131]">
                    Time
                  </p>

                  <p className="mt-2 font-medium text-[#38340E]">
                    {event.time}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF9F2] p-5">
                  <p className="text-sm text-[#6D6131]">
                    Venue
                  </p>

                  <p className="mt-2 font-medium text-[#38340E]">
                    {event.venue}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF9F2] p-5">
                  <p className="text-sm text-[#6D6131]">
                    Organizer
                  </p>

                  <p className="mt-2 font-medium text-[#38340E]">
                    {event.club}
                  </p>
                </div>

              </div>
            </div>

          </div>


          {/* right registration*/}
          <aside>
            <div className="sticky top-28 rounded-2xl border border-[#F3E8D8] bg-white p-7 shadow-sm">

              <h2 className="font-heading text-2xl font-bold text-[#38340E]">
                Event Registration
              </h2>

              <div className="mt-6 flex items-center justify-between text-sm">

                <span className="text-[#6D6131]">
                  {event.registered} registered
                </span>

                <span className="font-medium text-[#E56703]">
                  {spotsLeft === 0
                    ? "Event Full"
                    : `${spotsLeft} spots left`}
                </span>

              </div>

              {/* ptogress bar */}
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#F3E8D8]">
                <div
                  className="h-full rounded-full bg-[#FFA13D]"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <p className="mt-5 text-sm leading-6 text-[#6D6131]">
                Register now to secure your place and receive your
                digital event ticket.
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={spotsLeft === 0}
                className="mt-7 w-full rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {spotsLeft === 0
                  ? "Event Full"
                  : "Register Now"}
              </button>

              <p className="mt-4 text-center text-xs text-[#6D6131]">
                No payment required
              </p>

            </div>
          </aside>

        </div>
      </section>


      
     {/* Regi modal*/}
<Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
>
  {showTicket ? (

    
    <div>
      <QRCodeTicket
        event={event}
        attendee={formData}
      />

      <button
        type="button"
        onClick={() => setShowTicket(false)}
        className="mt-5 w-full rounded-xl border border-[#FFA13D] px-6 py-3.5 font-semibold text-[#E56703] transition hover:bg-[#FFF9F2]"
      >
        ← Back
      </button>

      <button
        type="button"
        onClick={handleCloseModal}
        className="mt-3 w-full rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
      >
        Done
      </button>
    </div>

  ) : isRegistered ? (

    
    <div className="py-6 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFA13D]/15 text-4xl font-bold text-[#E56703]">
        ✓
      </div>

      <p className="mt-6 font-medium text-[#E56703]">
        REGISTRATION SUCCESSFUL
      </p>

      <h2 className="font-heading mt-2 text-3xl font-bold text-[#38340E]">
        You&apos;re Registered!
      </h2>

      <p className="mt-4 leading-7 text-[#6D6131]">
        Your spot for {event.title} has been successfully reserved.
      </p>

      <div className="mt-7 rounded-xl bg-[#FFF9F2] p-5 text-left">

        <p className="text-sm text-[#6D6131]">
          Attendee
        </p>

        <p className="mt-1 font-semibold text-[#38340E]">
          {formData.fullName}
        </p>

        <p className="mt-4 text-sm text-[#6D6131]">
          Email
        </p>

        <p className="mt-1 font-medium text-[#38340E]">
          {formData.email}
        </p>

        <p className="mt-4 text-sm text-[#6D6131]">
          Event
        </p>

        <p className="mt-1 font-semibold text-[#38340E]">
          {event.title}
        </p>

        <p className="mt-4 text-sm text-[#6D6131]">
          Date & Time
        </p>

        <p className="mt-1 font-medium text-[#38340E]">
          {event.displayDate} • {event.time}
        </p>

      </div>

      <button
        type="button"
        onClick={() => setShowTicket(true)}
        className="mt-7 w-full rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
      >
        View My Ticket
      </button>

      <button
        type="button"
        onClick={handleCloseModal}
        className="mt-3 w-full rounded-xl border border-[#F3E8D8] px-6 py-3.5 font-semibold text-[#38340E] transition hover:bg-[#FFF9F2]"
      >
        Done
      </button>

    </div>

  ) : (

  
    <div>

      <p className="font-medium text-[#E56703]">
        EVENT REGISTRATION
      </p>

      <h2 className="font-heading mt-2 pr-12 text-3xl font-bold text-[#38340E]">
        Register for {event.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#6D6131]">
        Complete the form to reserve your place at this event.
      </p>

      <div className="mt-6 rounded-xl bg-[#FFF9F2] p-4">

        <p className="font-medium text-[#38340E]">
          {event.title}
        </p>

        <p className="mt-2 text-sm text-[#6D6131]">
          {event.displayDate} • {event.time}
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-5"
      >

        <div>
          <label
               htmlFor="fullName"
               className="mb-2 block font-medium text-[#38340E]"
                >
                Full Name <span className="text-red-500">*</span>
          </label>

          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
          />
        </div>

        <div>
         <label
           htmlFor="email"
          className="mb-2 block font-medium text-[#38340E]"
            >
          Email Address <span className="text-red-500">*</span>
        </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
          />
        </div>

        <div>

          <label
          htmlFor="studentId"
          className="mb-2 block font-medium text-[#38340E]"
           >
            Student ID <span className="text-red-500">*</span>
         </label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter your student ID"
            required
            className="w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
          />
        </div>

        <div>
             <label
             htmlFor="phone"
             className="mb-2 block font-medium text-[#38340E]"
         >
            Phone Number <span className="text-red-500">*</span>
         </label>

  <input
    id="phone"
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Enter 10-digit phone number"
    required
    pattern="[0-9]{10}"
    minLength={10}
    maxLength={10}
    inputMode="numeric"
    title="Phone number must be exactly 10 digits"
    className="w-full rounded-xl border border-[#F3E8D8] bg-white px-4 py-3 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
  />
</div>
        <button
          type="submit"
          className="w-full rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
        >
          Confirm Registration
        </button>

      </form>

    </div>

  )}
</Modal>

    </main>
  );
}

export default EventDetails;