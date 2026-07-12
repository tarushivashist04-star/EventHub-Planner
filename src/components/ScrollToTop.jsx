//when user scroll the page automatically scroll to the top of page
//used  for props change
import { useEffect } from "react";
//for knowing which urlis current there
import { useLocation } from "react-router-dom";

// localhost... location

function ScrollToTop() {
  const { pathname } = useLocation();
//sideeffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  //pathname 2nd argument
  //like scrollto events ..

  return null;
}

export default ScrollToTop;