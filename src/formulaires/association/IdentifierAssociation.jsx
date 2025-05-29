import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./association.css";
import "./IdentifierAssociation.css";
import FormInputAssociation from "./FormInputAssociation";

function IdentifierAssociation() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Apply class for background animations
    document.body.classList.add("form-page-active");

    return () => {
      document.body.classList.remove("form-page-active");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic here
    console.log("Login submitted:", formData);
    // API call would go here
  };

  return (
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

      <div className="association-app">
        <div className="association-login-container">
          {/* Add decorative elements */}
          <div className="form-decoration form-circle"></div>
          <div className="form-decoration form-triangle"></div>
          <div className="form-decoration form-rectangle"></div>

          <h2 className="association-login-title">Connexion Association</h2>

          <form className="association-login-form" onSubmit={handleSubmit}>
            <FormInputAssociation
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

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

            <div className="association-forgot-password">
              <Link to="/reset-password">Mot de passe oublié ?</Link>
            </div>

            <button type="submit" className="association-btn-login">
              Se connecter
            </button>

            <div className="association-signup-link">
              Pas encore de compte ?{" "}
              <Link
                to="/signup-association"
                className="association-register-link"
              >
                S'inscrire
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IdentifierAssociation;
