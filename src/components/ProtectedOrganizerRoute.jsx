import { Navigate } from "react-router-dom";

function ProtectedOrganizerRoute({ children }) {
  const isOrganizerLoggedIn =
    localStorage.getItem("eventhub-organizer-auth") === "true";

  if (!isOrganizerLoggedIn) {
    return (
      <Navigate
        to="/organizer-login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedOrganizerRoute;