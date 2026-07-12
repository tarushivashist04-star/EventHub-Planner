import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
//for firbase work
import { auth } from "../firebase";

//func fornavbar
function Navbar() {
  //navigate -ex login
  const navigate = useNavigate();
  //false menu close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "eventhub-current-user"
    );
    
    //local storage only string(convert string to object json)
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //Used latest login
  useEffect(() => {
    function updateCurrentUser() {
      const savedUser = localStorage.getItem(
        "eventhub-current-user"
      );

      setCurrentUser(
        savedUser ? JSON.parse(savedUser) : null
      );
    }
     
    //This is for refresh the detail of student refresh without loading
    //wind browser obj (scroll, scr size) 
    window.addEventListener(
      "student-login-change",
      updateCurrentUser
    );
    
    //for cleanup remove beacuse ofduplaicy
    //memory leak
    return () => {
      window.removeEventListener(
        "student-login-change",
        updateCurrentUser
      );
    };
  }, []);
    
  // NavBar class for active and non active link diff style
  //Arrow function used object destructuring for acess active
  //active return activestyle or inactivestyle 
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "rounded-xl border border-[#FFA13D]/40 bg-[#FFA13D]/10 px-5 py-3 font-medium text-[#E56703]"
      : "px-5 py-3 font-medium text-[#38340E] transition hover:text-[#E56703]";

      //check active link as navlinkclass mobile
  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block rounded-xl bg-[#FFA13D]/10 px-4 py-3 font-medium text-[#E56703]"
      : "block rounded-xl px-4 py-3 font-medium text-[#38340E] transition hover:bg-[#FFF9F2] hover:text-[#E56703]";

  function closeMenu() {
    setIsMenuOpen(false);
  }
  
  //async function for logout bc firebase return a promise
  async function handleLogout() {

    //try for handle 
    try {
      await signOut(auth);

      localStorage.removeItem(
        "eventhub-current-user"
      );

      //update state swicth from logout /ticket - login/signup
      setCurrentUser(null);
      setIsMenuOpen(false);
      
      //app navigate to login until logout
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#F3E8D8] bg-white/95 backdrop-blur-xl">

      {/* MAIN NAVBAR */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* LOGO */}
        {/*link for client side things without realoading*/}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-heading text-2xl font-bold text-[#38340E]"
        >
          Event
          {/*to change hub only*/}
          <span className="text-[#FFA13D]">
            Hub
          </span>
        </Link>
        
        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-2 lg:flex">
          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={navLinkClass}
          >
            Explore Events
          </NavLink>

          <NavLink
            to="/past-events"
            className={navLinkClass}
          >
            Past Events
          </NavLink>

          <NavLink
            to="/organizer-login"
            className={navLinkClass}
          >
            Create Event
          </NavLink>
        </div>

        {/* DESKTOP LOGIN AREA */}
        <div className="hidden items-center gap-3 lg:flex">
          {currentUser ? (
            <>
              <Link
                to="/tickets"
                className="rounded-xl border border-[#F3E8D8] px-6 py-3 font-semibold text-[#38340E] transition hover:border-[#FFA13D] hover:text-[#E56703]"
              >
                My Tickets
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-[#FFA13D] px-6 py-3 font-semibold text-white transition hover:bg-[#E56703]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-[#F3E8D8] px-6 py-3 font-semibold text-[#38340E] transition hover:border-[#FFA13D] hover:text-[#E56703]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-[#FFA13D] px-6 py-3 font-semibold text-white transition hover:bg-[#E56703]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() =>
          //function state update menue false true
            setIsMenuOpen((previous) => !previous)
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#F3E8D8] text-[#38340E] transition hover:border-[#FFA13D] hover:text-[#E56703] lg:hidden"
          aria-label="Open navigation menu"
        >
          {isMenuOpen ? (
            //lucid react for mobile meue
            <X size={24} />
          ) : (
            //for mobile
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-[#F3E8D8] bg-white px-4 pb-5 pt-4 lg:hidden">

          <div className="mx-auto max-w-7xl space-y-1">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Explore Events
            </NavLink>

            <NavLink
              to="/past-events"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Past Events
            </NavLink>

            <NavLink
              to="/organizer-login"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              Create Event
            </NavLink>

            {/* MOBILE ACCOUNT AREA */}
            <div className="mt-4 border-t border-[#F3E8D8] pt-4">

              {currentUser ? (
                <div className="space-y-3">
                  <Link
                    to="/tickets"
                    onClick={closeMenu}
                    className="block w-full rounded-xl border border-[#F3E8D8] px-5 py-3 text-center font-semibold text-[#38340E]"
                  >
                    My Tickets
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-[#FFA13D] px-5 py-3 font-semibold text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-xl border border-[#F3E8D8] px-4 py-3 text-center font-semibold text-[#38340E]"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-xl bg-[#FFA13D] px-4 py-3 text-center font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

        </div>
        </div>
        </div>
      )}

    </nav>
  );
  }

export default Navbar;