import SearchBar from "./SearchBar";
import "./Hero.css";
import { Link } from "react-router-dom";
import backgroundImage from "/forme sin (1).png";


function Hero() {
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
      <main>
        <div className="heero">
          <img
            src={backgroundImage}
            alt=""
            className="categori-background-image"
          />
          <div className="heero-content">
            <h1>Découvrez Les Paniers Près De Chez Vous !</h1>
            <p>
              Plongez dans une aventure gustative unique, faites un geste pour
              la planète et votre porte-monnaie.Avec l'aventure gustative
              commence ici !
            </p>
            <SearchBar />
          </div>
        </div>
      </main>
    </>
  );
}

export default Hero;
