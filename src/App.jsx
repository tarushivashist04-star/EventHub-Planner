import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ExploreEvents from "./pages/ExploreEvents.jsx";
import PastEvents from "./pages/PastEvents.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";


function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<ExploreEvents />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;