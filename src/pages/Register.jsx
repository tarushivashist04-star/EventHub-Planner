import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    year: "",
    dateOfBirth: "",
    gender: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setFormData((previousData) => ({
        ...previousData,
        phone: onlyNumbers,
      }));

      setError("");
      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setSuccess(false);
      setIsCreating(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("Firebase User:", userCredential.user);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);

      if (error.code === "auth/email-already-in-use") {
        setError(
          "An account with this email already exists. Please login instead."
        );
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must contain at least 6 characters.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#F3E8D8] bg-white px-5 py-4 text-[#38340E] outline-none transition placeholder:text-[#6D6131]/60 focus:border-[#FFA13D]";

  const labelClass =
    "mb-2 block font-medium text-[#38340E]";

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

        {/* PAGE head */}
        <div className="mt-10">
          <p className="font-semibold text-[#E56703]">
            JOIN EVENTHUB
          </p>

          <h1 className="font-heading mt-2 text-4xl font-bold text-[#38340E]">
            Create Your EventHub Account
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#6D6131]">
            Enter your student details to create your account and start
            discovering campus events.
          </p>
        </div>

        {/* Regist*/}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-8"
        >

          
          <div>
            <label htmlFor="fullName" className={labelClass}>
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
              className={inputClass}
            />
          </div>

          
          <div>
            <label htmlFor="email" className={labelClass}>
              College Email <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your college email"
              required
              className={inputClass}
            />
          </div>

          
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              required
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              inputMode="numeric"
              title="Phone number must be exactly 10 digits"
              className={inputClass}
            />
          </div>

          
          <div>
            <label htmlFor="university" className={labelClass}>
              College / University Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="university"
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter your college or university name"
              required
              className={inputClass}
            />
          </div>

        
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="course" className={labelClass}>
                Course <span className="text-red-500">*</span>
              </label>

              <input
                id="course"
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Example: B.Tech CSE"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="year" className={labelClass}>
                Current Year <span className="text-red-500">*</span>
              </label>

              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
              </select>
            </div>
          </div>

        
          <div>
            <label htmlFor="dateOfBirth" className={labelClass}>
              Date of Birth <span className="text-red-500">*</span>
            </label>

            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          
          <div>
            <p className={labelClass}>
              Gender <span className="text-red-500">*</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-8">
              <label className="flex cursor-pointer items-center gap-3 text-[#38340E]">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required
                  className="h-5 w-5 accent-[#FFA13D]"
                />
                Female
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-[#38340E]">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="h-5 w-5 accent-[#FFA13D]"
                />
                Male
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-[#38340E]">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="h-5 w-5 accent-[#FFA13D]"
                />
                Other
              </label>
            </div>
          </div>

          
          <div>
            <label htmlFor="studentId" className={labelClass}>
              Student ID <span className="text-red-500">*</span>
            </label>

            <input
              id="studentId"
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your university student ID"
              required
              className={inputClass}
            />
          </div>

        
          <div>
            <label htmlFor="password" className={labelClass}>
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={6}
                className={`${inputClass} pr-16`}
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

            <p className="mt-2 text-sm text-[#6D6131]">
              Password must contain at least 6 characters.
            </p>
          </div>

        
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={
                  showConfirmPassword ? "text" : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                required
                minLength={6}
                className={`${inputClass} pr-16`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#6D6131] transition hover:text-[#E56703]"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          
          {success && (
            <div className="rounded-2xl border border-[#FFA13D]/30 bg-[#FFA13D]/10 px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFA13D] text-xl font-bold text-white">
                  ✓
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#38340E]">
                    Account Created Successfully!
                  </h3>

                  <p className="mt-1 text-[#6D6131]">
                    Your EventHub account is ready. Redirecting you to the
                    login page...
                  </p>
                </div>
              </div>
            </div>
          )}

          
          {error && (
            <p className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </p>
          )}

        
          <button
            type="submit"
            disabled={isCreating || success}
            className="w-full rounded-xl bg-[#FFA13D] px-6 py-4 font-semibold text-white transition hover:bg-[#E56703] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        
        <p className="mt-8 text-center text-[#6D6131]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#E56703] transition hover:text-[#FFA13D]"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;