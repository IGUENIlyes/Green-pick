import React from "react";
import { useEffect } from "react";
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
    // Ou une hauteur fixe
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
          <div style={contentStyle}>
            <div style={backgroundLines}></div>
            <h1 style={titleStyle}>Conditions Générales D'Utilisation (CGU)</h1>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>1.</span> Présentation de
                GreenPick
              </h2>
              <p style={sectionTextStyle}>
                <span style={highlightStyle}>GreenPick</span> est une plateforme
                qui met en relation les commerçants, les étudiants et les
                associations afin de réduire le gaspillage alimentaire. Les
                commerçants peuvent vendre leurs invendus à prix réduit tandis
                que les associations peuvent bénéficier de dons alimentaires.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>2.</span> Inscription et
                Utilisation
              </h2>
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
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>3.</span> Obligations des
                Commerçants
              </h2>
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
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>4.</span> Rôles des
                Associations et des Acheteurs
              </h2>
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
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>5.</span> Paiements et Frais
              </h2>
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
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>6.</span> Responsabilités et
                Limitations
              </h2>
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
            </section>

            <section style={sectionStyle}>
              <h2 style={sectionTitleStyle}>
                <span style={sectionNumberStyle}>7.</span> Résiliation du Compte
              </h2>
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
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
