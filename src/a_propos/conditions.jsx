/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Add framer-motion import

export default function Conditions() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll vers le haut au montage du composant
  }, []);
  
  // Définition des styles avec des constantes JS
  const containerStyle = {
    marginTop: "60px",
    backgroundColor: "#0a5043",
    backgroundImage: "linear-gradient(135deg, #0a5043 0%, #083b32 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    color: "white",
    padding: "2rem",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  };

  const backgroundLines = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0", // Nouvelle propriété
    bottom: "0", // Nouvelle propriété
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, rgba(50, 120, 80, 0.1) 25%, transparent 25%, transparent 40%, rgba(40, 100, 60, 0.1) 50%, rgba(5, 10, 60, 0.1) 75%, transparent 5%, transparent)",
    backgroundSize: "40px 40px",
    backgroundRepeat: "repeat",
    zIndex: "1",
  };

  const contentStyle = {
    maxWidth: "800px",
    width: "100%",
    padding: "0 1rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
    color: "white",
  };

  const sectionStyle = {
    marginBottom: "1.5rem",
  };

  const sectionTitleStyle = {
    zIndex: "2",
    color: "#4ceb9b",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
  };

  const sectionNumberStyle = {
    color: "#4ceb9b",
    marginRight: "0.5rem",
  };

  const sectionTextStyle = {
    lineHeight: "1.5",
    marginBottom: "1rem",
  };

  const sectionListStyle = {
    listStyleType: "none",
    paddingLeft: "0",
    marginTop: "0.5rem",
    cursor: "text",
  };

  const listItemStyle = {
    position: "relative",
    paddingLeft: "1.2rem",
    marginBottom: "0.5rem",
    lineHeight: "1.5",
  };

  const bulletPointStyle = {
    position: "absolute",
    left: "0",
    color: "#4ceb9b",
  };

  const highlightStyle = {
    color: "#4ceb9b",
    fontWeight: "bold",
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
              <a href="#">Accueil</a>
            </li>
            <li>
              <Link to="/identifier"> S'identifier </Link>
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
        <div style={containerStyle}>
          {/* Animated background elements */}
          <div style={backgroundLines}></div>
          
          {/* Floating leaves animation */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              initial={{ 
                x: -50, 
                y: Math.random() * window.innerHeight, 
                rotate: Math.random() * 360,
                opacity: 0.3
              }}
              animate={{ 
                x: window.innerWidth + 100,
                rotate: [0, 360],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight + 50,
                  Math.random() * window.innerHeight - 50
                ]
              }}
              transition={{ 
                duration: 25 + Math.random() * 15, 
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                position: "absolute",
                width: 20 + Math.random() * 15,
                height: 20 + Math.random() * 15,
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234ceb9b60"><path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22L6.66,19.7C7.14,19.87,7.64,20,8,20C19,20,22,3,22,3C21,5,14,5.25,9,6.25C4,7.25,2,11.5,2,13.5C2,15.5,3.75,17.25,3.75,17.25C7,8,17,8,17,8z" /></svg>')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                zIndex: 0,
                pointerEvents: "none"
              }}
            />
          ))}
          
          {/* Floating bubbles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 50,
                scale: 0.3 + Math.random() * 0.7,
                opacity: 0.2
              }}
              animate={{ 
                y: -100,
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth + 100,
                  Math.random() * window.innerWidth - 100
                ]
              }}
              transition={{ 
                duration: 20 + Math.random() * 20, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
              style={{
                position: "absolute",
                width: 20 + Math.random() * 40,
                height: 20 + Math.random() * 40,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(76, 235, 155, 0.3), rgba(8, 59, 50, 0.1) 70%)`,
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.3)",
                filter: "blur(1px)",
                zIndex: 0,
                pointerEvents: "none"
              }}
            />
          ))}
          
          {/* Light beam animation */}
          <motion.div
            initial={{ opacity: 0.05 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.05, 1],
              rotate: [0, 3, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              width: "150%",
              height: "150%",
              top: "-25%",
              left: "-25%",
              background: "radial-gradient(circle at 30% 30%, rgba(76, 235, 155, 0.07), transparent 70%)",
              pointerEvents: "none",
              zIndex: 0
            }}
          />
          
          <div style={contentStyle}>
            {/* Animated title */}
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                ...titleStyle,
                position: "relative"
              }}
              className="shimmer-title"
            >
              Conditions Générales D'Utilisation (CGU)
            </motion.h1>
            
            {/* Animated sections with staggered children */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {/* Section 1 */}
              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>1.</span> Présentation de
                  GreenPick
                </motion.h2>
                <p style={sectionTextStyle}>
                  <motion.span 
                    style={highlightStyle}
                    whileHover={{ scale: 1.05 }}
                  >
                    GreenPick
                  </motion.span> est une plateforme
                  qui met en relation les commerçants, les étudiants et les
                  associations afin de réduire le gaspillage alimentaire. Les
                  commerçants peuvent vendre leurs invendus à prix réduit tandis
                  que les associations peuvent bénéficier de dons alimentaires.
                </p>
              </motion.section>

              {/* Rest of sections with the same animation pattern */}
              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>2.</span> Inscription et
                  Utilisation
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    L'inscription est gratuite et ouverte aux commerçants,
                    étudiants et associations.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Chaque utilisateur doit fournir des informations exactes et
                    tenir son compte à jour.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    L'accès et l'utilisation de GreenPick impliquent l'acceptation
                    pleine et entière des présentes conditions.
                  </li>
                </ul>
              </motion.section>

              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>3.</span> Obligations des
                  Commerçants
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Mettre en ligne des produits conformes aux normes sanitaires.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Indiquer clairement les délais et les modalités de retrait des
                    produits.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Fournir des informations exactes sur les stocks et les prix.
                  </li>
                </ul>
              </motion.section>

              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>4.</span> Rôles des
                  Associations et des Acheteurs
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Les associations peuvent bénéficier de dons alimentaires en
                    fonction des disponibilités.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Les acheteurs peuvent acheter des invendus à prix réduit.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Toute réservation doit être honorée dans les délais annoncés.
                  </li>
                </ul>
              </motion.section>

              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>5.</span> Paiements et Frais
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    L'achat des invendus se fait directement via la plateforme.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    <span style={highlightStyle}>GreenPick</span> peut prélever
                    une commission sur chaque transaction effectuée.
                  </li>
                </ul>
              </motion.section>

              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>6.</span> Responsabilités et
                  Limitations
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    <span style={highlightStyle}>GreenPick</span> n'est pas
                    responsable de la qualité des produits vendus par les
                    commerçants.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    En cas de litige, GreenPick s'engage à faciliter la
                    communication entre les parties.
                  </li>
                </ul>
              </motion.section>

              <motion.section 
                style={sectionStyle}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.h2 
                  style={sectionTitleStyle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={sectionNumberStyle}>7.</span> Résiliation du Compte
                </motion.h2>
                <ul style={sectionListStyle}>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    Tout compte ne respectant pas les présentes CGU peut être
                    suspendu ou supprimé.
                  </li>
                  <li style={listItemStyle}>
                    <span style={bulletPointStyle}>•</span>
                    En cas de fraude ou de comportement abusif, l'utilisateur sera
                    exclu de la plateforme.
                  </li>
                </ul>
              </motion.section>
            </motion.div>
          </div>
          
          {/* Animated sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{ 
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 10,
                repeatDelay: Math.random() * 10
              }}
              style={{
                position: "absolute",
                width: 3 + Math.random() * 5,
                height: 3 + Math.random() * 5,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                pointerEvents: "none",
                zIndex: 0
              }}
            />
          ))}
        </div>
      </main>
      
      {/* Add CSS for animation effects */}
      <style jsx="true">{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        
        .shimmer-title {
          overflow: hidden;
          position: relative;
        }
        
        .shimmer-title::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
        
        main {
          overflow: hidden;
        }
        
        section {
          position: relative;
        }
        
        h1, h2, p, li {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </>
  );
}
