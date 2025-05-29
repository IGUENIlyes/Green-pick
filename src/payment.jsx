// PaymentMethods.jsx
import React from "react";
import "./payment.css";
import { Link } from "react-router-dom";

const PaymentMethods = () => {
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
        <div className="payment-container">
          <div className="payment-wrapper">
            <h1 className="payment-title">Méthodes De Paiement</h1>

            <div className="payment-options">
              <div className="payment-option">
                <div className="payment-icon">
                  <img className="img34" src="CREEN PIck 34.png" alt="lyes" />
                </div>
                <h2 className="option-title">En Espèces</h2>
                <p className="option-description">
                  Payez en espèces directement à notre point de vente.
                </p>
                <Link to="/paiement_especes">
                <button className="option-button">Choisir cette méthode</button>
                </Link>
              </div>

              <div className="divider"></div>

              <div className="payment-option">
                <div className="payment-icon">
                  <img src="CREEN PIck 39.png" alt="" />
                </div>
                <h2 className="option-title">Carte CB</h2>
                <p className="option-description">
                  Payez rapidement et en toute sécurité avec votre Carte
                  Bancaire
                </p>
                <button className="option-button">Choisir cette méthode</button>
              </div>

              <div className="divider"></div>

              <div className="payment-option">
                <div className="payment-icon">
                  <img src="CREEN PIck 35.png" alt="" />
                </div>
                <h2 className="option-title">Bitaqa Dahabia</h2>
                <p className="option-description">
                  Payez rapidement et en toute sécurité avec votre bitaqa
                  dahabia.
                </p>
                <button className="option-button">Choisir cette méthode</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaymentMethods;
