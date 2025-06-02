"use client";

import React from "react";
import { useState } from "react";
import "./floating-label-form.css";
import { Link, useNavigate } from "react-router-dom";

// Function to decode JWT token
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export default function FloatingLabelForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Sending login request with:", { email, password });

      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // Decode the access token to get user information
        const decodedToken = decodeJWT(data.access);
        console.log("Decoded token:", decodedToken);

        if (!decodedToken) {
          throw new Error("Failed to decode token");
        }

        // Store tokens
        localStorage.setItem("tokens", JSON.stringify({
          access: data.access,
          refresh: data.refresh
        }));
        
        // Store user data with role from token
        const userData = {
          email: email, // We can use the email from the form since it's not in the token
          role: decodedToken.role,
          userId: decodedToken.user_id
        };
        console.log("Storing user data:", userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Show success message
        alert("Connexion réussie !");
        
        // Log before redirection
        console.log("Attempting to redirect user with role:", decodedToken.role);
        
        // Redirect based on user role
        switch (decodedToken.role) {
          case 'client':
            console.log("Redirecting to client interface");
            navigate('/interface_utilisateur');
            break;
          case 'merchant':
            console.log("Redirecting to merchant interface");
            navigate('/interface_commerçant');
            break;
          case 'association':
            console.log("Redirecting to association interface");
            navigate('/interface_association');
            break;
          default:
            console.log("Unknown role, redirecting to home");
            navigate('/');
            break;
        }
      } else {
        // Handle different types of error responses
        if (data.detail) {
          setError(data.detail);
        } else if (data.message) {
          setError(data.message);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("Email ou mot de passe incorrect");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message === "Server returned non-JSON response"
          ? "Erreur de communication avec le serveur"
          : "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already logged in
  React.useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      const storedTokens = localStorage.getItem('tokens');

      console.log("Checking stored user data:", storedUserData);
      console.log("Stored tokens:", storedTokens);

      if (storedUserData && storedTokens) {
        const userData = JSON.parse(storedUserData);
        const tokens = JSON.parse(storedTokens);

        if (tokens && tokens.access) {
          // Decode the stored token to verify role
          const decodedToken = decodeJWT(tokens.access);
          console.log("Decoded stored token:", decodedToken);

          if (decodedToken) {
            console.log("User is logged in, role:", decodedToken.role);
            // Redirect based on stored role
            switch (decodedToken.role) {
              case 'client':
                console.log("Redirecting to client interface");
                navigate('/interface_utilisateur');
                break;
              case 'merchant':
                console.log("Redirecting to merchant interface");
                navigate('/interface_commerçant');
                break;
              case 'association':
                console.log("Redirecting to association interface");
                navigate('/interface_association');
                break;
              default:
                console.log("Unknown role, staying on login page");
                break;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error checking stored data:", error);
      // Clear potentially corrupted data
      localStorage.removeItem('userData');
      localStorage.removeItem('tokens');
    }
  }, [navigate]);

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
              <Link to="/accueil">Accueil</Link>
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

      <div className="identifier-page">
        {/* Nature animated elements - similar to LogAssociation */}
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

        <div
          className="identifier-form-container"
          style={{ marginTop: "70px" }}
        >
          <div className="identifier-form-content">
            <h1 className="identifier-form-title">S'identifier</h1>

            {error && <div className="identifier-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="identifier-login-form">
              <div className="identifier-form-field">
                <div className="identifier-input-container">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="identifier-form-input"
                    placeholder="Email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="identifier-form-field">
                <div
                  className="identifier-input-container"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="identifier-form-input"
                    placeholder="Mot de passe"
                    required
                    disabled={isLoading}
                    style={{ paddingRight: "90px" }} // Make room for the button
                  />
                  <button
                    type="button"
                    className="identifier-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      padding: "5px 10px",
                      cursor: "pointer",
                      zIndex: 2,
                      transition: "none",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="identifier-submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "S'identifier"}
              </button>
            </form>

            <div className="identifier-profile-section">
              <p className="identifier-profile-title">
                Pas encore inscrit ? Choisissez votre profil:
              </p>
              <div className="identifier-profile-options">
                <Link
                  to="/inscrire_commerçant"
                  className="identifier-profile-link"
                >
                  Commerçant
                </Link>
                <Link
                  to="/inscrire_acheteur"
                  className="identifier-profile-link"
                >
                  Acheteur
                </Link>
                <Link
                  to="/inscrire_association"
                  className="identifier-profile-link"
                >
                  Association
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
