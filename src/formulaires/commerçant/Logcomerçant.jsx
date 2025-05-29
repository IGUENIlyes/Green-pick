import MultiStepForm from "./MultiStepForm";
import "./mouhii.css";
import { useEffect } from "react";

function SignUpCommerçant() {
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
    <div className="commercant-page">
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
      <div className="commercant-app">
        <MultiStepForm />
      </div>
    </div>
  );
}

// Fix the capitalization of the component name (React best practice)
export default SignUpCommerçant;
