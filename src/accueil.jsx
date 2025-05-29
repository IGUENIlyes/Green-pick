import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css"; // Ajout de l'import du fichier style.css

export default function Accueil() {
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
        <section className="hero">
          <img className="etoil" src="forme sin (1).png" alt="etoile" />

          <div className="hero-content">
            <h1 id="grd">GREENPICK</h1>
            <h1 id="sps">
              <span id="gpk">GreenPick</span>: Bon Pour Vous, Bon Pour La
              Planète
            </h1>
            <p id="zez">
              <b>
                GreenPick connecte les commerçants locaux avec les étudiants et
                associations pour lutter contre le gaspillage alimentaire.
                Découvrez des produits frais à prix réduit près de chez vous!
              </b>
            </p>
            <a href="#join-me" className="join-button2">
              <b>Joignez-vous à nous!</b>
            </a>
            <div className="image-container">
              {/* <div className="background-block"></div> */}
              <img
                src="GREENPICK.png"
                alt="Sac écologique avec produits frais"
                className="hero-image"
                id="cote"
              />
            </div>
          </div>
        </section>

        {/* SECTION QU'EST-CE QUE GREENPICK */}
        <section className="about">
          <div className="about-image">
            <img src="2nd-section.png" alt="Femme faisant ses courses bio" />
          </div>
          <div id="ruh" className="about-content">
            <h2>Qu'est-Ce Que GreenPick?</h2>
            <p>
              GreenPick est une plateforme engagée qui permet aux commerçants de
              vendre leurs invendus à prix réduit ou de les donner aux
              associations et aux étudiants. Ensemble, luttons contre le
              gaspillage alimentaire tout en favorisant une consommation plus
              responsable et solidaire !
            </p>
          </div>
        </section>

        {/* SECTION POURQUOI CHOISIR */}
        <section className="why-choose">
          <h2 className="why_choose">Pourquoi Choisir GreenPick?</h2>
          <div className="benefits">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Produits 100% Bio</h3>
              <p>
                Tous nos produits sont certifiés biologiques, sans pesticides ni
                additifs chimiques.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Circuit Court</h3>
              <p>
                Nous privilégions les producteurs locaux pour réduire
                l'empreinte carbone et soutenir l'économie locale.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Livraison Écologique</h3>
              <p>
                Nos livraisons sont effectuées par des moyens de transport à
                faible émission de carbone.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Impact Positif</h3>
              <p>
                Chaque achat contribue à des projets de reforestation et de
                protection de l'environnement.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION REJOINDRE */}
        <section id="join-me" className="join-us">
          <h1 className="join-text">Rejoignez-Nous!</h1>
          <div className="features">
            <div className="feature">
              <img src="image 15.png" alt="acheter" />
              <p className="feature-text">
                Profitez d'offres
                <br />
                anti-gaspi
              </p>

              <Link to="/inscrire_acheteur" className="button">
                Acheter
              </Link>
            </div>

            <div className="separator"></div>

            <div className="feature">
              <img src="image 16.png" alt="vendre" />
              <p className="feature-text">
                Proposez vos
                <br />
                invendus
              </p>
              <a href="#" className="button">
                Vendre
              </a>
            </div>

            <div className="separator"></div>
            <div className="feature">
              <img src="image 17.png" alt="recevoir" />
              <p className="feature-text">
                Collectez des
                <br />
                dons en un clic !
              </p>
              <a href="#" className="button">
                Recevoir
              </a>
            </div>
          </div>
        </section>

        {/* SECTION TÉMOIGNAGES */}
        <section className="testimonials">
          <h2>Témoignages</h2>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>
                "Depuis que j'ai découvert GreenPick, ma façon de consommer a
                complètement changé. Les produits sont frais et savoureux!"
              </p>
              <div className="testimonial-author">- Sophie B.</div>
            </div>
            <div className="testimonial-card">
              <p>
                "J'aime l'idée de savoir d'où viennent mes aliments et de
                soutenir les producteurs locaux. GreenPick rend cela si facile."
              </p>
              <div className="testimonial-author">- Jean-Pierre M.</div>
            </div>
            <div className="testimonial-card">
              <p>
                "Non seulement les produits sont excellents, mais j'apprécie
                aussi l'engagement environnemental. Un grand bravo à l'équipe!"
              </p>
              <div className="testimonial-author">- Marie-Anne D.</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
