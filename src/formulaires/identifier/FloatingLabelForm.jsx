"use client";

import React from "react";
import { useState } from "react";
import "./floating-label-form.css";
import { Link } from "react-router-dom";

export default function FloatingLabelForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    // Ici vous pouvez ajouter votre logique d'authentification
  };

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
                    style={{ paddingRight: "90px" }} // Make room for the button
                  />
                  <button
                    type="button"
                    className="identifier-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#ffffff", // Changed from #666 to white
                      padding: "5px 10px",
                      cursor: "pointer",
                      zIndex: 2,
                      transition: "none",
                    }}
                    onMouseOver={(e) => {
                      // Prevent any hover color change
                      e.currentTarget.style.color = "#ffffff"; // Changed from #666 to white
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              <button type="submit" className="identifier-submit-button">
                S'identifier
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
