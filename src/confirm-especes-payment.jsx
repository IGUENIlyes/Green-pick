import "./confirm-especes-payment.css";
import { Link } from "react-router-dom";
import React from "react";

const PaiementEspeces = ({ montant = "XXXX.00DZ" }) => {



    const backgroundLines = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundImage: "url('accueil.png')",
        opacity: "0.9",
        backgroundSize: "cover",
        
        zIndex: "-1",
      };
  return (
    <>
      <header className="didi">
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
              <Link to="/Login"> S'identifier </Link>
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
      <div className="paiement-container" style={{ position: 'relative' }}>
        <div style={backgroundLines}></div>
        <div className="paiement-card">
          <div className="paiement-header">
            <div className="icon-container">
              <svg className="money-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M2 10H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 14H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="paiement-title">Paiement En Espèces</h1>
          </div>

          <p className="paiement-description">Vous paierez à notre point de vente.</p>

          <div className="divider"></div>

          <div className="paiement-footer">
            <div className="total-container">
              <span className="total-label">Total à payer :</span>
              <span className="total-amount">{montant}</span>
            </div>

            

            <Link to="/confirmation">
            <button className="confirm-button">
              Confirmer la commande
              <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaiementEspeces
