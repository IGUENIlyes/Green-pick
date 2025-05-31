/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Create a simple version of useFavorites until you implement the full context
// eslint-disable-next-line no-unused-vars
const useFavorites = () => {
  return {
    favoritesCount: 0,
    isFavorited: () => false,
    toggleFavorite: () =>
      console.log("Favorites functionality not implemented yet"),
  };
};

// Update Header to accept favoritesCount as a prop
const Header = ({
  cartTotal = "1500.00 DZ",
  favoritesCount = 0,
  favoriteProducts = [],
  onCartClick,
  onRemoveFavorite,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favoritesPopupOpen, setFavoritesPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Toggle dropdown menu
  // eslint-disable-next-line no-unused-vars
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle favorites popup
  const toggleFavoritesPopup = () => {
    setFavoritesPopupOpen(!favoritesPopupOpen);
  };

  // Toggle categories dropdown
  // (Removed unused toggleCategoriesDropdown and showCategoriesDropdown state)

  // Update the handler for removing favorites
  const handleRemoveFavorite = (productId, e) => {
    // Stop event propagation to prevent closing the popup
    if (e) e.stopPropagation();

    // Use the prop function if available, otherwise fallback to window handler
    if (onRemoveFavorite) {
      onRemoveFavorite(productId);
    } else if (window.onRemoveFavorite) {
      window.onRemoveFavorite(productId);
    }
  };

  // Sample categories data - will be used in the dropdown
  const categoriesMenu = [
    { id: 1, title: "Tout Les paniers", link: "/all-baskets" },
    { id: 2, title: "Restauration Rapide Locale", link: "/local-fast-food" },
    { id: 3, title: "Restaurants de Grillades", link: "/grill-restaurants" },
    {
      id: 4,
      title: "Restaurants de Fruits de Mer",
      link: "/seafood-restaurants",
    },
    { id: 5, title: "Restaurants de Luxe", link: "/luxury-restaurants" },
    { id: 6, title: "Cuisine Internationale", link: "/international-cuisine" },
    { id: 7, title: "Pâtisseries", link: "/pastries" },
    { id: 8, title: "Cafés & Thés", link: "/cafes-teas" },
    { id: 9, title: "Cuisine Végétarienne", link: "/vegetarian-cuisine" },
    { id: 10, title: "Cuisine Asiatique", link: "/asian-cuisine" },
  ];

  return (
    <header className="header" style={{ backgroundColor: "#2e9e66" }}>
      <div className="logo-container">
        <img
          src="/logo.png"
          alt="GREENPICK"
          className="header-logo"
          style={{ marginRight: "15px" }} // Added spacing between logo and text
        />
        <span className="header-title">
          <span className="green-letter">G</span>REEN
          <span className="orange-letter">P</span>ICK
        </span>
      </div>

      <nav className="header-nav">
        <Link to="/accueil" className="header-link">
          accueil
        </Link>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <a
            href="#"
            className="header-link"
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
              textShadow: "1px 1px 5px rgba(0, 0, 0)",
            }}
            onClick={(e) => {
              e.preventDefault();
              setOpen((o) => !o);
            }}
          >
            catégories <span style={{ fontSize: 18 }}>▼</span>
          </a>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -30, borderRadius: 50 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                  borderRadius: 12,
                  transition: {
                    height: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.2 },
                    borderRadius: { duration: 0.2, delay: 0.1 },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -10,
                  borderRadius: 50,
                  transition: {
                    duration: 0.2,
                    height: { delay: 0.1 },
                  },
                }}
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "#e0f7ea",
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.9), inset 0 -5px 15px rgba(0,0,0,0.2)",
                  minWidth: 220,
                  maxHeight: 380,
                  overflowY: "auto",
                  zIndex: 100,
                  transformOrigin: "top center",
                  perspective: "1000px",
                  border: "2px solid rgba(255,255,255,0.9)",
                }}
                className="categories-dropdown"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{ padding: "6px 0" }}
                >
                  {categoriesMenu.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.04,
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -20,
                        transition: {
                          duration: 0.15,
                          delay: (categoriesMenu.length - index) * 0.02,
                        },
                      }}
                      style={{
                        padding: "10px 16px",
                        color: "#03190d",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                        margin: "4px 6px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.7)",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.1), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -3px 8px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(5px)",
                        position: "relative",
                        overflow: "hidden",
                        textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                      }}
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(26, 155, 138, 0.15)",
                        color: "#004d40",
                        x: 8,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOpen(false)}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: 2,
                          background:
                            "linear-gradient(90deg, #00c853, #18ffff)",
                        }}
                      />
                      {cat.title}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="#contact" className="header-link">
          contact
        </a>
      </nav>

      <div className="header-icons">
        <div className="icon-container" style={{ position: "relative" }}>
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill={favoritesCount > 0 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            onClick={toggleFavoritesPopup} // Add click handler to toggle popup
            style={{ cursor: "pointer" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>

          {/* Updated favorites badge to match the green circular design */}
          {favoritesCount > 0 && (
            <span className="badge">{favoritesCount}</span>
          )}
        </div>
        <Link to="/profil_utilisateur">
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
        </Link>

        <div
          className="cart-container"
          onClick={onCartClick}
          style={{ cursor: "pointer" }}
        >
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

      {/* Enhanced Favorites Popup with animations */}
      {favoritesPopupOpen && (
        <div className="favorites-popup-overlay" onClick={toggleFavoritesPopup}>
          <div
            className="favorites-popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="favorites-popup-header">
              <h2>Mes Paniers Préférés</h2>
              <button
                className="close-popup-btn"
                onClick={toggleFavoritesPopup}
              >
                ×
              </button>
            </div>

            <div className="favorites-items-container">
              {favoriteProducts.length > 0 ? (
                favoriteProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="favorite-product-card"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      position: "relative",
                    }} // Added position relative for proper button placement
                  >
                    <div className="favorite-product-image">
                      <img
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="favorite-product-info">
                      <h3>{product.title}</h3>
                      <div className="favorite-product-price-row">
                        <span className="favorite-product-price">
                          {product.price}
                        </span>
                        <span className="favorite-product-original-price">
                          {product.originalPrice}
                        </span>
                      </div>
                      <div className="favorite-product-location">
                        <i className="fas fa-map-marker-alt location-icon"></i>
                        {product.location?.name ||
                          "Localisation non disponible"}
                      </div>
                    </div>
                    <button
                      className="remove-favorite-btn"
                      onClick={(e) => handleRemoveFavorite(product.id, e)}
                      aria-label="Retirer des favoris"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        zIndex: 5,
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#ff6b6b";
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.querySelector("svg path").style.fill =
                          "white";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.7)";
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.querySelector("svg path").style.fill =
                          "currentColor";
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                          fill="currentColor"
                        />
                      </svg>
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-favorites">
                  <div className="empty-icon">💚</div>
                  <p>Aucun panier dans vos favoris</p>
                  <p className="empty-subtitle">
                    Cliquez sur le cœur pour ajouter des paniers à vos favoris
                  </p>
                </div>
              )}
            </div>

            {favoriteProducts.length > 0 && (
              <div className="favorites-popup-footer">
                <div className="favorites-summary">
                  <div className="favorites-summary-row">
                    <span>Total</span>
                    <span className="favorites-total-price">
                      {favoriteProducts
                        .reduce((total, product) => {
                          const price =
                            parseFloat(product.price.replace(/[^\d.-]/g, "")) ||
                            0;
                          return total + price;
                        }, 0)
                        .toFixed(2)}{" "}
                      DZ
                    </span>
                  </div>
                </div>
                <div className="favorites-actions">
                  <button
                    className="continue-shopping"
                    onClick={toggleFavoritesPopup}
                  >
                    Continuer vos achats
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
