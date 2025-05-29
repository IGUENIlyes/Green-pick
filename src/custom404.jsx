import { Link } from "react-router-dom";
import "./error-404.css";

export default function Custom404() {
  const backgroundLines = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, rgba(50, 120, 80, 0.1) 25%, transparent 25%, transparent 10%, rgba(40, 100, 60, 0.1) 50%, rgba(5, 10, 60, 0.1) 75%, transparent 5%, transparent)",
    backgroundSize: "40px 40px",
    zIndex: "-1",
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
        <div style={backgroundLines}></div>
        <div className="error-container">
          <div className="error-content">
            <h1 className="ops">Oops! erreur....</h1>{" "}
            {/* Déplacé à l'intérieur du conteneur */}
            <h1 className="error-title">
              <span className="number">4</span>
              <img
                src="/pizza.png"
                alt="Pizza"
                width={190}
                height={200}
                className="pizza-image"
              />
              <span className="number">4</span>
            </h1>
            <p className="error-message">
              La page que vous recherchez semble introuvable
            </p>
            <Link to="/" className="home-button">
              {" "}
              {/* Changé 'href' pour 'to' */}
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
