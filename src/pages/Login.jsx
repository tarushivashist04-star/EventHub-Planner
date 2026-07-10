import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setError("");
      setSuccess(false);
      setIsLoggingIn(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const loggedInUser = userCredential.user;

      // SAVE CURRENT LOGGED-IN STUDENT
      localStorage.setItem(
        "eventhub-current-user",
        JSON.stringify({
          uid: loggedInUser.uid,
          email: loggedInUser.email,
        })
      );
      window.dispatchEvent(new Event("student-login-change"));

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Firebase login error:", error.code);

      if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Incorrect email or password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many failed login attempts. Please wait and try again."
        );
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Network error. Please check your internet connection."
        );
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9F2] px-6 py-16">
      <div className="mx-auto max-w-5xl">

        {/* BACK LINK */}
        <Link
          to="/"
          className="font-medium text-[#E56703] transition hover:text-[#FFA13D]"
        >
          ← Go Back
        </Link>

        {/* PAGE HEADING */}
        <div className="mt-10">
          <p className="font-semibold text-[#E56703]">
            WELCOME BACK
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold text-[#38340E]">
            Login to EventHub
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#6D6131]">
            Login to discover campus events, manage your registrations,
            and access your digital tickets.
          </p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-8">

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-[#38340E]"
            >
              College Email{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your college email"
              required
              disabled={isLoggingIn || success}
              className="w-full rounded-xl border border-[#F3E8D8] bg-white px-5 py-4 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D] disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-medium text-[#38340E]"
              >
                Password{" "}
                <span className="text-red-500">*</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#E56703] transition hover:text-[#FFA13D]"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={6}
                disabled={isLoggingIn || success}
                className="w-full rounded-xl border border-[#F3E8D8] bg-white px-5 py-4 pr-16 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D] disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#6D6131] transition hover:text-[#E56703]"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* REMEMBER ME */}
          <label className="flex w-fit cursor-pointer items-center gap-3 text-[#6D6131]">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#FFA13D]"
            />
            Remember me
          </label>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="rounded-2xl border border-[#FFA13D]/30 bg-[#FFA13D]/10 px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFA13D] text-xl font-bold text-white">
                  ✓
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#38340E]">
                    Login Successful!
                  </h3>

                  <p className="mt-1 text-[#6D6131]">
                    Welcome back to EventHub. Redirecting you to the home
                    page...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <p className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={isLoggingIn || success}
            className="w-full rounded-xl bg-[#FFA13D] px-6 py-4 font-semibold text-white transition hover:bg-[#E56703] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="mt-8 text-center text-[#6D6131]">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#E56703] transition hover:text-[#FFA13D]"
          >
            Create Account
          </Link>
        </p>

      </div>
    </main>
  );
}

export default Login;