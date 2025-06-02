/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./welcome_commerçant.css";
import { Link } from "react-router-dom";
// Ajouter l'import de Chart.js
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const WelcomeCommerçant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  // Créer un état séparé pour chaque ensemble de données de statistiques
  const [weeklyStats, setWeeklyStats] = useState(null);
  // Add state for reviews
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [ratingsData, setRatingsData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);

  const barChartRef = React.useRef(null);
  const lineChartRef = React.useRef(null);
  const pieChartRef = React.useRef(null);

  // Références aux instances de graphiques pour pouvoir les détruire proprement
  const barChartInstance = React.useRef(null);
  const lineChartInstance = React.useRef(null);
  const pieChartInstance = React.useRef(null);

  // Récupération des données du tableau de bord et autres fonctionnalités
  useEffect(() => {
    const mockDashboardData = {
      basketsSold: 157,
      basketsOnline: 42,
      basketsUnsold: 23,
      revenueGenerated: 3892.5,
    };

    // Données détaillées pour les statistiques hebdomadaires
    const mockWeeklyStats = {
      weekDays: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ],
      dailyData: [
        { day: "Dimanche", sales: 18, revenue: 730, online: 8, unsold: 3 },
        { day: "Lundi", sales: 12, revenue: 520, online: 5, unsold: 2 },
        { day: "Mardi", sales: 15, revenue: 610, online: 7, unsold: 4 },
        { day: "Mercredi", sales: 25, revenue: 950, online: 10, unsold: 5 },
        { day: "Jeudi", sales: 20, revenue: 780, online: 6, unsold: 3 },
        { day: "Vendredi", sales: 30, revenue: 1120, online: 12, unsold: 6 },
        { day: "Samedi", sales: 37, revenue: 1390, online: 15, unsold: 7 },
      ],
    };

    setIsVisible(true);
    setDashboardData(mockDashboardData);
    setWeeklyStats(mockWeeklyStats);

    // Simulate fetching data from an API with a slight delay
    const fetchDashboardData = async () => {
      // This simulates an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDashboardData(mockDashboardData);
    };

    fetchDashboardData();

    // Mock data for reviews ratings
    const mockRatingsData = {
      totalReviews: 13,
      fiveStars: 7,
      fourStars: 3,
      threeStars: 2,
      twoStars: 1,
      oneStar: 0,
    };

    // Mock data for user reviews
    const mockReviewsData = [
      {
        name: "Meriem",
        rating: 5,
        comment:
          "Le panier que j'ai acheté était rempli de produits frais et délicieux ! J'ai économisé beaucoup d'argent tout en contribuant à une noble cause. C'est un choix gagnant-gagnant pour moi !",
      },
      {
        name: "Lyes",
        rating: 4,
        comment:
          "Service excellent! Les produits sont toujours frais et de bonne qualité. Je recommande vivement cette plateforme pour réduire le gaspillage alimentaire.",
      },
      {
        name: "Brahim",
        rating: 5,
        comment:
          "Je suis ravi de pouvoir soutenir les commerces locaux tout en faisant des économies. Les paniers sont toujours bien composés et contiennent des surprises appétissantes.",
      },
      {
        name: "Lyna",
        rating: 3,
        comment:
          "Bonne expérience globale. Quelques produits n'étaient pas à mon goût, mais le rapport qualité-prix reste très intéressant. Je continuerai à commander.",
      },
    ];

    setRatingsData(mockRatingsData);
    setReviewsData(mockReviewsData);

    // PERFORMANCE IMPROVEMENT: Reduce the number of particles
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle) => {
      const randomX = Math.random() * 80 - 40;
      const randomY = Math.random() * 80 - 40;
      const randomDelay = Math.random() * 2;
      const randomDuration = 3 + Math.random() * 2;

      particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
      particle.style.animationDelay = `${randomDelay}s`;
      particle.style.animationDuration = `${randomDuration}s`;
    });

    // PERFORMANCE IMPROVEMENT: Simplified cursor effects
    // Reduced frequency and limit for effects
    let rippleCount = 0;
    let flowerCount = 0;
    const MAX_RIPPLES = 2; // Reduced from 5
    const MAX_FLOWERS = 1; // Reduced from 3
    let lastRippleTime = 0;
    let lastFlowerTime = 0;

    // Simplified and less frequent cursor effects
    const handleNatureCursor = (e) => {
      const currentTime = Date.now();

      // Create gentle ripple effect with higher threshold (less often)
      if (
        e.type === "mousemove" &&
        Math.random() > 0.998 && // Less frequent (0.998 instead of 0.995)
        rippleCount < MAX_RIPPLES &&
        currentTime - lastRippleTime > 2000 // Longer delay (2000ms instead of 1000ms)
      ) {
        const ripple = document.createElement("div");
        ripple.className = "nature-ripple";
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.querySelector(".welcome-container").appendChild(ripple);

        rippleCount++;
        lastRippleTime = currentTime;

        setTimeout(() => {
          ripple.remove();
          rippleCount--;
        }, 2000);
      }

      // Create flower bloom on click (less frequent)
      if (
        e.type === "click" &&
        flowerCount < MAX_FLOWERS &&
        currentTime - lastFlowerTime > 1500 // Longer delay (1500ms instead of 800ms)
      ) {
        const flower = document.createElement("div");
        flower.className = "flower-bloom";
        flower.style.left = `${e.clientX}px`;
        flower.style.top = `${e.clientY}px`;
        document.querySelector(".welcome-container").appendChild(flower);

        flowerCount++;
        lastFlowerTime = currentTime;

        setTimeout(() => {
          flower.remove();
          flowerCount--;
        }, 3000);
      }
    };

    // Remove old mouse effects and add the new one
    document.addEventListener("mousemove", handleNatureCursor);
    document.addEventListener("click", handleNatureCursor);

    // Supprimer toutes les feuilles tombantes existantes
    document.querySelectorAll(".falling-leaf").forEach((leaf) => leaf.remove());

    // Animated spotlight effect
    const spotlight = document.querySelector(".spotlight-effect");
    const container = document.querySelector(".content-container");

    const moveSpotlight = (e) => {
      if (!container || !spotlight) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      spotlight.style.setProperty("--x", `${x}%`);
      spotlight.style.setProperty("--y", `${y}%`);
    };

    if (spotlight && container) {
      document.addEventListener("mousemove", moveSpotlight);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleNatureCursor);
      document.removeEventListener("click", handleNatureCursor);
      document.removeEventListener("mousemove", moveSpotlight);
    };

    // Ajouter des animations formidables aux cartes du tableau de bord
    const dashboardCards = document.querySelectorAll(".dashboard-card");

    dashboardCards.forEach((card) => {
      // Simplified animations - create fewer animated elements
      const animBg = document.createElement("div");
      animBg.className = "card-animated-background";
      card.insertBefore(animBg, card.firstChild);

      // PERFORMANCE IMPROVEMENT: Fewer animated circles (4 instead of 8)
      for (let i = 0; i < 4; i++) {
        const circle = document.createElement("div");
        circle.className = "animated-circle";
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.width = `${Math.random() * 30 + 10}px`;
        circle.style.height = circle.style.width;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        circle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        animBg.appendChild(circle);
      }

      // PERFORMANCE IMPROVEMENT: Fewer animated lines (3 instead of 6)
      for (let i = 0; i < 3; i++) {
        const line = document.createElement("div");
        line.className = "animated-line";
        line.style.left = `${Math.random() * 80 + 10}%`;
        line.style.top = `${Math.random() * 80 + 10}%`;
        line.style.width = `${Math.random() * 60 + 40}px`;
        line.style.height = "1px";
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = `${Math.random() * 3}s`;
        animBg.appendChild(line);
      }

      // Add a glow effect
      const glow = document.createElement("div");
      glow.className = "card-glow";
      animBg.appendChild(glow);

      // PERFORMANCE IMPROVEMENT: Fewer particles (6 instead of 12)
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement("div");
        particle.className = "card-particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        animBg.appendChild(particle);
      }
    });
  }, []); // Empty dependency array means this effect runs once on mount

  // Effet séparé pour gérer uniquement la création des graphiques
  useEffect(() => {
    // Ne rien faire si les données ne sont pas encore chargées
    if (!weeklyStats) return;

    console.log("Création des graphiques avec les données:", weeklyStats);

    // Animer l'entrée des cartes de statistiques
    const chartCards = document.querySelectorAll(".chart-card");
    chartCards.forEach((card, index) => {
      // Ajouter une classe pour l'animation initiale
      card.classList.add("chart-card-hidden");

      // Déclencher l'animation avec un délai basé sur l'index
      setTimeout(() => {
        card.classList.add("chart-card-animate");
      }, 300 * index);

      // PERFORMANCE IMPROVEMENT: Simplified decorations
      const decorations = document.createElement("div");
      decorations.className = "chart-decorations";

      // PERFORMANCE IMPROVEMENT: Fewer animated circles (3 instead of 5)
      for (let i = 0; i < 3; i++) {
        const circle = document.createElement("div");
        circle.className = "chart-decoration-circle";
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.width = `${Math.random() * 8 + 3}px`;
        circle.style.height = circle.style.width;
        circle.style.animationDelay = `${Math.random() * 3}s`;
        circle.style.animationDuration = `${4 + Math.random() * 6}s`;
        decorations.appendChild(circle);
      }

      // PERFORMANCE IMPROVEMENT: Fewer lines (2 instead of 3)
      for (let i = 0; i < 2; i++) {
        const line = document.createElement("div");
        line.className = "chart-decoration-line";
        line.style.left = `${Math.random() * 80 + 10}%`;
        line.style.top = `${Math.random() * 80 + 10}%`;
        line.style.width = `${Math.random() * 40 + 20}px`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        decorations.appendChild(line);
      }

      card.appendChild(decorations);
    });

    // PERFORMANCE IMPROVEMENT: Simplified title effect
    const statTitle = document.querySelector(".statistics-title");
    if (statTitle) {
      const glowEffect = document.createElement("div");
      glowEffect.className = "title-glow-effect";
      statTitle.appendChild(glowEffect);
    }

    // PERFORMANCE IMPROVEMENT: Fewer floating particles (6 instead of 12)
    const chartsContainer = document.querySelector(".charts-container");
    if (chartsContainer) {
      for (let i = 0; i < 6; i++) {
        const floatingObject = document.createElement("div");
        const isLeaf = Math.random() > 0.5;
        floatingObject.className = isLeaf
          ? "chart-floating-leaf"
          : "chart-floating-dot";
        floatingObject.style.left = `${Math.random() * 100}%`;
        floatingObject.style.top = `-${Math.random() * 20 + 10}px`;
        floatingObject.style.animationDuration = `${Math.random() * 10 + 15}s`;
        floatingObject.style.animationDelay = `${Math.random() * 5}s`;
        chartsContainer.appendChild(floatingObject);
      }
    }

    // Nettoyer les graphiques existants avant d'en créer de nouveaux
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    // Extraction des données pour les graphiques
    const days = weeklyStats.dailyData.map((item) => item.day);
    const sales = weeklyStats.dailyData.map((item) => item.sales);
    const revenues = weeklyStats.dailyData.map((item) => item.revenue);
    const online = weeklyStats.dailyData.map((item) => item.online);
    const unsold = weeklyStats.dailyData.map((item) => item.unsold);

    // Création du graphique à barres (commandes par jour)
    const barCtx = barChartRef.current?.getContext("2d");
    if (barCtx) {
      barChartInstance.current = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: days,
          datasets: [
            {
              label: "Paniers vendus par jour",
              data: sales,
              backgroundColor: "rgba(20, 169, 137, 0.7)",
              borderColor: "rgba(20, 169, 137, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        },
      });
    }

    // Création du graphique en ligne (revenus par jour)
    const lineCtx = lineChartRef.current?.getContext("2d");
    if (lineCtx) {
      lineChartInstance.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: days,
          datasets: [
            {
              label: "Revenus par jour (DZD)",
              data: revenues,
              fill: true,
              backgroundColor: "rgba(143, 212, 0, 0.2)",
              borderColor: "rgba(143, 212, 0, 1)",
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        },
      });
    }

    // Création d'un troisième graphique - camembert pour la comparaison
    const pieCtx = pieChartRef.current?.getContext("2d");
    if (pieCtx) {
      pieChartInstance.current = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Paniers Vendus", "Paniers En Ligne", "Paniers Non Vendus"],
          datasets: [
            {
              data: [
                sales.reduce((a, b) => a + b, 0),
                online.reduce((a, b) => a + b, 0),
                unsold.reduce((a, b) => a + b, 0),
              ],
              backgroundColor: [
                "rgba(20, 169, 137, 0.7)",
                "rgba(143, 212, 0, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgba(20, 169, 137, 1)",
                "rgba(143, 212, 0, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        },
      });
    }

    // Nettoyage des graphiques lors du démontage du composant
    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      // Nettoyer les animations lors du démontage
      document
        .querySelectorAll(".chart-decorations")
        .forEach((el) => el.remove());
      document
        .querySelectorAll(".title-glow-effect")
        .forEach((el) => el.remove());
      document
        .querySelectorAll(".chart-floating-leaf, .chart-floating-dot")
        .forEach((el) => el.remove());
    };
  }, [weeklyStats]);

  // Fonction pour naviguer entre les avis avec animation
  const navigateReview = (direction) => {
    if (!reviewsData) return;

    if (direction === "next") {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
      );
    }
  };

  // Calculate rating bar percentages
  const calculateRatingPercentage = (starCount) => {
    if (!ratingsData || ratingsData.totalReviews === 0) return 0;
    return (starCount / ratingsData.totalReviews) * 100;
  };

  return (
    <>
      {/* Animated Header */}
      <header className="merchant-header">
        <div className="logo-container">
          <img src="/logo.png" alt="GreenPick Logo" className="header-logo" />
          <a href="/" className="brand-name">
            <span className="brand-letter-g">G</span>reen
            <span className="brand-letter-p">P</span>ick
          </a>
        </div>

        {/* Navigation and profile section */}
        <div className="nav-links">
          <a href="interface_commerçant">Accueil</a>
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(".dashboard-container")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Tableau de bord
          </a>
          <a
            href="#donation"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(".donation-container")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Donner
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("footer")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
          </a>

          <a href="/commerçant_profil" className="profile-link">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="profile-icon"
            />
            Profil
          </a>
        </div>
      </header>

      <div className="welcome-container">
        {/* Nature-inspired animated gradient overlay */}
        <div className="nature-gradient"></div>

        {/* Replace background-image div with direct image */}
        <img
          src="/ayyaw.png"
          alt="Puzzle collaboration"
          className="background-image"
        />
        <div className="overlay"></div>

        {/* PERFORMANCE IMPROVEMENT: Removed nature cursor effect div */}

        {/* PERFORMANCE IMPROVEMENT: Keeping only essential plant animations */}
        <div className="growing-plant left-plant"></div>
        <div className="growing-plant right-plant"></div>

        {/* PERFORMANCE IMPROVEMENT: Reduced floating elements */}
        <div className="nature-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-4"></div>
        </div>

        {/* Add subtle fog/mist effect */}
        <div className="mist-effect"></div>

        {/* PERFORMANCE IMPROVEMENT: Reduced raindrop count from 15 to 5 */}
        <div className="rain-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="raindrop"></div>
          ))}
        </div>

        <div
          className={`content-container nature-container ${
            isVisible ? "visible" : ""
          }`}
        >
          {/* PERFORMANCE IMPROVEMENT: Keeping only essential decorative elements */}
          <div className="nature-component leaf-top-left"></div>
          <div className="nature-component flower-bottom-right"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 6 to 3 */}
          <div className="floating-leaves-container">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`floating-leaf leaf-${(i % 3) + 1}`}
                style={{
                  left: i < 2 ? `${10 + i * 35}%` : `${70}%`,
                  top: i < 2 ? "5%" : "85%",
                  animationDelay: `${i * 0.7}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced floating seeds from 8 to 3 */}
          <div className="floating-seeds-container">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="floating-seed"
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${5 + i * 2}s`,
                }}
              ></div>
            ))}
          </div>

          <h1 className="welcome-title">
            <span className="main-title-text">
              Bienvenue Dans Votre Espace Commerçant
            </span>
            <br />
            <span className="main-title-text">
              Sur <span className="highlight">GreenPick!</span>
            </span>
          </h1>

          <p className="welcome-description">
            Merci de nous rejoindre dans notre mission contre le gaspillage et
            pour aider ceux qui en ont besoin. En ajoutant vos produits ici,
            vous ne faites pas que vendre, vous contribuez à une cause
            importante !
          </p>

          <p className="welcome-tagline">
            Explorez votre espace, faites briller vos produits, et ensemble,
            nous allons créer un impact positif dans notre communauté.
          </p>

          {/* PERFORMANCE IMPROVEMENT: Removed corner decorations */}
        </div>
      </div>

      {/* Dashboard Section with animated nature background */}
      <div className="dashboard-container">
        <div className="dashboard-bg">
          <div className="dashboard-gradient"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced nature elements */}
          <div className="dashboard-nature-container">
            {/* Reduced plants - keeping only left and right */}
            <div className="dashboard-growing-plant left"></div>
            <div className="dashboard-growing-plant right"></div>

            {/* Reduced birds from 2 to 1 */}
            <div className="dashboard-bird bird-1"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 8 to 4 */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`dashboard-floating-leaf leaf-${(i % 4) + 1}`}
                style={{
                  left: `${25 * i}%`,
                  top: `${20 + 15 * i}%`,
                  animationDuration: `${15 + i}s`,
                  animationDelay: `${i}s`,
                  transform: `rotate(${90 * i}deg) scale(${0.7 + i * 0.1})`,
                }}
              ></div>
            ))}

            {/* PERFORMANCE IMPROVEMENT: Reduced fireflies from 15 to 6 */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="dashboard-firefly"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDuration: `${10 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced particles from 15 to 6 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="dashboard-particle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 10}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                opacity: 0.2 + (i % 4) * 0.1,
                animationDuration: `${15 + i}s`,
                animationDelay: `${i}s`,
              }}
            ></div>
          ))}
        </div>

        <h2 className="dashboard-title">Tableau de Bord</h2>

        <div
          className="dashboard-card"
          style={{ height: "220px", minHeight: "220px" }}
        >
          <div className="card-icon cart-icon"></div>
          <div className="card-value">
            {dashboardData ? dashboardData.basketsSold : "..."}
          </div>
          <div className="card-title">Paniers Vendus</div>
        </div>

        <div
          className="dashboard-card"
          style={{ height: "220px", minHeight: "220px" }}
        >
          <div className="card-icon online-icon"></div>
          <div className="card-value">
            {dashboardData ? dashboardData.basketsOnline : "..."}
          </div>
          <div className="card-title">Paniers En Ligne</div>
        </div>

        <div
          className="dashboard-card"
          style={{ height: "220px", minHeight: "220px" }}
        >
          <div className="card-icon pending-icon"></div>
          <div className="card-value">
            {dashboardData ? dashboardData.basketsUnsold : "..."}
          </div>
          <div className="card-title">Paniers Non Vendus</div>
        </div>

        <div
          className="dashboard-card revenue-card"
          style={{ height: "220px", minHeight: "220px" }}
        >
          <div className="card-icon revenue-icon"></div>
          <div className="card-value">
            {dashboardData
              ? `${dashboardData.revenueGenerated.toFixed(2)} Dzd`
              : "..."}
          </div>
          <div className="card-title">Revenus Générés</div>
        </div>
      </div>

      {/* Nouvelle Section Statistiques avec diagrammes */}
      <div className="statistics-container">
        <div className="statistics-bg">
          <div className="statistics-gradient"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced nature elements */}
          <div className="stats-nature-container">
            {/* Keeping only essential plants */}
            <div className="stats-growing-plant left"></div>
            <div className="stats-growing-plant right"></div>

            {/* Removed trees for performance */}

            {/* Reduced birds from 3 to 1 */}
            <div className="stats-bird bird-1"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 8 to 3 */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`stats-floating-leaf leaf-${(i % 3) + 1}`}
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${30 + i * 20}%`,
                  animationDuration: `${15 + i}s`,
                  animationDelay: `${i}s`,
                  transform: `rotate(${120 * i}deg)`,
                }}
              ></div>
            ))}

            {/* Keeping only one cloud */}
            <div className="stats-cloud cloud-1"></div>

            {/* Removed honeycomb pattern */}

            {/* Keeping mist effects */}
            <div className="stats-mist-top"></div>
            <div className="stats-mist-bottom"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced fireflies from 15 to 5 */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="stats-firefly"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${25 + i * 10}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDuration: `${12 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced particles from 12 to 5 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="statistics-particle"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                width: `${3 + (i % 2)}px`,
                height: `${3 + (i % 2)}px`,
                opacity: 0.2,
                animationDuration: `${10 + i * 2}s`,
                animationDelay: `${i}s`,
              }}
            ></div>
          ))}
        </div>

        <h2 className="statistics-title">
          Statistiques Hebdomadaires
          <div className="title-decoration">
            {/* PERFORMANCE IMPROVEMENT: Removed decorative leaves */}
          </div>
        </h2>

        <div className="charts-container">
          <div className="chart-card">
            <h3 className="chart-title">Paniers Vendus par Jour</h3>
            <div className="chart-wrapper">
              <canvas ref={barChartRef} className="chart-canvas"></canvas>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Revenus par Jour</h3>
            <div className="chart-wrapper">
              <canvas ref={lineChartRef} className="chart-canvas"></canvas>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Répartition des Paniers</h3>
            <div className="chart-wrapper">
              <canvas ref={pieChartRef} className="chart-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Section Gestion De Vos Paniers */}
      <div className="paniers-container">
        {/* Ajout du fond animé comme dans les sections précédentes */}
        <div className="paniers-bg">
          <div className="paniers-gradient"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced nature elements */}
          <div className="paniers-nature-container">
            {/* Keeping only essential plants */}
            <div className="paniers-growing-plant left"></div>
            <div className="paniers-growing-plant right"></div>

            {/* Removed trees */}

            {/* Reduced birds to 1 */}
            <div className="paniers-bird bird-1"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 8 to 3 */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`paniers-floating-leaf leaf-${(i % 3) + 1}`}
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40 + i * 15}%`,
                  animationDuration: `${15 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}

            {/* Removed clouds */}

            {/* Removed honeycomb pattern */}

            {/* Keeping mist effects */}
            <div className="paniers-mist-top"></div>
            <div className="paniers-mist-bottom"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced fireflies from 15 to 5 */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="paniers-firefly"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${25 + i * 10}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDuration: `${12 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced particles from 12 to 5 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="paniers-particle"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                width: `${3 + (i % 2)}px`,
                height: `${3 + (i % 2)}px`,
                opacity: 0.2,
                animationDuration: `${10 + i * 2}s`,
                animationDelay: `${i}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="paniers-content animate-content">
          {/* PERFORMANCE IMPROVEMENT: Reduced floating particles from 12 to 4 */}
          <div className="content-floating-particles">
            {[...Array(4)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="content-particle"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${20 + i * 20}%`,
                  width: `${2 + i}px`,
                  height: `${2 + i}px`,
                  animationDuration: `${8 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 5 to 2 */}
          <div className="content-nature-elements">
            {[...Array(2)].map((_, i) => (
              <div
                key={`leaf-${i}`}
                className={`content-floating-leaf content-leaf-${i + 1}`}
                style={{
                  left: `${25 + i * 50}%`,
                  top: `${25 + i * 50}%`,
                  transform: `rotate(${180 * i}deg)`,
                  animationDuration: `${10 + i * 5}s`,
                  animationDelay: `${i * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Effet de lumière qui balaye le conteneur */}
          <div className="content-light-sweep"></div>

          {/* Bordure animée */}
          <div className="content-animated-border"></div>

          <div className="paniers-image-container animate-on-scroll">
            <img
              src="/freha.png"
              alt="Gestion des paniers"
              className="paniers-image"
            />
          </div>
          <div className="paniers-info">
            <h2 className="paniers-title animate-title">
              Gestion De Vos Paniers
            </h2>
            <p className="paniers-description animate-text">
              Gérez facilement vos paniers alimentaires, suivez leur statut et
              maximisez vos ventes. Notre interface intuitive vous permet de
              créer, modifier et organiser vos offres en quelques clics.
              Réduisez le gaspillage alimentaire tout en augmentant votre
              visibilité auprès de nouveaux clients.
            </p>
            <Link
              to="/gestion_paniers"
              className="paniers-button animate-button"
            >
              Gérer Mes Paniers
            </Link>
          </div>
        </div>
      </div>

      {/* Section Faire un Don */}
      <div className="donation-container">
        {/* Ajout du fond animé comme dans les sections précédentes */}
        <div className="donation-bg">
          <div className="donation-gradient"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced nature elements */}
          <div className="donation-nature-container">
            {/* Keeping only essential plants */}
            <div className="donation-growing-plant left"></div>
            <div className="donation-growing-plant right"></div>

            {/* Removed trees */}

            {/* Reduced birds to 1 */}
            <div className="donation-bird bird-1"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 8 to 3 */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`donation-floating-leaf leaf-${(i % 3) + 1}`}
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40 + i * 15}%`,
                  animationDuration: `${15 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}

            {/* Removed clouds */}

            {/* Removed honeycomb pattern */}

            {/* Keeping mist effects */}
            <div className="donation-mist-top"></div>
            <div className="donation-mist-bottom"></div>

            {/* PERFORMANCE IMPROVEMENT: Reduced fireflies from 15 to 5 */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="donation-firefly"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${25 + i * 10}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDuration: `${12 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced particles from 12 to 5 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="donation-particle"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                width: `${3 + (i % 2)}px`,
                height: `${3 + (i % 2)}px`,
                opacity: 0.2,
                animationDuration: `${10 + i * 2}s`,
                animationDelay: `${i}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="donation-content animate-content">
          {/* PERFORMANCE IMPROVEMENT: Reduced floating particles from 12 to 4 */}
          <div className="content-floating-particles">
            {[...Array(4)].map((_, i) => (
              <div
                key={`donation-particle-${i}`}
                className="content-particle"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${20 + i * 20}%`,
                  width: `${2 + i}px`,
                  height: `${2 + i}px`,
                  animationDuration: `${8 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>

          {/* PERFORMANCE IMPROVEMENT: Reduced floating leaves from 5 to 2 */}
          <div className="content-nature-elements">
            {[...Array(2)].map((_, i) => (
              <div
                key={`donation-leaf-${i}`}
                className={`content-floating-leaf content-leaf-${i + 1}`}
                style={{
                  left: `${25 + i * 50}%`,
                  top: `${25 + i * 50}%`,
                  transform: `rotate(${180 * i}deg)`,
                  animationDuration: `${10 + i * 5}s`,
                  animationDelay: `${i * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Effet de lumière qui balaye le conteneur */}
          <div className="content-light-sweep"></div>

          {/* Bordure animée */}
          <div className="content-animated-border"></div>

          <div className="donation-image-container animate-on-scroll">
            <img
              src="/tyatani.png"
              alt="Faire un don"
              className="donation-image"
            />
          </div>
          <div className="donation-info">
            <h2 className="donation-title animate-title">
              Chaque Geste Compte : Faites Un Don
            </h2>
            <p className="donation-description animate-text">
              Sur notre plateforme, nous croyons en la solidarité et l'entraide.
              Grâce à votre générosité, vous pouvez faire un don qui aidera
              d'autres associations à mener à bien leurs missions. Chaque
              contribution, quelle que soit sa taille, compte pour un changement
              positif.
            </p>
            <p className="donation-description animate-text">
              Découvrez comment votre contribution peut transformer des vies.
              Apprenez-en plus sur les différentes associations que nous
              soutenons et leur impact.
            </p>

            <Link to="/gestion_dons" className="donation-button animate-button">
              Faire un Don <span className="arrow-icon">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section Avis D'utilisateurs */}
      <div className="reviews-container">
        <div className="reviews-bg">
          <div className="reviews-gradient"></div>

          {/* PERFORMANCE IMPROVEMENT: Reduced nature elements */}
          <div className="reviews-nature-container">
            {/* Keeping only essential plants */}
            <div className="reviews-growing-plant left"></div>
            <div className="reviews-growing-plant right"></div>

            {/* Reduced birds to 1 */}
            <div className="reviews-bird bird-1"></div>

            {/* Reduced floating leaves */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`reviews-floating-leaf leaf-${(i % 3) + 1}`}
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40 + i * 15}%`,
                  animationDuration: `${15 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}

            {/* Keeping mist effects */}
            <div className="reviews-mist-top"></div>
            <div className="reviews-mist-bottom"></div>

            {/* Reduced fireflies */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="reviews-firefly"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${25 + i * 15}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  animationDuration: `${12 + i}s`,
                  animationDelay: `${i}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <h2 className="reviews-main-title">Avis D'utilisateurs</h2>

        <div className="reviews-content-container">
          <div className="reviews-ratings-container">
            <h3 className="reviews-section-title">Notes</h3>

            {ratingsData ? (
              <div className="reviews-ratings-content">
                <div className="reviews-count">
                  {ratingsData.totalReviews} avis
                </div>

                <div className="rating-row">
                  <div className="rating-stars">5 ★</div>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{
                        width: `${calculateRatingPercentage(
                          ratingsData.fiveStars
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="rating-row">
                  <div className="rating-stars">4 ★</div>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{
                        width: `${calculateRatingPercentage(
                          ratingsData.fourStars
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="rating-row">
                  <div className="rating-stars">3 ★</div>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{
                        width: `${calculateRatingPercentage(
                          ratingsData.threeStars
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="rating-row">
                  <div className="rating-stars">2 ★</div>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{
                        width: `${calculateRatingPercentage(
                          ratingsData.twoStars
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="rating-row">
                  <div className="rating-stars">1 ★</div>
                  <div className="rating-bar-container">
                    <div
                      className="rating-bar"
                      style={{
                        width: `${calculateRatingPercentage(
                          ratingsData.oneStar
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="reviews-loading">
                <div className="rating-loading-animation"></div>
                <p>Chargement des évaluations...</p>
              </div>
            )}
          </div>

          <div className="reviews-comments-container">
            <h3 className="reviews-section-title">Les Avis Des Clients</h3>

            {reviewsData ? (
              <div className="reviews-comments-content">
                <div className="review-card">
                  <div className="review-name">
                    {reviewsData[currentReviewIndex].name.toUpperCase()}
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`review-star ${
                          i < reviewsData[currentReviewIndex].rating
                            ? "filled"
                            : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="review-comment">
                    {reviewsData[currentReviewIndex].comment}
                  </div>
                  <div className="review-navigation">
                    <button
                      onClick={() => navigateReview("prev")}
                      className="review-nav-button prev"
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={() => navigateReview("next")}
                      className="review-nav-button next"
                    >
                      &#8250;
                    </button>
                  </div>
                </div>

                <div className="review-indicators">
                  {reviewsData.map((_, index) => (
                    <div
                      key={index}
                      className={`review-indicator ${
                        index === currentReviewIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentReviewIndex(index)}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="reviews-loading">
                <div className="review-loading-animation"></div>
                <p>Chargement des avis...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeCommerçant;
