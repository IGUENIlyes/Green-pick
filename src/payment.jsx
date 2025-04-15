// PaymentMethods.jsx
import React from "react";
import "./payment.css";

const PaymentMethods = () => {
  return (
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
            <button className="option-button">Choisir cette méthode</button>
          </div>

          <div className="divider"></div>

          <div className="payment-option">
            <div className="payment-icon">
              <img src="CREEN PIck 39.png" alt="" />
            </div>
            <h2 className="option-title">Carte CB</h2>
            <p className="option-description">
              Payez rapidement et en toute sécurité avec votre Carte Bancaire
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
              Payez rapidement et en toute sécurité avec votre bitaqa dahabia.
            </p>
            <button className="option-button">Choisir cette méthode</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
