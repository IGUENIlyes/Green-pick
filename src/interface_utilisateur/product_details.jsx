/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./product_details.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

// Import products and fallbackProduct directly from categories
import { products, fallbackProduct } from "./categories";
// Sample categories
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
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add navigate for potential redirects
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  // Initialize cartTotal to 0 instead of a fixed value
  const [cartTotal, setCartTotal] = useState(0);
  // Add state for review functionality
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  // Add state for review slider
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  // Add these new state variables for dynamic sliding animation
  const [slideDirection, setSlideDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);
  // Add state for favorite toggling
  const [isFavorite, setIsFavorite] = useState(false);
  // Add state for favorites count
  const [favoritesCount, setFavoritesCount] = useState(0);
  // Add state for favorite products
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  // Add state for cart popup
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  // Add cart items state to track items in cart
  const [cartItems, setCartItems] = useState([]);

  // Use the favorites context
  // const { toggleFavorite, isFavorited } = useFavorites();
  useEffect(() => {
    // Improved debugging
    console.log("Products available:", products?.length || 0);
    console.log("Looking for product with ID:", id, typeof id);
    // Simplified product fetching logic with better error handling
    try {
      setLoading(true);

      if (!products || products.length === 0) {
        console.error("Products array is empty or undefined");
        throw new Error("Products data not available");
      }

      // Find product from the directly imported products array
      const productId = parseInt(id);
      console.log("Parsed product ID:", productId);

      // Log all product IDs to help debugging
      console.log(
        "Available product IDs:",
        products.map((p) => p.id)
      );

      const foundProduct = products.find((p) => p.id === productId);

      if (foundProduct) {
        console.log("Product found:", foundProduct.title);
        setProduct(foundProduct);
      } else {
        console.log("Product not found, using fallback");
        setProduct({ ...fallbackProduct, id: productId });
        setError("Produit spécifique non trouvé");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(fallbackProduct);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(0, prev + amount));
  };
  // Update handleAddToCart to save to localStorage
  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      // Calculate the price to add to cart
      const priceValue = parseFloat(product.price.replace(/[^\d.-]/g, "")) || 0;
      const totalToAdd = priceValue * quantity;

      // Update cart total
      const newTotal = cartTotal + totalToAdd;
      setCartTotal(newTotal);

      // Save to localStorage
      localStorage.setItem("cartTotal", newTotal.toString());

      // Add to cart items array
      const updatedCartItems = [...cartItems];
      const existingItemIndex = updatedCartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        updatedCartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        updatedCartItems.push({ ...product, quantity });
      }

      setCartItems(updatedCartItems);

      // Save cart items to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Format and display the new total
      const formattedTotal = `${newTotal.toFixed(2)} DZ`;

      // Alert with formatted message
      alert(`Ajouté ${quantity} de ${product.title} au panier
Prix unitaire: ${product.price}
Total ajouté: ${totalToAdd.toFixed(2)} DZ
Nouveau total du panier: ${formattedTotal}`);
    }
  };
  // Format cartTotal for display in Header component - show 0 when empty
  const formattedCartTotal =
    cartTotal > 0 ? `${cartTotal.toFixed(2)} DZ` : "0.00 DZ";

  // Generate stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">
            ★
          </span>
        ))}
        {hasHalfStar && <span className="star half-filled">★</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="star">
            ★
          </span>
        ))}
      </div>
    );
  };

  // Add handler for review submission
  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert("Veuillez attribuer une note avant d'envoyer votre avis");
      return;
    }

    // Here you would typically send the review to your backend
    console.log("Review submitted:", {
      productId: product?.id,
      rating: userRating,
      comment: userComment,
    });

    alert("Merci pour votre avis !");

    // Reset form after submission
    setUserRating(0);
    setUserComment("");
  };

  // Add functions to handle review navigation
  const handlePrevReviews = () => {
    if (isSliding) return; // Prevent multiple slides at once

    setSlideDirection("prev");
    setIsSliding(true);

    // Short timeout to allow animation to start before changing data
    setTimeout(() => {
      setCurrentReviewIndex((prev) =>
        prev === 0 ? (product.reviews?.length || 5) - 3 : Math.max(0, prev - 3)
      );

      // Reset sliding state after animation completes
      setTimeout(() => setIsSliding(false), 300);
    }, 50);
  };

  const handleNextReviews = () => {
    if (isSliding) return; // Prevent multiple slides at once

    setSlideDirection("next");
    setIsSliding(true);

    // Short timeout to allow animation to start before changing data
    setTimeout(() => {
      setCurrentReviewIndex((prev) =>
        prev + 3 >= (product.reviews?.length || 5) ? 0 : prev + 3
      );

      // Reset sliding state after animation completes
      setTimeout(() => setIsSliding(false), 300);
    }, 50);
  };

  // Attach the remove favorite handler to window for Header component
  useEffect(() => {
    window.onRemoveFavorite = (productId) => {
      setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));

      // If current product was removed, update its favorite status
      if (product && product.id === productId) {
        setIsFavorite(false);
      }

      // Update favorite count
      setFavoritesCount((prev) => Math.max(0, prev - 1));
    };

    return () => {
      window.onRemoveFavorite = undefined;
    };
  }, [product]);

  // Update toggle favorite function to manage favorites count and products list
  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Update favorites count
    const newCount = newFavoriteStatus
      ? favoritesCount + 1
      : Math.max(0, favoritesCount - 1);

    setFavoritesCount(newCount);

    // Save to localStorage
    localStorage.setItem("favoritesCount", newCount.toString());

    // Update favorite products list
    let updatedFavorites = [...favoriteProducts];

    if (newFavoriteStatus && product) {
      // Check if product is already in favorites
      if (!updatedFavorites.some((p) => p.id === product.id)) {
        updatedFavorites.push(product);
      }
    } else if (product) {
      updatedFavorites = updatedFavorites.filter((p) => p.id !== product.id);
    }

    setFavoriteProducts(updatedFavorites);

    // Save to localStorage
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
  };

  // Handler for toggling cart popup
  const toggleCartPopup = () => {
    setCartPopupOpen(!cartPopupOpen);
  };

  // Handler for removing items from cart
  const removeFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove) {
      const itemPrice =
        parseFloat(itemToRemove.price.replace(/[^\d.-]/g, "")) || 0;
      const newTotal = Math.max(
        0,
        cartTotal - itemPrice * itemToRemove.quantity
      );
      setCartTotal(newTotal);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  // Add useEffect to load data from localStorage on component mount
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
      const savedFavs = JSON.parse(savedFavoriteProducts);
      setFavoriteProducts(savedFavs);

      // Check if current product is in favorites
      if (product && savedFavs.some((p) => p.id === product.id)) {
        setIsFavorite(true);
      }
    }
  }, [product]);

  return (
    <>
      <Header
        cartTotal={formattedCartTotal}
        favoritesCount={favoritesCount}
        favoriteProducts={favoriteProducts}
        onCartClick={toggleCartPopup}
      />

      {/* Cart Popup */}
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
              backgroundColor: "#024A3E", // Changed from white to dark green
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              animation: "slideUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
              border: "1px solid rgba(255, 255, 255, 0.15)", // Changed border to be more visible on dark bg
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
                    backgroundColor: "#93C573",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
                backgroundColor: "#035E50", // Changed from light gray to dark green
                flex: 1,
              }}
            >
              {cartItems.length > 0 ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 0 12px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.15)", // Changed border color
                      marginBottom: "16px",
                      color: "#e0e0e0", // Changed from gray to light gray for better contrast
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
                        backgroundColor: "#037362", // Changed from white to darker green
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
                              color: "#ffffff", // Changed from dark to white
                            }}
                          >
                            {item.title}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "#cccccc", // Changed from gray to light gray
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
                              backgroundColor: "rgba(147, 197, 114, 0.2)", // Changed background
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              color: "#a5e388", // Changed to light green
                              fontWeight: 600,
                            }}
                          >
                            Quantité: {item.quantity}
                          </div>
                          <div
                            style={{
                              color: "#a5e388", // Changed to light green
                              fontWeight: 700,
                              fontSize: "1.05rem",
                            }}
                          >
                            {item.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: "none",
                          border: "none",
                          fontSize: "14px",
                          color: "#bbb",
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
                          e.currentTarget.style.backgroundColor = "#ffebeb";
                          e.currentTarget.style.color = "#ff6b6b";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "#bbb";
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
                    color: "#e0e0e0", // Changed from gray to light gray
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor: "rgba(147, 197, 114, 0.2)", // Changed background
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
                      color: "#cccccc", // Changed to light gray
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
                borderTop: "1px solid rgba(255, 255, 255, 0.15)", // Changed border
                backgroundColor: "#024A3E", // Match container background
              }}
            >
              {cartItems.length > 0 && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "14px",
                    backgroundColor: "rgba(147, 197, 114, 0.15)", // Darker background
                    borderRadius: "8px",
                    border: "1px solid rgba(147, 197, 114, 0.2)", // Added subtle border
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    
                  </div>
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
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    color: "#495057",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e9ecef";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                >
                  Continuer les achats
                </button>

                {cartItems.length > 0 && (
                  <button
                    style={{
                      flex: "1",
                      padding: "12px",
                      backgroundColor: "#93C572",
                      border: "none",
                      borderRadius: "6px",
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

      {/* Product Details Content */}
      <div className="product-details-container">
        {/* Enhanced background elements with flowers and nature objects */}
        <div className="bg-elements">
          {/* Existing elements */}
          <div className="float-circle"></div>
          <div className="float-circle"></div>
          <div className="float-circle"></div>
          <div className="float-circle"></div>
          <div className="glow-accent"></div>
          <div className="glow-accent"></div>
          <div className="bg-wave"></div>
          <div className="bg-wave"></div>

          {/* New animated flower elements with enhanced animations */}
          <div className="animated-flower flower1 dancing"></div>
          <div className="animated-flower flower2 pulsing"></div>
          <div className="animated-flower flower3 floating"></div>
          <div className="animated-flower flower4 spinning"></div>
          <div className="animated-flower flower5 bouncing"></div>

          {/* Additional flower elements */}
          <div className="animated-flower flower6 floating-spin"></div>
          <div className="animated-flower flower7 sway"></div>
          <div className="animated-flower flower8 breathing"></div>
          <div className="animated-flower flower9 rotating-zoom"></div>
          <div className="animated-flower flower10 wiggle"></div>

          {/* Floating leaves with enhanced animations */}
          <div className="floating-leaf leaf-elm1 flutter"></div>
          <div className="floating-leaf leaf-elm2 drift"></div>
          <div className="floating-leaf leaf-elm3 twirl"></div>
          <div className="floating-leaf leaf-elm4 float-dance"></div>
          <div className="floating-leaf leaf-elm5 spiral"></div>

          {/* Enhanced butterflies */}
          <div className="butterfly butterfly1 flutter-path"></div>
          <div className="butterfly butterfly2 zigzag-path"></div>
          <div className="butterfly butterfly3 circular-path"></div>

          {/* Grass elements at bottom with motion */}
          <div className="grass-element grass1 sway-slow"></div>
          <div className="grass-element grass2 sway-medium"></div>
          <div className="grass-element grass3 sway-fast"></div>

          {/* Particle elements for additional depth */}
          <div className="particle particle1"></div>
          <div className="particle particle2"></div>
          <div className="particle particle3"></div>
          <div className="particle particle4"></div>
          <div className="particle particle5"></div>
          <div className="particle particle6"></div>
          <div className="particle particle7"></div>
          <div className="particle particle8"></div>
          <div className="particle particle9"></div>
          <div className="particle particle10"></div>

          {/* Pollen floating elements */}
          <div className="pollen pollen1"></div>
          <div className="pollen pollen2"></div>
          <div className="pollen pollen3"></div>
          <div className="pollen pollen4"></div>
          <div className="pollen pollen5"></div>
        </div>

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <p>Affichage des informations de remplacement</p>
          </div>
        ) : null}

        {product && (
          <>
            <h1
              className="product-title"
              style={{
                textAlign: "center",
                width: "100%",
                margin: "0 auto 30px auto",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {product.title}
            </h1>

            <div className="product-image-container">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.title}
                className="product-detail-image"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                  e.target.onerror = null;
                }}
              />
            </div>

            <div className="product-info-container">
              {/* Combined container for description and location */}
              <div
                className="info-combined-wrapper"
                style={{
                  width: "85%",
                  maxWidth: "800px",
                  margin: "0 auto 20px auto",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Combined content in a single presentation */}
                <h2>Informations du Panier</h2>

                <div className="combined-content">
                  <p className="product-description">{product.description}</p>

                  <ul
                    className="product-details-list"
                    style={{ marginBottom: "20px" }}
                  >
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>

                  {/* Location information integrated directly */}
                  <div
                    className="location-info"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      padding: "15px",
                      borderRadius: "8px",
                    }}
                  >
                    <p>
                      <strong>Lieu de Retrait:</strong> {product.location.name}
                    </p>
                    <p>
                      <strong>Adresse:</strong> {product.location.address}
                    </p>
                    <p>
                      <strong>Heure de Retrait:</strong>{" "}
                      {product.location.hours}
                    </p>
                    <p>
                      <strong>Téléphone:</strong> {product.location.phone}
                    </p>
                  </div>

                  {/* Decorative sparkle dots distributed throughout content */}
                  <div
                    className="sparkle-dot"
                    style={{ top: "20%", left: "10%" }}
                  ></div>
                  <div
                    className="sparkle-dot"
                    style={{ top: "60%", right: "15%" }}
                  ></div>
                  <div
                    className="sparkle-dot"
                    style={{ top: "80%", left: "30%" }}
                  ></div>
                </div>
              </div>

              <div className="purchase-section">
                <div className="price-container">
                  <div className="original-price">{product.originalPrice}</div>
                  <div className="current-price">{product.price}</div>
                </div>

                <div className="rating-container">
                  {renderStars(product.rating)}
                  <span className="review-count">
                    ({product.reviewCount} avis)
                  </span>
                </div>

                <div className="availability">
                  <span>Disponibilité : </span>
                  <strong>{product.disponibilite} paniers restants !</strong>
                </div>

                <div className="actions-container">
                  <div className="favorite-section">
                    <span>Ajouter aux favoris</span>
                    <button
                      className={`favorite-button ${
                        isFavorite ? "active" : ""
                      }`}
                      onClick={toggleFavorite}
                      aria-label={
                        isFavorite
                          ? "Retirer des favoris"
                          : "Ajouter aux favoris"
                      }
                    >
                      <svg
                        className="heart-icon"
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke={isFavorite ? "red" : "#ffffff"}
                        fill={isFavorite ? "red" : "none"}
                        strokeWidth="1.5"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="add-to-cart-container">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 0}
                      >
                        -
                      </button>
                      <div className="quantity-counter">{quantity}</div>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="add-to-cart-button"
                      onClick={handleAddToCart}
                      disabled={quantity <= 0}
                    >
                      Ajouter au Panier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Section - Add after all product details */}
            <div className="review-section">
              {/* Nature animations */}
              <div className="nature-elements">
                <div className="leaf leaf1"></div>
                <div className="leaf leaf2"></div>
                <div className="leaf leaf3"></div>
                <div className="leaf leaf4"></div>
                <div className="sunbeam"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
                <div className="firefly"></div>
              </div>

              <div className="review-container">
                <h2 className="review-title">
                  Partagez Votre Expérience Avec Nous !
                </h2>
                <p className="review-subtitle">
                  Votre avis compte ! Laissez une note, partagez vos impressions
                  et aidez-nous à améliorer nos services. Merci pour votre
                  contribution !
                </p>

                <div className="rating-input">
                  <p>attribuer une note :</p>
                  <div className="star-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star-option ${
                          star <= userRating ? "selected" : ""
                        }`}
                        onClick={() => setUserRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="comment-input">
                  <p>écrire un commentaire :</p>
                  <textarea
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Qu'avez-vous pensé de ce panier surprise ? Partagez vos retours : la qualité des produits, la variété et votre expérience globale. Vos commentaires nous aident à nous améliorer et à offrir le meilleur à nos clients."
                    rows={5}
                  />
                </div>

                <button
                  className="submit-review-btn"
                  onClick={handleSubmitReview}
                >
                  Envoyer mon avis
                </button>
              </div>
            </div>

            {/* Client Reviews Section with enhanced background animations */}
            <div className="client-reviews-section">
              {/* Orbital animations */}
              <div className="orbit-container">
                <div className="orbit orbit-1">
                  <div className="orbit-point"></div>
                </div>
                <div className="orbit orbit-2">
                  <div className="orbit-point"></div>
                </div>
                <div className="orbit orbit-3">
                  <div className="orbit-point"></div>
                  <div className="orbit-point"></div>
                </div>
              </div>

              <div className="client-reviews-container">
                <h2 className="reviews-title">Avis Clients</h2>
                <p className="reviews-subtitle">
                  Voici quelques témoignages de ceux qui ont sauvé leur panier
                </p>

                <div
                  className={`reviews-slider-container ${
                    isSliding ? `sliding ${slideDirection}` : ""
                  }`}
                >
                  {/* Left Arrow */}
                  <button
                    className="review-slider-arrow left-arrow"
                    onClick={handlePrevReviews}
                    aria-label="Avis précédents"
                    disabled={isSliding}
                  >
                    <span>&#10094;</span>
                  </button>

                  <div className="reviews-cards-container">
                    {product.reviews && product.reviews.length > 0
                      ? // If product has reviews, show them with sliding window
                        product.reviews
                          .slice(currentReviewIndex, currentReviewIndex + 3)
                          .map((review, index) => (
                            <div key={index} className="review-card">
                              <h3 className="reviewer-name">{review.name}</h3>
                              <p className="review-text">{review.comment}</p>
                              <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`review-star ${
                                      i < review.rating ? "filled" : ""
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))
                      : // Use fallback reviews with added examples
                        [
                          {
                            name: "LAYLA",
                            comment:
                              "Des produits toujours frais et délicieux, et j'adore l'idée de réduire le gaspillage !",
                            rating: 4,
                          },
                          {
                            name: "KHALED",
                            comment:
                              "Un excellent rapport qualité-prix ! Les pains et viennoiseries sont toujours frais, et je suis devenue accro à ce panier !",
                            rating: 5,
                          },
                          {
                            name: "LYNA",
                            comment:
                              "Sauver ce panier a été une excellente décision ! Les pains étaient croustillants, et les viennoiseries se sont volatilisées en un rien de temps",
                            rating: 4.5,
                          },
                          {
                            name: "AHMED",
                            comment:
                              "Je recommande vivement ! Ces paniers sont une façon géniale de découvrir de nouveaux produits tout en faisant une bonne action.",
                            rating: 5,
                          },
                          {
                            name: "SOFIA",
                            comment:
                              "Ma famille adore ces paniers surprises ! Les enfants sont toujours excités de découvrir ce qu'il y a à l'intérieur. Excellent service !",
                            rating: 4,
                          },
                          {
                            name: "Macyl",
                            comment:
                              "Igerrez , d lxedma l3ali , ttmenighawen afud igarzen ",
                            rating: 5,
                          },
                        ]
                          .slice(currentReviewIndex, currentReviewIndex + 3)
                          .map((review, index) => (
                            <div key={index} className="review-card">
                              <h3 className="reviewer-name">{review.name}</h3>
                              <p className="review-text">{review.comment}</p>
                              <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`review-star ${
                                      i < review.rating ? "filled" : ""
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    className="review-slider-arrow right-arrow"
                    onClick={handleNextReviews}
                    aria-label="Avis suivants"
                    disabled={isSliding}
                  >
                    <span>&#10095;</span>
                  </button>
                </div>

                {/* Review Navigation Dots */}
                <div className="review-navigation-dots">
                  {/* Calculate how many dots needed based on reviews count */}
                  {[
                    ...Array(Math.ceil((product.reviews?.length || 5) / 3)),
                  ].map((_, i) => (
                    <span
                      key={i}
                      className={`nav-dot ${
                        currentReviewIndex / 3 === i ? "active" : ""
                      }`}
                      onClick={() => setCurrentReviewIndex(i * 3)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Add export statement - this was missing and is likely causing the blank page
export default ProductDetails;
