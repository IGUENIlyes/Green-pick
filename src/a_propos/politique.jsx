import React from "react";
import { useEffect } from "react";

export default function PolitiqueDeConfidentialite() {

     useEffect(() => {
       window.scrollTo(0, 0); // Scroll vers le haut au montage du composant
     }, []);
  const containerStyle = {

     marginTop : "60px",
    backgroundColor: "#0a5043",
    backgroundImage: "linear-gradient(135deg, #0a5043 0%, #083b32 100%)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    position: "relative",
    zIndex: "2",
    maxWidth: "800px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "2.2rem",
    textAlign: "center",
    marginBottom: "2rem",
    fontWeight: "bold",
  };

  const sectionTitleStyle = {
    
    color: "#4bff8c",
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  };

  const listStyle = {
    listStyleType: "none",
    paddingLeft: "1.5rem",
  };

  const listItemStyle = {
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "flex-start",
  };

  const bulletStyle = {
    color: "#4bff8c",
    marginRight: "0.5rem",
    fontWeight: "bold",
  };

  const backgroundCircleTopRight = {
    position: "absolute",
    top: "-5%",
    right: "-5%",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(75, 255, 140, 0.1) 0%, rgba(10, 80, 67, 0) 70%)",
    borderRadius: "50%",
    zIndex: "1",
  };

  const backgroundCircleBottomLeft = {
    position: "absolute",
    bottom: "-5%",
    left: "-5%",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(75, 255, 140, 0.1) 0%, rgba(10, 80, 67, 0) 70%)",
    borderRadius: "50%",
    zIndex: "1",
  };

  const backgroundLines = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, rgba(75, 255, 140, 0.05) 25%, transparent 15%, transparent 40%, rgba(75, 255, 140, 0.05) 50%, rgba(75, 255, 140, 0.05) 75%, transparent 55%, transparent)",
    backgroundSize: "40px 40px",
    zIndex: "1",
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
        <div style={containerStyle}>
          <div style={backgroundCircleTopRight}></div>
          <div style={backgroundCircleBottomLeft}></div>
          <div style={backgroundLines}></div>

          <div style={contentStyle}>
            <h1 style={titleStyle}>Politique De Confidentialité</h1>

            <div>
              <h2 style={sectionTitleStyle}>1. Collecte des Données</h2>
              <p>Nous collectons les informations suivantes :</p>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Nom, prénom, email,
                  adresse, numéro de téléphone.
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Informations commerciales
                  pour les commerçants (ex : numéro de registre de commerce).
                </li>
              </ul>
            </div>

            <div>
              <h2 style={sectionTitleStyle}>
                2. Stockage et Protection des Données
              </h2>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Les données sont stockées
                  de manière sécurisée et ne sont accessibles qu'aux personnes
                  autorisées.
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Nous ne partageons pas vos
                  données personnelles avec des tiers sans votre consentement
                  explicite et dans le respect total des présentes conditions.
                </li>
              </ul>
            </div>

            <div>
              <h2 style={sectionTitleStyle}>3. Cookies et Suivi</h2>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Des cookies peuvent être
                  utilisés pour améliorer votre expérience utilisateur.
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Vous pouvez configurer
                  votre navigateur pour refuser les cookies.
                </li>
              </ul>
            </div>

            <div>
              <h2 style={sectionTitleStyle}>4. Droits des Utilisateurs</h2>
              <ul style={listStyle}>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Vous avez le droit
                  d'accéder, de modifier ou de supprimer vos données
                  personnelles.
                </li>
                <li style={listItemStyle}>
                  <span style={bulletStyle}>•</span> Vous pouvez demander la
                  suppression de votre compte en nous contactant.
                </li>
              </ul>
            </div>

            <div>
              <h2 style={sectionTitleStyle}>5. Contact</h2>
              <p>
                Pour toute question relative à vos données personnelles,
                contactez-nous à :{" "}
                <span style={{ color: "#4bff8c" }}>greenpick@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
