/* eslint-disable no-unused-vars */
// interface_utilisateur/categories.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./categories.css";
import TestimonialsSection from "./tem";
import backgroundImage from "/forme sin (1).png";
import Header from "../components/Header"; // Import the Header component
import { Link } from "react-router-dom";
import { color } from "chart.js/helpers";
const categories = [
  {
    id: 1,
    title: "Tout Les paniers",
    imageUrl: "/CREEN PIck 23 (6).png",
  },
  {
    id: 2,
    title: "Restauration Rapide Locale",
    imageUrl: "https://example.com/images/restauration.png",
  },
  {
    id: 3,
    title: "Restaurants de Grillades",
    imageUrl: "https://example.com/images/grillades.png",
  },
  {
    id: 4,
    title: "Restaurants de Fruits de Mer",
    imageUrl: "https://example.com/images/fruits-de-mer.png",
  },
  {
    id: 5,
    title: "Restaurants de Luxe",
    imageUrl: "https://example.com/images/luxe.png",
  },
  {
    id: 6,
    title: "Cuisine Internationale",
    imageUrl: "https://example.com/images/internationale.png",
  },
  {
    id: 7,
    title: "Pâtisseries",
    imageUrl: "https://example.com/images/patisseries.png",
  },
  {
    id: 8,
    title: "Cafés & Thés",
    imageUrl: "https://example.com/images/cafes.png",
  },
  {
    id: 9,
    title: "Cuisine Végétarienne",
    imageUrl: "https://example.com/images/vegetarienne.png",
  },
  {
    id: 10,
    title: "Cuisine Asiatique",
    imageUrl: "https://example.com/images/asiatique.png",
  },
];

export const products = [
  {
    id: 1,
    title: "Pains, Viennoiseries...",
    price: "150.00 DZ",
    originalPrice: "300.00 DZ",
    rating: 4.3,
    reviewCount: 15,
    imageUrl: "/Messi.png",
    description:
      "Savourez un délicieux panier surprise regroupant nos pains artisanaux et viennoiseries qui n'ont pas été vendus dans la journée.",
    details: [
      "Pains variés : baguette croustillante, pain au levain moelleux et autres spécialités artisanales.",
      "Viennoiseries : croissants au beurre, pains au chocolat fondants, et autres desserts.",
      "Éléments surprises : brioches ou petits pains garnis, selon disponibilité.",
    ],
    location: {
      name: "Boulangerie Centrale",
      address: "15 Rue des Oliviers, Béjaïa 06000, Algérie",
      hours: "De 16h à 18h",
      phone: "+213 34 20 96 56",
    },
    disponibilite: 3,
  },
  {
    id: 2,
    title: "Burgers, frites, boissons",
    price: "200.00 DZ",
    originalPrice: "400.00 DZ",
    rating: 4.5,
    reviewCount: 8,
    imageUrl: "/path-to-your-image2.jpg",
    description:
      "Un panier complet avec nos délicieux burgers qui n'ont pas été vendus, accompagnés de frites croustillantes et de boissons rafraîchissantes.",
    details: [
      "Burgers variés : Plusieurs types de burgers selon la disponibilité du jour.",
      "Accompagnements : Frites fraîches et croustillantes.",
      "Boissons : Sélection de sodas ou jus disponibles en fin de journée.",
    ],
    location: {
      name: "Burger Express",
      address: "22 Rue Principale, Béjaïa 06000, Algérie",
      hours: "De 21h à 23h",
      phone: "+213 34 45 67 89",
    },
    disponibilite: 5,
  },
  {
    id: 3,
    title: "Pâtes, conserves, biscuits",
    price: "1000.00 DZ",
    originalPrice: "1500.00 DZ",
    rating: 4.8,
    reviewCount: 12,
    imageUrl: "/path-to-your-image3.jpg",
    description:
      "Un panier économique contenant des pâtes de qualité, des conserves variées et des biscuits qui n'ont pas été vendus à temps.",
    details: [
      "Pâtes variées : pâtes fraîches et sèches de différentes formes et tailles.",
      "Conserves : sauces tomates, légumes, et autres conserves de qualité.",
      "Biscuits : assortiment de biscuits sucrés et salés.",
    ],
    location: {
      name: "Épicerie Du Coin",
      address: "8 Avenue Centrale, Béjaïa 06000, Algérie",
      hours: "De 17h à 19h",
      phone: "+213 34 56 78 90",
    },
    disponibilite: 4,
  },
  {
    id: 4,
    title: "Pizzas, Calzones",
    price: "200.00 DZ",
    originalPrice: "400.00 DZ",
    rating: 4.3,
    reviewCount: 9,
    imageUrl: "/path-to-your-image4.jpg",
    description:
      "Panier surprise contenant diverses pizzas et calzones préparées le jour même et non vendues.",
    details: [
      "Pizzas variées : margherita, végétarienne, et autres saveurs disponibles.",
      "Calzones : farcis aux légumes et fromages selon disponibilité.",
      "Extras : parfois accompagnés de boissons ou desserts.",
    ],
    location: {
      name: "Pizzeria Napoli",
      address: "12 Rue du Port, Béjaïa 06000, Algérie",
      hours: "De 20h à 22h",
      phone: "+213 34 12 34 56",
    },
    disponibilite: 2,
  },
  {
    id: 5,
    title: "Tartelettes, éclairs, macarons",
    price: "250.00 DZ",
    originalPrice: "500.00 DZ",
    rating: 4.7,
    reviewCount: 14,
    imageUrl: "/path-to-your-image5.jpg",
    description:
      "Un assortiment de délicieuses pâtisseries françaises préparées le jour même.",
    details: [
      "Tartelettes : aux fruits, au chocolat, et autres variétés saisonnières.",
      "Éclairs : classiques au chocolat et café, mais aussi variétés spéciales.",
      "Macarons : différentes saveurs selon la création du jour.",
    ],
    location: {
      name: "Pâtisserie Française",
      address: "5 Place de la Liberté, Béjaïa 06000, Algérie",
      hours: "De 18h à 19h30",
      phone: "+213 34 90 12 34",
    },
    disponibilite: 6,
  },
  {
    id: 6,
    title: "Plat garni, brochettes",
    price: "850.00 DZ",
    originalPrice: "1200.00 DZ",
    rating: 4.9,
    reviewCount: 18,
    imageUrl: "/path-to-your-image6.jpg",
    description:
      "Plats traditionnels algériens complets avec brochettes de viande préparés dans la journée.",
    details: [
      "Plats garnis : couscous, riz, et accompagnements selon la disponibilité.",
      "Brochettes : variétés de viandes grillées (poulet, agneau, bœuf).",
      "Accompagnements : salades, sauces, et pain frais inclus.",
    ],
    location: {
      name: "Restaurant Traditionnel",
      address: "25 Boulevard Mohammed V, Béjaïa 06000, Algérie",
      hours: "De 19h à 21h",
      phone: "+213 34 78 90 12",
    },
    disponibilite: 3,
  },
  {
    id: 7,
    title: "Sushi Box Deluxe",
    price: "950.00 DZ",
    originalPrice: "1900.00 DZ",
    rating: 4.7,
    reviewCount: 11,
    imageUrl: "/path-to-your-image7.jpg",
    description:
      "Assortiment de sushis frais préparés le jour même, comprenant makis, nigiris et california rolls.",
    details: [
      "Variété de makis : saumon, thon, concombre et avocats selon disponibilité.",
      "Nigiris : sélection de poissons frais du jour.",
      "California rolls : créations spéciales du chef.",
    ],
    location: {
      name: "Sushi Express",
      address: "10 Rue de la Mer, Béjaïa 06000, Algérie",
      hours: "De 21h à 22h30",
      phone: "+213 34 23 45 67",
    },
    disponibilite: 2,
  },
  {
    id: 8,
    title: "Gâteaux Traditionnels",
    price: "550.00 DZ",
    originalPrice: "900.00 DZ",
    rating: 4.6,
    reviewCount: 16,
    imageUrl: "/path-to-your-image8.jpg",
    description:
      "Assortiment de pâtisseries traditionnelles algériennes préparées artisanalement.",
    details: [
      "Makrouds : à la datte et au miel.",
      "Baklava : aux amandes et pistaches.",
      "Autres spécialités : selon la production du jour.",
    ],
    location: {
      name: "Pâtisserie Traditionnelle",
      address: "15 Rue des Artisans, Béjaïa 06000, Algérie",
      hours: "De 16h à 18h30",
      phone: "+213 34 67 89 01",
    },
    disponibilite: 8,
  },
  {
    id: 9,
    title: "Panier Bio Légumes",
    price: "750.00 DZ",
    originalPrice: "1100.00 DZ",
    rating: 4.8,
    reviewCount: 20,
    imageUrl: "/path-to-your-image9.jpg",
    description:
      "Assortiment de légumes bio et frais de saison, récoltés localement et non vendus dans la journée.",
    details: [
      "Légumes de saison : tomates, courgettes, carottes, et autres selon disponibilité.",
      "Herbes fraîches : persil, coriandre, et menthe souvent inclus.",
      "Produits locaux : tous issus de producteurs des environs de Béjaïa.",
    ],
    location: {
      name: "Marché Bio",
      address: "3 Rue des Jardins, Béjaïa 06000, Algérie",
      hours: "De 17h à 19h",
      phone: "+213 34 45 67 89",
    },
    disponibilite: 5,
  },
];

export const fallbackProduct = {
  id: 0,
  title: "Produit Indisponible",
  price: "N/A",
  originalPrice: "N/A",
  rating: 0,
  reviewCount: 0,
  imageUrl: "/placeholder.png",
  description:
    "Les détails de ce produit ne sont pas disponibles pour le moment.",
  details: ["Aucun détail supplémentaire."],
  location: {
    name: "Non spécifié",
    address: "Non spécifiée",
    hours: "Non spécifiées",
    phone: "N/A",
  },
  disponibilite: 0,
};

const CategorySection = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Add state for cart and favorites
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Add state for cart popup
  const [cartPopupOpen, setCartPopupOpen] = useState(false);

  const categoriesMenu = [
    { name: "Tout Les paniers", link: "/all-baskets" },
    { name: "Restauration Rapide Locale", link: "/local-fast-food" },
    { name: "Restaurants de Grillades", link: "/grill-restaurants" },
    { name: "Restaurants de Fruits de Mer", link: "/seafood-restaurants" },
    { name: "Restaurants de Luxe", link: "/luxury-restaurants" },
    { name: "Cuisine Internationale", link: "/international-cuisine" },
    { name: "Pâtisseries", link: "/pastries" },
    { name: "Cafés & Thés", link: "/cafes-teas" },
    { name: "Cuisine Végétarienne", link: "/vegetarian-cuisine" },
    { name: "Cuisine Asiatique", link: "/asian-cuisine" },
  ];

  // Load cart and favorites data from localStorage on component mount
  useEffect(() => {
    // Load cart data
    const savedCartTotal = localStorage.getItem("cartTotal");
    if (savedCartTotal) {
      setCartTotal(parseFloat(savedCartTotal));
    }

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    // Load favorites data
    const savedFavoritesCount = localStorage.getItem("favoritesCount");
    if (savedFavoritesCount) {
      setFavoritesCount(parseInt(savedFavoritesCount));
    }

    const savedFavoriteProducts = localStorage.getItem("favoriteProducts");
    if (savedFavoriteProducts) {
      setFavoriteProducts(JSON.parse(savedFavoriteProducts));
    }

    // Set window handler for removing favorites
    window.onRemoveFavorite = removeFromFavorites;

    return () => {
      // Clean up when component unmounts
      window.onRemoveFavorite = undefined;
    };
  }, []);

  // Update function to toggle cart popup - remove navigation
  const toggleCartPopup = () => {
    setCartPopupOpen(!cartPopupOpen);
  };

  // Fix the removeFromCart function to properly handle state updates
  const removeFromCart = (itemId) => {
    try {
      const itemToRemove = cartItems.find((item) => item.id === itemId);
      if (itemToRemove) {
        const itemPrice =
          parseFloat(itemToRemove.price.replace(/[^\d.-]/g, "")) || 0;
        const itemQuantity = itemToRemove.quantity || 1;
        const newTotal = Math.max(0, cartTotal - itemPrice * itemQuantity);

        // Update total
        setCartTotal(newTotal);

        // Create updated items array first
        const updatedItems = cartItems.filter((item) => item.id !== itemId);

        // Update items state
        setCartItems(updatedItems);

        // Update localStorage with the new values
        localStorage.setItem("cartTotal", newTotal.toString());
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Provide fallback behavior or show error message
    }
  };

  // Add a function to navigate to product details page safely
  const viewProductDetails = (productId) => {
    try {
      // Close popup before navigation
      setCartPopupOpen(false);
      navigate(`/product_details/${productId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = `/product_details/${productId}`;
    }
  };

  // Add function to remove from favorites
  const removeFromFavorites = (productId) => {
    try {
      // Remove from favorites array
      const updatedFavorites = favoriteProducts.filter(
        (item) => item.id !== productId
      );
      setFavoriteProducts(updatedFavorites);

      // Update favorites count
      const newCount = Math.max(0, favoritesCount - 1);
      setFavoritesCount(newCount);

      // Update localStorage
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavorites)
      );
      localStorage.setItem("favoritesCount", newCount.toString());
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  };

  const formattedCartTotal =
    cartTotal > 0 ? `${cartTotal.toFixed(2)} DZ` : "0.00 DZ";

  const scrollLeft = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const newPosition = Math.max(scrollPosition - 400, 0);

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const newPosition = Math.min(scrollPosition + 400, maxScroll);

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const showMoreProducts = () => {
    setVisibleProducts(products.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const navigateToProductDetails = (productId) => {
    try {
      navigate(`/product_details/${productId}`);
    } catch (e) {
      const url = `/product_details/${productId}`;
      window.location.href = url;
    }
  };

  return (
    <>
      {/* Add Header component */}
      <Header
        cartTotal={formattedCartTotal}
        favoritesCount={favoritesCount}
        favoriteProducts={favoriteProducts}
        onCartClick={toggleCartPopup}
        onRemoveFavorite={removeFromFavorites}
        categoriesMenu={categoriesMenu}
      />

      {/* Cart Popup with professional styling to match product_details page */}
      {cartPopupOpen && (
        <div
          className="cart-popup-overlay"
          onClick={toggleCartPopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(5px)",
            animation: "fadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            className="cart-popup-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "620px",
              maxHeight: "85vh",
              backgroundColor: "#024A3E", // Dark green background
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              animation: "slideUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Header with gradient */}
            <div
              className="cart-popup-header"
              style={{
                background: "linear-gradient(135deg, #025C4C 0%, #038D6A 100%)",
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#93C572",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>🛒</span>
                </div>
                Mon Panier
              </h2>
              <button
                className="close-popup-btn"
                onClick={toggleCartPopup}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.15)";
                }}
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div
              className="cart-items-container"
              style={{
                padding: "16px 24px",
                maxHeight: "calc(85vh - 180px)",
                overflowY: "auto",
                backgroundColor: "#035E50", // Dark green background
                flex: 1,
              }}
            >
              {cartItems && cartItems.length > 0 ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 0 12px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                      marginBottom: "16px",
                      color: "#e0e0e0",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Produit
                    </span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Prix
                    </span>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="cart-item"
                      style={{
                        display: "flex",
                        padding: "12px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        backgroundColor: "#037362", // Dark green for items
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        position: "relative",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.25)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 0, 0, 0.15)";
                      }}
                    >
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          marginRight: "14px",
                        }}
                      >
                        <img
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onClick={() => viewProductDetails(item.id)}
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                            e.target.onerror = null;
                          }}
                        />
                      </div>

                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0 0 4px 0",
                              fontSize: "1rem",
                              fontWeight: 600,
                              color: "#ffffff",
                              cursor: "pointer",
                            }}
                            onClick={() => viewProductDetails(item.id)}
                          >
                            {item.title}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "#cccccc",
                              fontSize: "0.85rem",
                            }}
                          >
                            {[...Array(Math.floor(item.rating || 0))].map(
                              (_, i) => (
                                <span key={i} style={{ color: "#FFD700" }}>
                                  ★
                                </span>
                              )
                            )}
                            <span>({item.rating || 0})</span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "8px",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "rgba(147, 197, 114, 0.2)",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              color: "#a5e388",
                              fontWeight: 600,
                            }}
                          >
                            Quantité: {item.quantity || 1}
                          </div>
                          <div
                            style={{
                              color: "#a5e388",
                              fontWeight: 700,
                              fontSize: "1.05rem",
                            }}
                          >
                            {item.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: "none",
                          border: "none",
                          fontSize: "14px",
                          color: "#ccc",
                          cursor: "pointer",
                          padding: "4px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "20px",
                          height: "20px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#ff5252";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#ccc";
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "50px 0",
                    color: "#e0e0e0",
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor: "rgba(147, 197, 114, 0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      fontSize: "24px",
                    }}
                  >
                    🛒
                  </div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#ffffff" }}>
                    Votre panier est vide
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      maxWidth: "280px",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "#cccccc",
                    }}
                  >
                    Ajoutez des produits à votre panier pour combattre le
                    gaspillage alimentaire
                  </p>
                </div>
              )}
            </div>

            {/* Footer with totals and action buttons */}
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "#024A3E",
              }}
            >
              {cartItems && cartItems.length > 0 && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "14px",
                    backgroundColor: "rgba(147, 197, 114, 0.15)",
                    borderRadius: "8px",
                    border: "1px solid rgba(147, 197, 114, 0.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", color: "#a5e388" }}>
                      Total:
                    </span>
                    <span style={{ fontSize: "1.2rem", color: "#a5e388" }}>
                      {formattedCartTotal}
                    </span>
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  onClick={toggleCartPopup}
                  style={{
                    flex: "1",
                    padding: "12px",
                    backgroundColor: "transparent",
                    border: "2px solid rgba(147, 197, 114, 0.6)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(147, 197, 114, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Continuer vos achats
                </button>

                {cartItems && cartItems.length > 0 && (
                  <button
                    style={{
                      flex: "1",
                      padding: "12px",
                      backgroundColor: "#93C572",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 8px rgba(147, 197, 114, 0.3)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#7db35e";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(147, 197, 114, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#93C572";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(147, 197, 114, 0.3)";
                    }}
                  >
                    <Link
                      to="/payment"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      Passer la commande
                    </Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.section
        className="category-section"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={backgroundImage}
          alt=""
          className="category-background-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="category-header"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="title-with-fruits">
            <motion.div
              className="fruit-container left"
              whileHover={{
                scale: [1, 1.2, 1.1],
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon apple large-icon"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
            >
              Explorez Nos Catégories
            </motion.h2>

            <motion.div
              className="fruit-container right"
              whileHover={{
                scale: [1, 1.2, 1.1],
                rotate: [0, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon apple large-icon"
              />
            </motion.div>
          </div>

          <motion.p
            className="faite"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              delay: 0.5,
            }}
          >
            "Explorez nos différentes catégories pour des délices variés !"
          </motion.p>
        </motion.div>

        <div className="carousel-container">
          <motion.button
            className="nav-button nav-button-left"
            onClick={scrollLeft}
            whileHover={{
              scale: 1.2,
              x: -5,
              backgroundColor: "#4CAF50",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.div
            className="categories-carousel"
            ref={carouselRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div
                className="category-card"
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -15,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                  },
                }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <motion.div
                  className="category-icon"
                  animate={{
                    backgroundColor:
                      hoveredCategory === category.id ? "#4CAF50" : "#8cc490b8",
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  <AnimatePresence>
                    {!imageErrors[category.id] && (
                      <motion.img
                        src={category.imageUrl || "/placeholder.svg"}
                        alt={category.title}
                        className="category-image"
                        onError={() => handleImageError(category.id)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter:
                            hoveredCategory === category.id
                              ? "brightness(0) invert(1)"
                              : "brightness(0)",
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  className="category-title"
                  animate={{
                    scale: hoveredCategory === category.id ? [1, 1.1, 1.05] : 1,
                    color:
                      hoveredCategory === category.id ? "#4CAF50" : "white",
                    transition: {
                      scale: {
                        duration: 0.3,
                        repeat: hoveredCategory === category.id ? Infinity : 0,
                        repeatType: "reverse",
                      },
                    },
                  }}
                >
                  {category.title}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="nav-button nav-button-right"
            onClick={scrollRight}
            whileHover={{
              scale: 1.2,
              x: 5,
              backgroundColor: "#4CAF50",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="etp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.img
            src="etapes.jpeg"
            alt="etapes"
            className="etp"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          />
        </motion.div>
      </motion.section>

      <section className="products-section">
        <img
          src={backgroundImage}
          alt=""
          className="categori-background-image"
        />
        <div className="products-header">
          <div className="title-with-fruits">
            <div className="fruit-container left">
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon apple"
              />
            </div>

            <h2>Découvrez Nos Paniers Surprises !</h2>

            <div className="fruit-container right">
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon strawberry"
              />
            </div>
          </div>

          <p className="faite">
            Faites un geste pour la planète tout en vous régalant
          </p>

          <p className="subtitle">
            Nos paniers contiennent une sélection de produits alimentaires de
            qualité, soigneusement rassemblés à partir de commerces locaux, qui
            n'ont pas pu être vendus. Chaque panier est une surprise, offrant
            une variété de fruits, légumes, plats préparés, et bien plus encore.
          </p>
        </div>

        <div className="products-grid">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigateToProductDetails(product.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="product-image"
              />
              <div className="product-content">
                <div className="product-header">
                  <h3>{product.title}</h3>
                  <p style={{color : "darkgreen"}}>{product.location.name}</p>
                </div>
                <div className="product-footer">
                  <div className="rating">
                    <span className="rating-star">★</span>
                    <span style={{ color: "black" }}>{product.rating}</span>
                  </div>
                  <div className="prices">
                    <span className="old-price">{product.originalPrice}</span>
                    <span className="pess-current-price"> {product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <button className="view-more" onClick={showMoreProducts}>
            Voir Plus
          </button>
        )}
      </section>
      <div>
        <TestimonialsSection />
      </div>
    </>
  );
};

export default CategorySection;
