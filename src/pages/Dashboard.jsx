import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Edit3,
  Image,
  LogOut,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

//if there is no event dashboard look empty so we did this
const initialEvents = [
  {
    id: 1,
    title: "Campus Hackathon 2026",
    category: "Technology",
    date: "2026-07-20",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Innovation Lab",
    seats: 200,
    registrations: 124,
    image: "",
  },
  {
    id: 2,
    title: "Annual Music Festival",
    category: "Music",
    date: "2026-07-25",
    startTime: "17:00",
    endTime: "21:00",
    venue: "Main Auditorium",
    seats: 300,
    registrations: 218,
    image: "",
  },
];

//blank event initially
//when user creat event set the formdata
const emptyForm = {
  title: "",
  category: "",
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  seats: "",
  image: "",
};

function Dashboard() {
  const navigate = useNavigate();
   
//lazy initial value used to read fromlocal storage
  const [dashboardEvents, setDashboardEvents] = useState(() => {
    //previous saved event from browser
    const savedEvents = localStorage.getItem(
      "eventhub-dashboard-events"
    );

    if (savedEvents) {
      try {
        return JSON.parse(savedEvents);
      } catch (error) {
        console.error("Could not load saved events:", error);
      }
    }

    return initialEvents;
  });

  const [formData, setFormData] = useState(emptyForm);
  //visible show or hide form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  //like search hackathon
  const [searchTerm, setSearchTerm] = useState("");
  //image uplod error in event data
  const [imageError, setImageError] = useState("");

//run after rendering
//dashboard change react run own its own
  useEffect(() => {
    try {
      localStorage.setItem(
        "eventhub-dashboard-events",
        JSON.stringify(dashboardEvents)
      );
    } catch (error) {
      console.error("Could not save events:", error);
    }
  }, [dashboardEvents]);

  //reduce many value reduce to one like registration, seats , price, no
  //[10,20,30] return 60
  //used for totakl registration

  const totalRegistrations = dashboardEvents.reduce(
    (total, event) =>
      total + Number(event.registrations || 0),
    0
  );
//same work
  const totalSeats = dashboardEvents.reduce(
    (total, event) => total + Number(event.seats || 0),
    0
  );
//filter use to verify thst the condition is  true
//true one remain other discard
  const filteredEvents = dashboardEvents.filter((event) =>
    event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

    //run when logout
  function handleOrganizerLogout() {
    localStorage.removeItem("eventhub-organizer-auth");
//nav to org login
    navigate("/organizer-login", {
      replace: true,
    });
  }


     //
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }
//when user select image
  function handleImageChange(e) {
    //user select file react creat a eent
    //photo.jpeg ex
    //[0]bc acept only 1 img
    const file = e.target.files[0];

    //user selected file or not
    if (!file) {
      return;
    }

    setImageError("");
//if not animage
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose a valid image file.");
      return;
    }
//don't exceed 2mb
//kb*bytes
    if (file.size > 2 * 1024 * 1024) {
      setImageError(
        "Please choose an image smaller than 2 MB."
      );
      return;
    }
//browser api
//file reader built in js object
//witout t react cannt see content
    const reader = new FileReader();

//after read start
    reader.onloadend = () => {
      setFormData((previousData) => ({
        ...previousData,
        image: reader.result,
      }));
    };

    reader.onerror = () => {
      setImageError(
        "Unable to read this image. Please try another one."
      );
    };

    reader.readAsDataURL(file);
  }
//how form use to creat event
//run when cret event is cliced
  function openCreateForm() {
    setFormData(emptyForm);
    setEditingEventId(null);
    setImageError("");
    setIsFormOpen(true);
  }
//edit cliced
  function openEditForm(event) {
    setFormData({
      title: event.title,
      category: event.category,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
      seats: event.seats,
      image: event.image,
    });

    setEditingEventId(event.id);
    setImageError("");
    setIsFormOpen(true);
  }
//for close form
  function closeForm() {
    setFormData(emptyForm);
    setEditingEventId(null);
    setImageError("");
    setIsFormOpen(false);
  }
//submit the form
  function handleSubmit(e) {
    //stop refresh 
    e.preventDefault();

    if (formData.endTime <= formData.startTime) {
      alert("End time must be after the start time.");
      return;
    }
//check user have selected image or not
    if (!formData.image) {
      setImageError("Please choose an event picture.");
      return;
    }

    if (editingEventId !== null) {
      setDashboardEvents((previousEvents) =>
        previousEvents.map((event) =>
          event.id === editingEventId
            ? {
                ...event,
                ...formData,
                seats: Number(formData.seats),
              }
            : event
        )
      );
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
        seats: Number(formData.seats),
        registrations: 0,
      };

      setDashboardEvents((previousEvents) => [
        newEvent,
        ...previousEvents,
      ]);
    }

    closeForm();
  }

  function handleDelete(eventId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!shouldDelete) {
      return;
    }

    setDashboardEvents((previousEvents) =>
      previousEvents.filter(
        (event) => event.id !== eventId
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-6 py-16 text-[#38340E]">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="font-medium text-[#E56703]">
              ORGANIZER PANEL
            </p>

            <h1 className="font-heading mt-2 text-4xl font-bold">
              Event Dashboard
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-[#6D6131]">
              Create, manage, edit, and track your campus
              events from one place.
            </p>
          </div>

          {/* Create Eent*/}
          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={openCreateForm}
              className="flex items-center gap-2 rounded-xl bg-[#FFA13D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
            >
              <Plus size={20} />
              Create Event
            </button>

            <button
              type="button"
              onClick={handleOrganizerLogout}
              className="flex items-center gap-2 rounded-xl border border-[#F3E8D8] bg-white px-6 py-3.5 font-semibold text-[#38340E] transition hover:border-red-300 hover:text-red-600"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>
        </div>

        {/* Stat */}
        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-sm">
            <CalendarDays
              className="text-[#E56703]"
              size={26}
            />

            <p className="mt-5 text-sm font-medium text-[#6D6131]">
              Total Events
            </p>

            <p className="font-heading mt-1 text-3xl font-bold">
              {dashboardEvents.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-sm">
            <Users
              className="text-[#E56703]"
              size={26}
            />

            <p className="mt-5 text-sm font-medium text-[#6D6131]">
              Total Registrations
            </p>

            <p className="font-heading mt-1 text-3xl font-bold">
              {totalRegistrations}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-sm">
            <Users
              className="text-[#E56703]"
              size={26}
            />

            <p className="mt-5 text-sm font-medium text-[#6D6131]">
              Total Seats
            </p>

            <p className="font-heading mt-1 text-3xl font-bold">
              {totalSeats}
            </p>
          </div>

        </section>

        {/*form edit*/}
        {isFormOpen && (
          <section className="mt-12 rounded-2xl border border-[#F3E8D8] bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="font-medium text-[#E56703]">
                  {editingEventId !== null
                    ? "UPDATE EVENT"
                    : "NEW EVENT"}
                </p>

                <h2 className="font-heading mt-1 text-2xl font-bold">
                  {editingEventId !== null
                    ? "Edit Event"
                    : "Create a New Event"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-[#6D6131] transition hover:bg-[#FFF9F2] hover:text-[#E56703]"
                aria-label="Close event form"
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-6 md:grid-cols-2"
            >

              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Event Title{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              {/* category*/}
              <div>
                <label className="mb-2 block font-medium">
                  Category{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] bg-white px-5 py-4 outline-none focus:border-[#FFA13D]"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Technology">
                    Technology
                  </option>

                  <option value="Music">
                    Music
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Arts">
                    Arts
                  </option>

                  <option value="Workshop">
                    Workshop
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>
                </select>
              </div>

              {/* VENUE */}
              <div>
                <label className="mb-2 block font-medium">
                  Venue{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter event venue"
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              
              <div>
                <label className="mb-2 block font-medium">
                  Event Date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              {/* seat*/}
              <div>
                <label className="mb-2 block font-medium">
                  Total Seats{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  placeholder="Example: 200"
                  min="1"
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              {/* time */}
              <div>
                <label className="mb-2 block font-medium">
                  Start Time{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              {/* END */}
              <div>
                <label className="mb-2 block font-medium">
                  End Time{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none focus:border-[#FFA13D]"
                />
              </div>

              {/* UPLOAD image*/}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Event Picture{" "}
                  <span className="text-red-500">*</span>
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#F3E8D8] px-6 py-8 text-[#6D6131] transition hover:border-[#FFA13D] hover:text-[#E56703]">

                  <Image size={24} />

                  <span className="font-medium">
                    Choose Event Picture
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

                <p className="mt-2 text-sm text-[#6D6131]">
                  Maximum image size: 2 MB
                </p>

                {imageError && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {imageError}
                  </p>
                )}

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Event preview"
                    className="mt-5 h-56 w-full rounded-xl object-cover"
                  />
                )}
              </div>

              {/* FORM BUTTONS */}
              <div className="flex flex-wrap gap-3 md:col-span-2">

                <button
                  type="submit"
                  className="rounded-xl bg-[#FFA13D] px-7 py-3.5 font-semibold text-white transition hover:bg-[#E56703]"
                >
                  {editingEventId !== null
                    ? "Save Changes"
                    : "Create Event"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-[#F3E8D8] px-7 py-3.5 font-semibold hover:border-[#FFA13D] hover:text-[#E56703]"
                >
                  Cancel
                </button>

              </div>

            </form>
          </section>
        )}

        {/* EVENT MANAGEMENT */}
        <section className="mt-12">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="font-medium text-[#E56703]">
                EVENT MANAGEMENT
              </p>

              <h2 className="font-heading mt-1 text-3xl font-bold">
                Your Events
              </h2>
            </div>

            <div className="relative w-full md:max-w-sm">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D6131]"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search your events..."
                className="w-full rounded-xl border border-[#F3E8D8] bg-white py-3.5 pl-12 pr-4 outline-none focus:border-[#FFA13D]"
              />

            </div>
          </div>

          {/* Event card */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
           
           {/*map loop throug every elemet of array
           */}
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-[#F3E8D8] bg-white shadow-sm"
              >

                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-[#FFF9F2] text-[#E56703]">
                    <Image size={42} />
                  </div>
                )}

                <div className="p-6">

                  <span className="inline-flex rounded-full bg-[#FFA13D]/10 px-3 py-1 text-sm font-medium text-[#E56703]">
                    {event.category}
                  </span>

                  <h3 className="font-heading mt-3 text-xl font-semibold">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-[#6D6131]">

                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={17} />
                      {event.startTime} - {event.endTime}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} />
                      {event.venue}
                    </p>

                    <p className="flex items-center gap-2">
                      <Users size={17} />
                      {event.registrations} registered •{" "}
                      {event.seats} seats
                    </p>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        openEditForm(event)
                      }
                      className="flex items-center gap-2 rounded-xl border border-[#F3E8D8] px-4 py-2.5 font-medium hover:border-[#FFA13D] hover:text-[#E56703]"
                    >
                      <Edit3 size={18} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(event.id)
                      }
                      className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                  </div>
                </div>

              </article>
            ))}

          </div>

          {filteredEvents.length === 0 && (
            <div className="mt-8 rounded-2xl border border-[#F3E8D8] bg-white p-12 text-center">

              <h3 className="font-heading text-xl font-semibold">
                No events found
              </h3>

              <p className="mt-2 text-[#6D6131]">
                Try another search or create a new event.
              </p>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Dashboard;