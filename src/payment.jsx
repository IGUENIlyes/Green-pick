/* eslint-disable no-unused-vars */
// PaymentMethods.jsx
import React, { useEffect, useState } from "react";
import "./payment.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PaymentMethods = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Create animated background elements when component mounts - simplified
  useEffect(() => {
    // Create floating elements for background - reduced count and opacity
    const createFloatingElements = () => {
      const container = document.querySelector(".payment-container");
      if (!container) return;

      // Reduced number of particles from 25 to 8
      for (let i = 0; i < 8; i++) {
        const element = document.createElement("div");
        element.className = "floating-particle";

        // Random properties with reduced visibility
        const size = Math.random() * 30 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        // Longer durations for more subtle movement
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 3;
        // Much lower opacity
        const opacity = Math.random() * 0.08 + 0.02;

        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        element.style.opacity = opacity;

        container.appendChild(element);
      }
    };

    createFloatingElements();
    setIsLoaded(true);

    return () => {
      // Clean up floating elements on unmount
      document
        .querySelectorAll(".floating-particle")
        .forEach((el) => el.remove());
    };
  }, []);

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Simplified header animations
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="enhanced-header"
      >
        <a href="#" className="logo">
          <img className="oops" src="logo.png" alt="image"></img>
          <span className="logo-text">
            {/* Changed green color to a darker, more muted green */}
            <span className="green-letter" style={{ color: "#4a6c4a" }}>
              G
            </span>
            REEN
            <span className="orange-letter">P</span>ICK
          </span>
        </a>
        <nav>
          <ul>
            {["Accueil", "S'identifier", "À propos", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => {
                      if (item === "À propos" || item === "Contact") {
                        e.preventDefault();
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </motion.header>

      <main>
        <div
          className="payment-container"
          style={{
            background: "linear-gradient(135deg, #00261a 0%, #003d29 100%)",
            boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Simplified background elements */}
          <div className="gradient-overlay" style={{ opacity: 0.3 }}></div>

          {isLoaded && (
            <motion.div
              className="payment-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              // Overriding any potential green shadows or glows
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h1
                className="payment-title"
                style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)" }}
              >
                Méthodes De Paiement
              </h1>

              <div className="payment-options">
                <motion.div
                  className="payment-option"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="payment-icon">
                    <img className="img34" src="CREEN PIck 34.png" alt="lyes" />
                  </div>
                  <h2 className="option-title">En Espèces</h2>
                  <p className="option-description">
                    Payez en espèces directement à notre point de vente.
                  </p>
                  <Link to="/paiement_especes">
                    <motion.button
                      className="option-button"
                      whileHover={{
                        backgroundColor: "#ff7b00",
                      }}
                    >
                      Choisir cette méthode
                    </motion.button>
                  </Link>
                </motion.div>

                <div className="divider"></div>

                <motion.div
                  className="payment-option"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="payment-icon">
                    <img src="CREEN PIck 39.png" alt="" />
                  </div>
                  <h2 className="option-title">Carte CB</h2>
                  <p className="option-description">
                    Payez rapidement et en toute sécurité avec votre Carte
                    Bancaire
                  </p>
                  <motion.button
                    className="option-button"
                    whileHover={{
                      backgroundColor: "#ff7b00",
                    }}
                  >
                    Choisir cette méthode
                  </motion.button>
                </motion.div>

                <div className="divider"></div>

                <motion.div
                  className="payment-option"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="payment-icon">
                    <img src="CREEN PIck 35.png" alt="" />
                  </div>
                  <h2 className="option-title">Bitaqa Dahabia</h2>
                  <p className="option-description">
                    Payez rapidement et en toute sécurité avec votre bitaqa
                    dahabia.
                  </p>
                  <motion.button
                    className="option-button"
                    whileHover={{
                      backgroundColor: "#ff7b00",
                    }}
                  >
                    Choisir cette méthode
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default PaymentMethods;
