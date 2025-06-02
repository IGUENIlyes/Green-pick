/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import FormInput from "./FormInput";
import ProgressDots from "./ProgressDots";
import "./MultiStepForm.css";
import { Link, useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateStep(2)) {
      setError("Veuillez remplir tous les champs requis");
      return;
    }

    try {
      console.log('Sending merchant registration request with data:', {
        first_name: formData.prenom,
        last_name: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        commerce_name: formData.nomCommerce,
        commerce_address: formData.adresseCommerce,
        commercial_register: formData.registreCommerce,
        password: formData.motDePasse
      });

      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/merchant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.prenom,
          last_name: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          commerce_name: formData.nomCommerce,
          commerce_address: formData.adresseCommerce,
          commercial_register: formData.registreCommerce,
          password: formData.motDePasse
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Response data:', data);
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response: ${text}`);
      }

      if (response.ok) {
        // Store the tokens in localStorage
        if (data.tokens && data.tokens.access && data.tokens.refresh) {
          localStorage.setItem('access_token', data.tokens.access);
          localStorage.setItem('refresh_token', data.tokens.refresh);
          
          // Show success message
          alert("Inscription réussie !");
          
          // Redirect to the merchant interface
          navigate('/interface_commerçant');
        } else {
          throw new Error('Invalid response format: missing tokens');
        }
      } else {
        // Handle validation errors
        if (data.detail) {
          setError(data.detail);
        } else if (typeof data === 'object') {
          const errorMessage = Object.entries(data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
          setError(errorMessage || "Une erreur est survenue lors de l'inscription");
        } else {
          setError("Une erreur est survenue lors de l'inscription");
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
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
        {error && <div className="commercant-error-message">{error}</div>}

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
              <button
                type="button"
                className="commercant-btn-submit"
                onClick={handleContinue}
              >
                Continuer
              </button>
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
              <div className="commercant-form-buttons">
                <button
                  type="button"
                  className="commercant-btn-submit commercant-btn-back"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Retour
                </button>
                <button
                  type="button"
                  className="commercant-btn-submit"
                  onClick={handleContinue}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="commercant-form-step active-step">
              <div
                className="commercant-password-input-container"
                style={{ position: "relative" }}
              >
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  placeholder="Mot de passe"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  style={{ paddingRight: "90px" }}
                />
                <button
                  type="button"
                  className="commercant-toggle-password"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#000000",
                    padding: "5px 10px",
                    cursor: "pointer",
                    zIndex: 2,
                    transition: "none",
                    fontWeight: "bold",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#000000";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>

              <div
                className="commercant-password-input-container"
                style={{ position: "relative" }}
              >
                <FormInput
                  type="password"
                  name="confirmMotDePasse"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmMotDePasse}
                  onChange={handleInputChange}
                />
              </div>

              <div className="commercant-checkbox-group">
                <input
                  type="checkbox"
                  id="acceptConditions"
                  name="acceptConditions"
                  checked={formData.acceptConditions}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="acceptConditions">
                  J'accepte les Conditions d'utilisation
                </label>
              </div>

              <div className="commercant-form-buttons">
                <button
                  type="button"
                  className="commercant-btn-submit commercant-btn-back"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="commercant-btn-submit"
                  onClick={handleSubmit}
                  disabled={!formData.acceptConditions}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
