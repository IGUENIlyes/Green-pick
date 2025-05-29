import { useState } from "react";
import "./MultiStepFormAssociation.css";
import FormInputAssociation from "./FormInputAssociation";
import { Link } from "react-router-dom";
const MultiStepFormAssociation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    respName: "",
    email: "",
    phone: "",
    associationName: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted:", formData);
    // You can add API call to submit the data
    alert("Inscription réussie !");
  };

  return (
    <div className="association-form-container">
      {/* Add decorative elements */}
      <div className="form-decoration form-circle"></div>
      <div className="form-decoration form-triangle"></div>
      <div className="form-decoration form-rectangle"></div>

      <h2 className="association-form-title">Inscription Association</h2>

      <div className="association-multi-step-form">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="association-form-step association-form-transition">
            <FormInputAssociation
              label="Nom & prénom du responsable"
              type="text"
              name="respName"
              value={formData.respName}
              onChange={handleChange}
            />

            <FormInputAssociation
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <FormInputAssociation
              label="Téléphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <button
              className="association-btn-continue"
              onClick={() => setCurrentStep(2)}
            >
              Continuer
            </button>

            <div className="association-login-link">
              Déjà inscrit?
              <Link to="/identifier" className="association-identifier-link">
                {" "}
                S'identifier
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Association Information */}
        {currentStep === 2 && (
          <div className="association-form-step association-form-transition">
            <FormInputAssociation
              label="Nom de l'association"
              type="text"
              name="associationName"
              value={formData.associationName}
              onChange={handleChange}
            />

            <FormInputAssociation
              label="Adresse de l'association"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="association-buttons-container">
              <button
                className="association-btn-return"
                onClick={() => setCurrentStep(1)}
              >
                Retour
              </button>

              <button
                className="association-btn-continue"
                onClick={() => setCurrentStep(3)}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Password Setting */}
        {currentStep === 3 && (
          <div className="association-form-step association-form-transition">
            <div className="association-password-input-container">
              <FormInputAssociation
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="association-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Cacher" : "Voir"}
              </button>
            </div>

            <div className="association-password-input-container">
              <FormInputAssociation
                label="Confirmer le mot de passe"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="association-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Cacher" : "Voir"}
              </button>
            </div>

            <div className="association-checkbox-container">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                J'accepte les conditions générales d'utilisation
              </label>
            </div>

            <div className="association-buttons-container">
              <button
                className="association-btn-return"
                onClick={() => setCurrentStep(2)}
              >
                Retour
              </button>

              <button
                className="association-btn-continue"
                onClick={handleSubmit}
                disabled={!formData.agreeTerms}
              >
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepFormAssociation;
