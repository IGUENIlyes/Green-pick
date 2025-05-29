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

  const transparentContainerStyle = {
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(5px)",
  };

  return (
    <>
      <header>
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
              <a href="#">S'identifier</a>
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

      <main>
        <div
          className="aka-ih-form-container"
          style={transparentContainerStyle}
        >
          <div className="aka-ih-background-circle aka-ih-top-right"></div>
          <div className="aka-ih-background-circle aka-ih-bottom-left"></div>

          <div className="aka-ih-form-content">
            <h1 className="aka-ih-form-title">S'identifier</h1>

            <form onSubmit={handleSubmit} className="aka-ih-login-form">
              <div className="aka-ih-form-field">
                <div className="aka-ih-input-container">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="aka-ih-form-input"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="aka-ih-form-label">
                    Email
                  </label>
                </div>
              </div>

              <div className="aka-ih-form-field">
                <div className="aka-ih-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="aka-ih-form-input aka-ih-password-input"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="password" className="aka-ih-form-label">
                    Mot de passe
                  </label>
                  <button
                    type="button"
                    className="aka-ih-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>
              </div>

              <button type="submit" className="aka-ih-submit-button">
                S'identifier
              </button>
            </form>

            <div className="aka-ih-profile-section">
              <p className="aka-ih-profile-title">
                Pas encore inscrit ? Choisissez votre profil:
              </p>
              <div className="aka-ih-profile-options">
                <Link to="/inscrire_commerçant" className="aka-ih-profile-link">
                  Commerçant
                </Link>
                <Link to="/inscrire_acheteur" className="aka-ih-profile-link">
                  Acheteur
                </Link>

                <Link
                  to="/inscrire_association"
                  className="aka-ih-profile-link"
                >
                  Association
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
