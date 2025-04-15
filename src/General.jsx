import { Outlet } from "react-router-dom";
import React from "react";
export default function General() {
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

      <Outlet />

      <footer id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GreenPick</h3>
            <p>Bon pour vous, bon pour la planète.</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Liens Utiles</h3>
            <ul>
              <li>
                <a href="#">À propos de nous</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Nous contacter</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> 123 Rue Écologique,
                75000 Paris
              </li>
              <li>
                <i className="fas fa-phone"></i> +33 1 23 45 67 89
              </li>
              <li>
                <i className="fas fa-envelope"></i> contact@greenpick.fr
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2025 GreenPick. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
