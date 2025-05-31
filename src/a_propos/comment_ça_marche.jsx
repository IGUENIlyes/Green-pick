/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./comment_ça_marche.css";
import { Link } from "react-router-dom";

const CommentCaMarche = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const userTypes = [
    {
      id: 1,
      icon: "🛒",
      title: "acheteur",
      description:
        "Trouvez des produits à prix réduits et luttez contre le gaspillage alimentaire.",
      sectionId: "buyer-steps",
    },
    {
      id: 2,
      icon: "🏪",
      title: "commerçant",
      description:
        "Valorisez vos invendus et réduisez vos pertes tout en fidélisant une clientèle engagée.",
      sectionId: "merchant-steps",
    },
    {
      id: 3,
      icon: "💚",
      title: "association",
      description:
        "Accédez à des dons alimentaires pour soutenir vos actions solidaires.",
      sectionId: "association-steps",
    },
  ];

  // Add state for buyer steps
  const [currentBuyerStep, setCurrentBuyerStep] = useState(1);
  const totalBuyerSteps = 5;

  // Buyer steps data
  const buyerSteps = [
    {
      step: 1,
      title: "ACHETEUR",
      subtitle: "ÉTAPE 01",
      description: "Inscrivez-vous en créant votre compte en quelques clics!",
      image: "/aqcicni.png", // Replace with your actual image path
    },
    {
      step: 2,
      title: "ACHETEUR",
      subtitle: "ÉTAPE 02",
      description:
        "Choisissez votre emplacement et parcourez les produits disponibles sur notre site.",
      image: "/aqcicni.png",
    },
    {
      step: 3,
      title: "ACHETEUR",
      subtitle: "ÉTAPE 03",
      description:
        "Sélectionnez les produits que vous voulez et ajoutez-les à votre panier.",
      image: "/aqcicni.png",
    },
    {
      step: 4,
      title: "ACHETEUR",
      subtitle: "ÉTAPE 04",
      description:
        "Payez directement en ligne par ccpdz ou bitaqa dahabia, ou bien une fois sur place.",
      image: "/aqcicni.png",
    },
    {
      step: 5,
      title: "ACHETEUR",
      subtitle: "ÉTAPE 05",
      description:
        "Rendez-vous au magasin à l'heure de collecte indiquée, montrez votre reçu et repartez avec vos produits !",
      image: "/assets/images/buyer-step5.jpg",
    },
  ];

  // Need to add state for merchant steps - place this right after the buyer steps state
  const [currentMerchantStep, setCurrentMerchantStep] = useState(1);
  const totalMerchantSteps = 3;

  // Merchant steps data - place this after buyerSteps array
  const merchantSteps = [
    {
      step: 1,
      title: "COMMERÇANT",
      subtitle: "ÉTAPE 01",
      description:
        "Créez votre compte commerçant en quelques minutes et accédez à votre espace de vente.",
      image: "/taqcictni.png", // Changed from aqcicni.png to taqcictni.png
    },
    {
      step: 2,
      title: "COMMERÇANT",
      subtitle: "ÉTAPE 02",
      description:
        "Prenez une photo de vos produits, fixez un prix attractif et mettez-les en ligne pour les étudiants et associations.",
      image: "/taqcictni.png", // Changed from aqcicni.png to taqcictni.png
    },
    {
      step: 3,
      title: "COMMERÇANT",
      subtitle: "ÉTAPE 03",
      description:
        "Les acheteurs réservent en ligne, passent récupérer leurs produits en magasin, et vous gagnez un revenu supplémentaire tout en évitant le gaspillage !",
      image: "/taqcictni.png", // Changed from aqcicni.png to taqcictni.png
    },
  ];

  // Add state for association steps
  const [currentAssociationStep, setCurrentAssociationStep] = useState(1);
  const totalAssociationSteps = 3;

  // Association steps data
  const associationSteps = [
    {
      step: 1,
      title: "ASSOCIATION",
      subtitle: "ÉTAPE 01",
      description:
        "Créez votre compte et renseignez vos informations pour accéder aux dons des commerçants.",
      image: "/wina.png",
    },
    {
      step: 2,
      title: "ASSOCIATION",
      subtitle: "ÉTAPE 02",
      description:
        "Consultez la liste des invendus offerts par les commerçants et réservez ceux dont vous avez besoin.",
      image: "/wina.png",
    },
    {
      step: 3,
      title: "ASSOCIATION",
      subtitle: "ÉTAPE 03",
      description:
        "Passez chez le commerçant pour récupérer les produits et redistribuez-les aux personnes dans le besoin.",
      image: "/wina.png",
    },
  ];

  // Add this state for FAQ accordion functionality after the existing states
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Add this FAQ data after your steps data
  const faqData = [
    {
      id: 1,
      question: "Qu'est-ce que GreenPick ?",
      answer:
        "GreenPick est une plateforme qui connecte les commerces ayant des invendus alimentaires avec des acheteurs ou des associations. Notre mission est de réduire le gaspillage alimentaire tout en permettant aux consommateurs d'accéder à des produits de qualité à prix réduit.",
    },
    {
      id: 2,
      question: "Comment fonctionne la réduction des prix ?",
      answer:
        "Les commerçants proposent leurs invendus à prix réduits, généralement entre 30% et 70% du prix original, en fonction de la date limite de consommation et de leur politique tarifaire.",
    },
    {
      id: 3,
      question:
        "Est-ce que je peux faire des dons directement via l'application ?",
      answer:
        "Oui, les commerçants peuvent choisir de donner gratuitement certains produits aux associations plutôt que de les vendre. Les associations peuvent parcourir ces offres et les réserver.",
    },
    {
      id: 4,
      question: "Comment s'assurer de la qualité des produits ?",
      answer:
        "Tous les produits proposés sur GreenPick sont encore parfaitement consommables. Ils approchent de leur date limite de consommation mais restent de qualité. Les commerçants s'engagent à respecter les normes d'hygiène et de sécurité alimentaire.",
    },
    {
      id: 5,
      question: "Comment créer un compte association ?",
      answer:
        "Pour créer un compte association, vous devez vous inscrire et sélectionner le profil 'Association'. Vous devrez fournir des documents justificatifs comme les statuts de votre association pour validation.",
    },
  ];

  // Function to toggle FAQ items
  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  // Navigation handlers
  const nextStep = () => {
    if (currentBuyerStep < totalBuyerSteps) {
      setCurrentBuyerStep(currentBuyerStep + 1);
    }
  };

  const prevStep = () => {
    if (currentBuyerStep > 1) {
      setCurrentBuyerStep(currentBuyerStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentBuyerStep(step);
  };

  const getSlideClassName = (stepIndex) => {
    const step = stepIndex + 1;
    if (step === currentBuyerStep) {
      return "step-slide current";
    } else if (step < currentBuyerStep) {
      return "step-slide previous";
    } else {
      return "step-slide hidden";
    }
  };

  // Navigation handlers for merchant steps - place this after buyerSteps handlers
  const nextMerchantStep = () => {
    if (currentMerchantStep < totalMerchantSteps) {
      setCurrentMerchantStep(currentMerchantStep + 1);
    }
  };

  const prevMerchantStep = () => {
    if (currentMerchantStep > 1) {
      setCurrentMerchantStep(currentMerchantStep - 1);
    }
  };

  const goToMerchantStep = (step) => {
    setCurrentMerchantStep(step);
  };

  const getMerchantSlideClassName = (stepIndex) => {
    const step = stepIndex + 1;
    if (step === currentMerchantStep) {
      return "step-slide current";
    } else if (step < currentMerchantStep) {
      return "step-slide previous";
    } else {
      return "step-slide hidden";
    }
  };

  // Navigation handlers for association steps
  const nextAssociationStep = () => {
    if (currentAssociationStep < totalAssociationSteps) {
      setCurrentAssociationStep(currentAssociationStep + 1);
    }
  };

  const prevAssociationStep = () => {
    if (currentAssociationStep > 1) {
      setCurrentAssociationStep(currentAssociationStep - 1);
    }
  };

  const goToAssociationStep = (step) => {
    setCurrentAssociationStep(step);
  };

  const getAssociationSlideClassName = (stepIndex) => {
    const step = stepIndex + 1;
    if (step === currentAssociationStep) {
      return "step-slide current";
    } else if (step < currentAssociationStep) {
      return "step-slide previous";
    } else {
      return "step-slide hidden";
    }
  };

  return (
    <>
      <header id="dlftr">
        <a href="#" className="logo">
          <img
            className="oops"
            src="/logo.png"
            alt="Logo GreenPick"
            style={{
              display: "inline-block",
              marginRight: "10px",
              verticalAlign: "middle",
              maxHeight: "40px",
              width: "auto",
            }}
          />
          <span style={{ letterSpacing: "4px" }}>
            <span style={{ color: "#36ff00" }}>G</span>REEN
            <span style={{ color: "#FF9800" }}>P</span>ICK
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

      <div className="ccm-container">
        {/* Enhanced nature-inspired background elements */}
        <div className="ccm-pattern-overlay"></div>

        {/* Original nature elements */}
        <div className="ccm-nature-element ccm-leaf ccm-nature1"></div>
        <div className="ccm-nature-element ccm-tree ccm-nature2"></div>
        <div className="ccm-nature-element ccm-recycle ccm-nature3"></div>
        <div className="ccm-nature-element ccm-plant ccm-nature4"></div>
        <div className="ccm-nature-element ccm-water-drop ccm-nature5"></div>

        {/* New nature elements */}
        <div className="ccm-nature-element ccm-sun ccm-nature6"></div>
        <div className="ccm-nature-element ccm-mountain ccm-nature7"></div>
        <div className="ccm-nature-element ccm-flower ccm-nature8"></div>
        <div className="ccm-nature-element ccm-earth ccm-nature9"></div>
        <div className="ccm-nature-element ccm-cloud ccm-nature10"></div>
        <div
          className="ccm-nature-element ccm-wind"
          style={{ top: "35%", right: "45%", width: "70px", height: "70px" }}
        ></div>

        {/* Particle effects */}
        <div className="ccm-particle"></div>
        <div className="ccm-particle"></div>
        <div className="ccm-particle"></div>
        <div className="ccm-particle"></div>
        <div className="ccm-particle"></div>
        <div className="ccm-particle"></div>

        {/* Background animation elements */}
        <div className="ccm-bg-circle"></div>
        <div className="ccm-bg-circle"></div>
        <div className="ccm-bg-circle"></div>
        <div className="ccm-bg-shape"></div>

        {/* Fireflies */}
        <div className="sparkle-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`firefly-${i}`} className="firefly" />
          ))}
        </div>

        {/* Falling leaves */}
        <div className="falling-leaf leaf-1"></div>
        <div className="falling-leaf leaf-2"></div>
        <div className="falling-leaf leaf-3"></div>
        <div className="falling-leaf leaf-4"></div>
        <div className="falling-leaf leaf-5"></div>

        {/* Floating butterflies */}
        <div className="butterfly butterfly-1"></div>
        <div className="butterfly butterfly-2"></div>
        <div className="butterfly butterfly-3"></div>
        <div className="butterfly butterfly-4"></div>

        {/* Rainbow gradient overlay */}
        <div className="rainbow-gradient"></div>

        {/* Floating bubbles */}
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>

        {/* Weather effects */}
        <div className="weather-effects">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={`raindrop-${i}`} className="raindrop" />
          ))}
          <div className="sun-rays"></div>
          <div className="fog"></div>
        </div>

        {/* Animated vines */}
        <div className="vine vine-1">
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
        </div>
        <div className="vine vine-2">
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
        </div>
        <div className="vine vine-3">
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
          <div className="vine-leaf"></div>
        </div>

        {/* Hero section with title */}
        <motion.div
          className="ccm-hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="ccm-main-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="ccm-star-icon">✦</span> Utiliser GreenPick, C'est
            Simple ! <span className="ccm-star-icon">✦</span>
          </motion.h1>

          <motion.p
            className="ccm-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="ccm-highlight">
              Achetez, vendez, donnez : on vous explique tout.
            </span>
          </motion.p>
        </motion.div>

        {/* Laptop image section */}
        <motion.div
          className="ccm-laptop-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="ccm-laptop-container"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              src="/aka_bien.png"
              alt="GreenPick website displayed on laptop"
              className="ccm-laptop-image"
            />
          </motion.div>
        </motion.div>

        {/* How it works section */}
        <motion.div
          className="ccm-how-it-works-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
            type: "spring",
            stiffness: 50,
            damping: 15,
          }}
          style={{
            backgroundColor: "rgba(3, 60, 45, 0.9)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Éléments de nature animés pour le background */}
          <div className="nature-animation-container">
            <div className="nature-leaf leaf-float-1"></div>
            <div className="nature-leaf leaf-float-2"></div>
            <div className="nature-leaf leaf-float-3"></div>
            <div className="nature-flower flower-rotate-1"></div>
            <div className="nature-flower flower-rotate-2"></div>
            <div className="nature-butterfly butterfly-1"></div>
            <div className="nature-butterfly butterfly-2"></div>
            <div className="nature-particle-container">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="nature-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 5 + 5}s`,
                  }}
                ></div>
              ))}
            </div>
            <div className="gradient-overlay"></div>
          </div>

          <motion.h2
            className="ccm-section-title"
            {...fadeIn}
            style={{ opacity: 1 }}
          >
            Comment Ça Marche?
          </motion.h2>

          <div className="ccm-user-types-container">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.id}
                className="ccm-user-type-card"
                onClick={() => scrollToSection(type.sectionId)}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 1 + index * 0.3,
                    duration: 0.8,
                  },
                }}
                whileHover={{
                  // Simplified hover effect with no vertical movement
                  scale: 1.03,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  backgroundColor: "rgba(3, 60, 45, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  transition: { duration: 0.3, ease: "easeOut" },
                  cursor: "pointer",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="ccm-user-type-icon"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {type.icon}
                </motion.div>
                <motion.h3
                  className="ccm-user-type-title"
                  whileHover={{ scale: 1.05 }}
                >
                  {type.title}
                </motion.h3>
                <p className="ccm-user-type-description">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Buyer Steps Section */}
        <motion.section
          id="buyer-steps" // Add ID here
          className="buyer-steps-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.h2
            className="buyer-steps-title"
            {...fadeIn}
            transition={{ delay: 1.4, duration: 0.8 }}
          ></motion.h2>

          <div className="steps-container">
            {/* Left side - Content that slides */}
            <div className="step-content-slider">
              {buyerSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={getSlideClassName(index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="step-content">
                    <h3 className="buyer-label" style={{ color: "#FF8800" }}>
                      {step.title}
                    </h3>
                    <h4 className="step-number" style={{ color: "#025C4C" }}>
                      {step.subtitle}
                    </h4>
                    <p className="step-description">{step.description}</p>
                    <div className="step-nav">
                      <button
                        className="step-arrow prev-step"
                        onClick={prevStep}
                        style={{
                          opacity: currentAssociationStep === 1 ? 0.5 : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={currentBuyerStep === 1}
                      >
                        ←
                      </button>
                      <div className="step-dots">
                        {buyerSteps.map((dot, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`step-dot ${
                              currentBuyerStep === dotIndex + 1 ? "active" : ""
                            }`}
                            onClick={() => goToStep(dotIndex + 1)}
                          />
                        ))}
                      </div>
                      <button
                        className="step-arrow next-step"
                        onClick={nextStep}
                        style={{
                          opacity: currentAssociationStep === 1 ? 0.5 : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={currentBuyerStep === totalBuyerSteps}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Fixed image that doesn't change */}
            <div className="step-image-fixed"></div>
          </div>
        </motion.section>

        {/* Merchant Steps Section */}
        <motion.section
          id="merchant-steps" // Add ID here
          className="buyer-steps-section" // Reuse the same class for consistent styling
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.h2
            className="buyer-steps-title"
            {...fadeIn}
            transition={{ delay: 1.6, duration: 0.8 }}
          ></motion.h2>

          <div className="steps-container">
            {/* Left side - Content that slides */}
            <div className="step-content-slider">
              {merchantSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={getMerchantSlideClassName(index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="step-content">
                    <h3 className="buyer-label" style={{ color: "#FF8800" }}>
                      {step.title}
                    </h3>
                    <h4 className="step-number" style={{ color: "#025C4C" }}>
                      {step.subtitle}
                    </h4>
                    <p className="step-description">{step.description}</p>
                    <div className="step-nav">
                      <button
                        className="step-arrow prev-step"
                        onClick={prevMerchantStep}
                        style={{
                          opacity: currentAssociationStep === 1 ? 0.5 : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={currentMerchantStep === 1}
                      >
                        ←
                      </button>
                      <div className="step-dots">
                        {merchantSteps.map((dot, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`step-dot ${
                              currentMerchantStep === dotIndex + 1
                                ? "active"
                                : ""
                            }`}
                            onClick={() => goToMerchantStep(dotIndex + 1)}
                          />
                        ))}
                      </div>
                      <button
                        className="step-arrow next-step"
                        onClick={nextMerchantStep}
                        style={{
                          opacity: currentAssociationStep === 1 ? 0.5 : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={currentMerchantStep === totalMerchantSteps}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Fixed image that doesn't change */}
            <div
              className="step-image-fixed"
              style={{ backgroundImage: "url('/taqcictni.png')" }}
            ></div>
          </div>
        </motion.section>

        {/* Association Steps Section */}
        <motion.section
          id="association-steps" // Add ID here
          className="buyer-steps-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.h2
            className="buyer-steps-title"
            {...fadeIn}
            transition={{ delay: 1.8, duration: 0.8 }}
          ></motion.h2>

          <div className="steps-container">
            {/* Left side - Content that slides */}
            <div className="step-content-slider">
              {associationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={getAssociationSlideClassName(index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="step-content">
                    <h3 className="buyer-label" style={{ color: "#FF8800" }}>
                      {step.title}
                    </h3>
                    <h4 className="step-number" style={{ color: "#025C4C" }}>
                      {step.subtitle}
                    </h4>
                    <p className="step-description">{step.description}</p>
                    <div className="step-nav">
                      <button
                        className="step-arrow prev-step"
                        onClick={prevAssociationStep}
                        style={{
                          opacity: currentAssociationStep === 1 ? 0.5 : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={currentAssociationStep === 1}
                      >
                        ←
                      </button>
                      <div className="step-dots">
                        {associationSteps.map((dot, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`step-dot ${
                              currentAssociationStep === dotIndex + 1
                                ? "active"
                                : ""
                            }`}
                            onClick={() => goToAssociationStep(dotIndex + 1)}
                          />
                        ))}
                      </div>
                      <button
                        className="step-arrow next-step"
                        onClick={nextAssociationStep}
                        style={{
                          opacity:
                            currentAssociationStep === totalAssociationSteps
                              ? 0.5
                              : 1,
                          transition: "opacity 0.3s ease",
                          // Complete hover effect removal
                          color: "#025C4C", // Set the text color explicitly
                          backgroundColor: "transparent", // Set the background color explicitly
                        }}
                        // Add onMouseOver and onMouseOut to prevent any hover effects
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = "#025C4C";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "currentColor";
                        }}
                        disabled={
                          currentAssociationStep === totalAssociationSteps
                        }
                      >
                        →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Fixed image that doesn't change */}
            <div
              className="step-image-fixed"
              style={{ backgroundImage: "url('/wina.png')" }}
            ></div>
          </div>
        </motion.section>

        {/* Enhanced background effects */}
        <div className="enhanced-background-effects">
          <div className="floating-element float-1"></div>
          <div className="floating-element float-2"></div>
          <div className="floating-element float-3"></div>
          <div className="pulse-circle pulse-1"></div>
          <div className="pulse-circle pulse-2"></div>
          <div className="wave-effect"></div>
        </div>

        {/* FAQ Section */}
        <motion.section
          className="faq-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.h2
            className="faq-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            Questions Fréquentes
          </motion.h2>

          <motion.div
            className="faq-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${
                  activeQuestion === faq.id ? "active" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <motion.div
                  className="faq-question"
                  onClick={() => toggleQuestion(faq.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3>{faq.question}</h3>
                  <motion.span
                    className="faq-icon"
                    animate={{ rotate: activeQuestion === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </motion.div>
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeQuestion === faq.id ? "auto" : 0,
                    opacity: activeQuestion === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default CommentCaMarche;
