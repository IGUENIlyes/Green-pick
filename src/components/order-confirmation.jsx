/* eslint-disable no-unused-vars */
import "./order-confirmation.css";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const handleDownload = () => {
    // Logique pour télécharger le reçu
    console.log("Téléchargement du reçu");
  };

  return (
    <>
      <div className="order-confirmation-container">
        <div className="order-container">
          <img src="forme sin (1).png" alt="ooo" className="defir" />
          {/* Motif de fond */}
          <div className="background-pattern"></div>

          <div className="content-wrapper">
            {/* Colonne gauche */}
            <div className="left-column">
              <motion.div
                className="check-icon-container"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 },
                }}
              >
                <motion.svg
                  className="check-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <path
                    d="M5 12L10 17L19 8"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>

              <h1 className="title">Confirmation De Commande</h1>

              <p className="confirmation-message">
                Votre commande a été confirmée avec succès,
                <br />
                nous vous remercions pour votre confiance.
              </p>

              <div className="shopping-bag-container">
                <img
                  src="bag.png"
                  alt="Shopping Bag"
                  className="shopping-bag"
                />
              </div>
            </div>

            {/* Ligne verticale de séparation */}
            <div className="vertical-divider"></div>

            {/* Colonne droite */}
            <div className="right-column">
              <div className="receipt-card">
                <motion.div
                  className="receipt-check-container"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                >
                  <motion.svg
                    className="receipt-check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>

                <h2 className="receipt-title">Reçu De Commande</h2>
                <p className="receipt-subtitle">
                  Veuillez payer ce montant XXXX DZD une fois au magasin
                </p>

                <div className="payment-details-container">
                  <h3 className="details-title">Détails Du Paiement</h3>

                  <div className="details-list">
                    <div className="detail-row">
                      <span className="detail-label">Nom du Client :</span>
                      <span className="detail-value">[Nom du client]</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Nom du commerce :</span>
                      <span className="detail-value">Nom</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Paniers :</span>
                      <span className="detail-value">......</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">
                        Montant du paiement :
                      </span>
                      <span className="detail-value">XXXX DZD</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Date du paiement :</span>
                      <span className="detail-value">Date</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Statut du paiement :</span>
                      <span className="detail-value">Non Confirmé</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">
                        Méthode de paiement :
                      </span>
                      <span className="detail-value">Espèces</span>
                    </div>
                  </div>
                </div>

                <div className="download-section">
                  <h3 className="download-title">Téléchargez Votre Reçu</h3>

                  <motion.button
                    onClick={handleDownload}
                    className="download-button"
                    whileHover={{
                      y: -5,
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 },
                    }}
                  >
                    Télécharger
                    <svg
                      className="download-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="pied">
            <p className="pied-text">
              Merci pour votre commande! Nous apprécions votre commande et avons
              hâte de vous servir à nouveau.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
