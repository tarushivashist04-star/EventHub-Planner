//use library
import QRCode from "react-qr-code";
//2 props event detail and attendee
function QRCodeTicket({ event, attendee }) {
  //here object is creted first bc qr can't gernate directly
  const ticketData = JSON.stringify({
    eventId: event.id,
    event: event.title,
    attendee: attendee.fullName,
    email: attendee.email,
    studentId: attendee.studentId,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white">

      {/* TICKET TOP */}
      <div className="bg-[#FFF9F2] px-6 py-5 text-center">
        <p className="font-medium text-[#E56703]">
          EVENTHUB DIGITAL TICKET
        </p>

        <h2 className="font-heading mt-2 text-2xl font-bold text-[#38340E]">
          {event.title}
        </h2>
      </div>

      {/* TICKET CONTENT */}
      <div className="p-6">

        {/* QR CODE */}
        <div className="mx-auto w-fit rounded-2xl border border-[#F3E8D8] bg-white p-4">
          <QRCode
            value={ticketData}
            size={180}
          />
        </div>

        <p className="mt-4 text-center text-sm text-[#6D6131]">
          Show this QR code at the event entrance.
        </p>

        {/* TICKET DETAILS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl bg-[#FFF9F2] p-4">
            <p className="text-xs text-[#6D6131]">
              Attendee
            </p>

            <p className="mt-1 font-semibold text-[#38340E]">
              {attendee.fullName}
            </p>
          </div>

          <div className="rounded-xl bg-[#FFF9F2] p-4">
            <p className="text-xs text-[#6D6131]">
              Student ID
            </p>

            <p className="mt-1 font-semibold text-[#38340E]">
              {attendee.studentId}
            </p>
          </div>

          <div className="rounded-xl bg-[#FFF9F2] p-4">
            <p className="text-xs text-[#6D6131]">
              Date
            </p>

            <p className="mt-1 font-medium text-[#38340E]">
              {event.displayDate}
            </p>
          </div>

          <div className="rounded-xl bg-[#FFF9F2] p-4">
            <p className="text-xs text-[#6D6131]">
              Time
            </p>

            <p className="mt-1 font-medium text-[#38340E]">
              {event.time}
            </p>
          </div>

        </div>

        {/* VENUE */}
        <div className="mt-4 rounded-xl bg-[#FFF9F2] p-4">
          <p className="text-xs text-[#6D6131]">
            Venue
          </p>

          <p className="mt-1 font-medium text-[#38340E]">
            {event.venue}
          </p>
        </div>

      </div>

      {/* TICKET BOTTOM */}
      <div className="border-t border-dashed border-[#F3E8D8] px-6 py-4 text-center">
        <p className="text-xs text-[#6D6131]">
          This ticket is valid for one attendee only.
        </p>
      </div>

    </div>
  );
}

export default QRCodeTicket;