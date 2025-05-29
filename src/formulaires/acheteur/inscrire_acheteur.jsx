import { useState } from "react";
import "./acheteur.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { Link } from "react-router-dom";

const InscrireAcheteur = () => {
  const backgroundLines = {
    position: "fixed", // Changed from "absolute" to "fixed"
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh", // Changed to viewport height to ensure full coverage
    backgroundImage:
      "linear-gradient(135deg, rgba(50, 120, 80, 0.1) 25%, transparent 25%, transparent 10%, rgba(40, 100, 60, 0.1) 50%, rgba(5, 10, 60, 0.1) 75%, transparent 5%, transparent)",
    backgroundSize: "40px 40px",
    zIndex: "-1",
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    confirmMotDePasse: "",
    acceptConditions: false,
  });
  const [direction, setDirection] = useState("next");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const nextStep = () => {
    setDirection("next");
    setCurrentStep(2);
  };

  const prevStep = () => {
    setDirection("prev");
    setCurrentStep(1);
  };

  return (
    <>
      <header className="didi">
        <a href="#" className="logo">
          <img className="oops" src="logo.png" alt="image"></img>
          GREENPICK
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <Link to="/Login"> S'identifier </Link>
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

      <div className="acheteur-form-container">
        <div style={backgroundLines}></div>
        <div
          className={`acheteur-form-wrapper ${
            direction === "next"
              ? "acheteur-slide-left"
              : "acheteur-slide-right"
          }`}
        >
          {currentStep === 1 ? (
            <StepOne
              formData={formData}
              handleInputChange={handleInputChange}
              nextStep={nextStep}
            />
          ) : (
            <StepTwo
              formData={formData}
              handleInputChange={handleInputChange}
              prevStep={prevStep}
            />
          )}
        </div>

        <div className="acheteur-step-indicators">
          <div
            className={`acheteur-step-dot ${currentStep === 1 ? "active" : ""}`}
            onClick={prevStep}
          ></div>
          <div
            className={`acheteur-step-dot ${currentStep === 2 ? "active" : ""}`}
            onClick={nextStep}
          ></div>
        </div>

        <div className="acheteur-login-link">
          Déjà inscrit(e)? 
          <Link to="/identifier" > S'identifier </Link>
        </div>
      </div>
    </>
  );
};

export default InscrireAcheteur;
