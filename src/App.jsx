import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedOrganizerRoute from "./components/ProtectedOrganizerRoute.jsx";

import Home from "./pages/Home.jsx";
import ExploreEvents from "./pages/ExploreEvents.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import PastEvents from "./pages/PastEvents.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Tickets from "./pages/Tickets.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrganizerLogin from "./pages/OrganizerLogin.jsx";

function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<ExploreEvents />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/past-events"
          element={<PastEvents />}
        />

        <Route
          path="/tickets"
          element={<Tickets />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/organizer-login"
          element={<OrganizerLogin />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedOrganizerRoute>
              <Dashboard />
            </ProtectedOrganizerRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;