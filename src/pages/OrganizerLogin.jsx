import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

function OrganizerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizerId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isOrganizerLoggedIn =
    localStorage.getItem("eventhub-organizer-auth") === "true";

  if (isOrganizerLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const correctOrganizerId = "admin";
    const correctPassword = "eventhub2026";

    if (
      formData.organizerId === correctOrganizerId &&
      formData.password === correctPassword
    ) {
      localStorage.setItem("eventhub-organizer-auth", "true");

      navigate("/dashboard", {
        replace: true,
      });

      return;
    }

    setErrorMessage(
      "Incorrect Organizer ID or password. Please try again."
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-6 py-16 text-[#38340E]">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-[#F3E8D8] bg-white p-7 shadow-sm sm:p-10">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFA13D]/10 text-[#E56703]">
            <LockKeyhole size={28} />
          </div>

          <p className="mt-7 font-semibold text-[#E56703]">
            ORGANIZER ACCESS
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold">
            Organizer Login
          </h1>

          <p className="mt-4 leading-7 text-[#6D6131]">
            Sign in with your organizer credentials to create, edit,
            and manage campus events.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-9 space-y-6"
          >
            <div>
              <label
                htmlFor="organizerId"
                className="mb-2 block font-medium"
              >
                Organizer ID{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="organizerId"
                type="text"
                name="organizerId"
                value={formData.organizerId}
                onChange={handleChange}
                placeholder="Enter organizer ID"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
              />
            </div>

            <div>
              <label
                htmlFor="organizerPassword"
                className="mb-2 block font-medium"
              >
                Password{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  id="organizerPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter organizer password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#F3E8D8] px-5 py-4 pr-16 outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6D6131] transition hover:text-[#E56703]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FFA13D] px-6 py-4 font-semibold text-white transition hover:bg-[#E56703]"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-7 rounded-xl bg-[#FFF9F2] p-4">
            <p className="text-sm leading-6 text-[#6D6131]">
              This area is restricted to authorized event organizers.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default OrganizerLogin;