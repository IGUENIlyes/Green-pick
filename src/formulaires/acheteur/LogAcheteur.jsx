import MultiStepFormAssociation from "./MultiStepFormAssociation";
import "./association.css";
import { useEffect } from "react";
// Import the CSS file for styling
import { Link } from "react-router-dom";
function SignUpAssociation() {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Apply a temporary class to the body to ensure proper page layout
    document.body.classList.add("form-page-active");

    return () => {
      document.body.classList.remove("form-page-active");
    };
  }, []);

  return (
    <>
      <header>
        <a href="#" className="logo">
          <img className="logo-img" src="logo.png" alt="GreenPick Logo" />
          <span className="logo-text">
            <span className="green-letter">G</span>REEN
            <span className="orange-letter">P</span>ICK
          </span>
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <Link to="/identifier"> S'identifier </Link>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="association-page">
        {/* Nature animated elements */}
        <div className="nature-elements">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>
          <div className="leaf leaf4"></div>

          <div className="ripple ripple1"></div>
          <div className="ripple ripple2"></div>
          <div className="ripple ripple3"></div>

          <div className="glow-spot glow1"></div>
          <div className="glow-spot glow2"></div>
        </div>

        {/* Container with proper height and positioning */}
        <div className="association-app">
          <MultiStepFormAssociation />
        </div>
      </div>
    </>
  );
}

export default SignUpAssociation;
