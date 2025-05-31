import { useState } from "react";
import "./MultiStepFormAssociation.css";
import FormInputAssociation from "./FormInputAssociation";
import { Link, useNavigate } from "react-router-dom";

const MultiStepFormAssociation = () => {
  const navigate = useNavigate();
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
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/association/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          responsible_full_name: formData.respName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          association_name: formData.associationName,
          association_address: formData.address
        }),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();

      if (response.ok) {
        // Store the tokens in localStorage
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        
        // Show success message
        alert("Inscription réussie !");
        
        // Redirect to the association dashboard or home page
        navigate('/interface_association');
      } else {
        // Handle validation errors
        if (data.detail) {
          setError(data.detail);
        } else {
          const errorMessage = Object.entries(data)
            .map(([key, value]) => `${key}: ${value.join(', ')}`)
            .join('\n');
          setError(errorMessage || "Une erreur est survenue lors de l'inscription");
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message === "Server returned non-JSON response") {
        setError("Le serveur n'est pas disponible. Veuillez réessayer plus tard.");
      } else {
        setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      }
    }
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
                style={{ color: "#ffffff" }} // Added white text color
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
            <div
              className="association-password-input-container"
              style={{ position: "relative" }}
            >
              <FormInputAssociation
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ paddingRight: "70px" }} // Make room for the button
              />
              <button
                type="button"
                className="association-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#000000", // Black text
                  fontWeight: "bold",
                  padding: "5px 10px",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "none",
                }}
                onMouseOver={(e) => {
                  // Prevent any hover color change
                  e.currentTarget.style.color = "#000000";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {showPassword ? "Cacher" : "Voir"}
              </button>
            </div>

            <div
              className="association-password-input-container"
              style={{ position: "relative" }}
            >
              <FormInputAssociation
                label="Confirmer le mot de passe"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ paddingRight: "70px" }} // Make room for the button
              />
              <button
                type="button"
                className="association-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#000000", // Black text
                  fontWeight: "bold",
                  padding: "5px 10px",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "none",
                }}
                onMouseOver={(e) => {
                  // Prevent any hover color change
                  e.currentTarget.style.color = "#000000";
                  e.currentTarget.style.background = "transparent";
                }}
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
                style={{ color: "#ffffff" }} // Added white text color
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
