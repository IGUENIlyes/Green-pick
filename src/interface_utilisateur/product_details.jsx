/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./product_details.css";
import Header from "../components/Header";

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
  const [cartTotal, setCartTotal] = useState("1500.00 DZ");
  // Add state for review functionality
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  // Add state for review slider
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  // Add these new state variables for dynamic sliding animation
  const [slideDirection, setSlideDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);

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
  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      // Add to cart logic
      alert(`Ajouté ${quantity} de ${product.title} au panier`);
    }
  };
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

  return (
    <>
      <Header cartTotal={cartTotal} />
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

          {/* New animated flower elements */}
          <div className="animated-flower flower1"></div>
          <div className="animated-flower flower2"></div>
          <div className="animated-flower flower3"></div>
          <div className="animated-flower flower4"></div>
          <div className="animated-flower flower5"></div>

          {/* Floating leaves */}
          <div className="floating-leaf leaf-elm1"></div>
          <div className="floating-leaf leaf-elm2"></div>
          <div className="floating-leaf leaf-elm3"></div>

          {/* Butterflies */}
          <div className="butterfly butterfly1"></div>
          <div className="butterfly butterfly2"></div>

          {/* Grass elements at bottom */}
          <div className="grass-element grass1"></div>
          <div className="grass-element grass2"></div>
          <div className="grass-element grass3"></div>
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
            <h1 className="product-title">{product.title}</h1>

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
              {/* Wrap description and location in a container */}
              <div className="info-sections-wrapper">
                <div className="description-section">
                  <h2>Description</h2>
                  <p className="product-description">{product.description}</p>

                  <ul className="product-details-list">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="location-section">
                  {/* Add sparkling dots for map-like animation effect */}
                  <div className="sparkle-dot"></div>
                  <div className="sparkle-dot"></div>
                  <div className="sparkle-dot"></div>

                  <h3>Localisation de Retrait :</h3>

                  <ul className="location-details">
                    <li>
                      <strong>Lieu :</strong> {product.location.name}
                    </li>
                    <li>
                      <strong>Adresse :</strong> {product.location.address}
                    </li>
                    <li>
                      <strong>Heure de Retrait :</strong>{" "}
                      {product.location.hours}
                    </li>
                    <li>
                      <strong>Téléphone :</strong> {product.location.phone}
                    </li>
                  </ul>
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
                    <span>Ajouter aux favoris : </span>
                    <button
                    //   className={`favorite-button ${
                    //     isFavorited(product.id) ? "active" : ""
                    //   }`}
                    //   onClick={() => toggleFavorite(product.id)}
                    >
                      {/*{isFavorited(product.id) ? "❤️" : "🤍"}*/}
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
