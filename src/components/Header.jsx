import React, { useState } from "react";
import { Link } from "react-router-dom";

// Create a simple version of useFavorites until you implement the full context
const useFavorites = () => {
  return {
    favoritesCount: 0,
    isFavorited: () => false,
    toggleFavorite: () =>
      console.log("Favorites functionality not implemented yet"),
  };
};

const Header = ({ cartTotal = "1500.00 DZ" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  // Sample categories data
  const categories = [
    { id: 1, title: "Fruits & Légumes" },
    { id: 2, title: "Produits Laitiers" },
    { id: 3, title: "Viandes & Poissons" },
    { id: 4, title: "Boulangerie" },
    { id: 5, title: "Boissons" },
    { id: 6, title: "Épicerie" },
    { id: 7, title: "Bio & Écologique" },
    { id: 8, title: "Produits Locaux" },
  ];

  // Toggle dropdown menu
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="GREENPICK" className="header-logo" />
        <span className="header-title">
          <span className="green-letter">G</span>REEN
          <span className="orange-letter">P</span>ICK
        </span>
      </div>

      <nav className="header-nav">
        <Link to="/accueil" className="header-link">
          accueil
        </Link>

        <div className="dropdown-container">
          <a href="#" className="header-link" onClick={toggleDropdown}>
            catégories <span>▼</span>
          </a>

          {dropdownOpen && (
            <div className="categories-dropdown">
              {categories.map((category) => (
                <div key={category.id} className="category-item">
                  {category.title}
                  <div className="category-item-highlight"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="#contact" className="header-link">
          contact
        </a>
      </nav>

      <div className="header-icons">
        <div className="icon-container">
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <div className="icon-container" style={{ position: "relative" }}>
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill={favoritesCount > 0 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {favoritesCount > 0 && (
            <span className="badge">{favoritesCount}</span>
          )}
        </div>

        <div className="icon-container">
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>

        <div className="cart-container">
          <svg
            className="cart-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            <path d="M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="cart-total">
            Total D'achat
            <br />
            {cartTotal}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
