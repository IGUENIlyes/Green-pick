/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import FormInput from "./FormInput";
import ProgressDots from "./ProgressDots";
import "./MultiStepForm.css";
import { Link } from "react-router-dom";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    nomCommerce: "",
    adresseCommerce: "",
    registreCommerce: "",
    motDePasse: "",
    confirmMotDePasse: "",
    acceptConditions: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const validateStep = (step) => {
    // Validation simple pour chaque étape
    if (step === 0) {
      return (
        formData.nom && formData.prenom && formData.email && formData.telephone
      );
    } else if (step === 1) {
      return (
        formData.nomCommerce &&
        formData.adresseCommerce &&
        formData.registreCommerce
      );
    } else if (step === 2) {
      return (
        formData.motDePasse &&
        formData.confirmMotDePasse &&
        formData.motDePasse === formData.confirmMotDePasse &&
        formData.acceptConditions
      );
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(2)) {
      // Ici, vous pourriez envoyer les données à votre API
      console.log("Formulaire soumis avec succès:", formData);
      alert("Inscription réussie!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Animation pour le changement d'étape
    if (formRef.current) {
      formRef.current.classList.add("commercant-form-transition");
      setTimeout(() => {
        formRef.current.classList.remove("commercant-form-transition");
      }, 500);
    }
  }, [currentStep]);

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
              <Link to="/accueil"> Accueil</Link>
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

      <div className="commercant-form-container">
        {/* Add decorative elements */}
        <div className="form-decoration form-circle"></div>
        <div className="form-decoration form-triangle"></div>
        <div className="form-decoration form-rectangle"></div>

        <h2 className="commercant-form-title">Inscription Commerçant</h2>

        <form ref={formRef} className="commercant-multi-step-form">
          {currentStep === 0 && (
            <div className="commercant-form-step active-step">
              <FormInput
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleInputChange}
              />
              <FormInput
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleInputChange}
              />
              <FormInput
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
              />
              <FormInput
                type="tel"
                name="telephone"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="commercant-form-step active-step">
              <FormInput
                type="text"
                name="nomCommerce"
                placeholder="Nom du commerce"
                value={formData.nomCommerce}
                onChange={handleInputChange}
              />
              <FormInput
                type="text"
                name="adresseCommerce"
                placeholder="Adresse du commerce"
                value={formData.adresseCommerce}
                onChange={handleInputChange}
              />
              <FormInput
                type="text"
                name="registreCommerce"
                placeholder="N° du registe de commerce"
                value={formData.registreCommerce}
                onChange={handleInputChange}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="commercant-form-step active-step">
              <div className="commercant-password-input-container">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  placeholder="Mot de passe"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="commercant-toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
              <FormInput
                type={showPassword ? "text" : "password"}
                name="confirmMotDePasse"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmMotDePasse}
                onChange={handleInputChange}
              />
              <div className="commercant-checkbox-container">
                <input
                  type="checkbox"
                  id="acceptConditions"
                  name="acceptConditions"
                  checked={formData.acceptConditions}
                  onChange={handleInputChange}
                />
                <label htmlFor="acceptConditions">
                  J'accepte les Conditions d'utilisation
                </label>
              </div>
            </div>
          )}

          <ProgressDots currentStep={currentStep} totalSteps={3} />

          <button
            type="button"
            className="commercant-btn-continue"
            onClick={currentStep < 2 ? handleContinue : handleSubmit}
          >
            {currentStep < 2 ? "Continuer" : "S'inscrire"}
          </button>

          <div className="commercant-login-link">
            Déjà inscrit(e) ?{" "}
            <Link to="/identifier" className="commercant-identifier-link">
              {" "}
              S'identifier
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
