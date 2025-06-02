/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import "./gestion-paniers.css"; // Reuse the same CSS file
import { Link } from "react-router-dom"; // Import Link for navigation
export default function GestionDons() {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // State for dynamic product fields
  const [products, setProducts] = useState([
    { id: 1, name: "Produits", quantity: 0 },
    { id: 2, name: "Produits", quantity: 0 },
    { id: 3, name: "Produits", quantity: 0 },
    { id: 4, name: "Produits", quantity: 0 },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate a unique ID for new products
  const generateId = () => {
    return Math.max(0, ...products.map((product) => product.id)) + 1;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Add a new product field with animation
  const addProduct = () => {
    // Create the new product
    const newProduct = { id: generateId(), name: "Produits", quantity: 0 };
    setProducts([...products, newProduct]);

    // Scroll to the bottom to show the new field after animation completes
    setTimeout(() => {
      const container = document.querySelector(".panier-form-fields");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  };

  // Remove a product field
  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Increment quantity for a product
  const incrementQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  // Decrement quantity for a product
  const decrementQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  // Function to check and refresh token if needed
  const checkTokenExpiration = async (tokens) => {
    try {
      // Check if token is expired (you can add more sophisticated checks)
      const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
      const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
      
      if (Date.now() >= expirationTime) {
        console.log('Token expired, attempting refresh...'); // Debug log
        const newAccessToken = await refreshToken(tokens.refresh);
        return { ...tokens, access: newAccessToken };
      }
      return tokens;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      throw new Error("Erreur de vérification du token");
    }
  };

  // Function to refresh the token
  const refreshToken = async (refreshToken) => {
    try {
      console.log('Attempting to refresh token with:', refreshToken); // Debug log
      const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      console.log('Refresh response status:', response.status); // Debug log
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response received:', await response.text());
        throw new Error("Réponse invalide du serveur");
      }

      const responseData = await response.json();
      console.log('Refresh response data:', responseData); // Debug log

      if (response.ok) {
        // Store both the new access token and keep the refresh token
        const currentTokens = JSON.parse(localStorage.getItem('tokens') || '{}');
        const newTokens = {
          ...currentTokens,
          access: responseData.access,
          refresh: currentTokens.refresh
        };
        
        localStorage.setItem('tokens', JSON.stringify(newTokens));
        console.log('New tokens stored:', newTokens); // Debug log
        return responseData.access;
      } else {
        // If refresh fails, clear tokens and throw error
        localStorage.removeItem('tokens');
        throw new Error(responseData.detail || "Session expirée, veuillez vous reconnecter");
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Clear tokens on error
      localStorage.removeItem('tokens');
      throw new Error("Erreur de rafraîchissement du token, veuillez vous reconnecter");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get the authentication token from localStorage
      const tokensStr = localStorage.getItem('tokens');
      console.log('Raw tokens from localStorage:', tokensStr); // Debug log
      
      if (!tokensStr) {
        setError("Vous devez être connecté pour créer un don");
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      let tokens;
      try {
        tokens = JSON.parse(tokensStr);
        console.log('Parsed tokens:', tokens); // Debug log
      } catch (parseError) {
        console.error('Error parsing tokens:', parseError);
        setError("Erreur de format des tokens d'authentification");
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      if (!tokens.access || !tokens.refresh) {
        setError("Tokens d'authentification incomplets");
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      // Check and refresh token if needed
      tokens = await checkTokenExpiration(tokens);
      console.log('Tokens after refresh check:', tokens); // Debug log

      // First, create all products
      const createdProducts = [];
      for (const product of products) {
        if (product.quantity > 0) {  // Only create products with quantity > 0
          const productFormData = new FormData();
          productFormData.append('name', product.name);
          productFormData.append('quantity', product.quantity);
          productFormData.append('price', 0);  // Donation products are free
          productFormData.append('value', 0);  // Donation products are free
          productFormData.append('expiry_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 7 days from now

          const productResponse = await fetch("http://127.0.0.1:8000/api/products/create/", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${tokens.access}`,
              'Accept': 'application/json',
            },
            body: productFormData
          });

          if (!productResponse.ok) {
            const errorData = await productResponse.json();
            throw new Error(errorData.detail || "Erreur lors de la création du produit");
          }

          const productData = await productResponse.json();
          createdProducts.push(productData.id);
        }
      }

      if (createdProducts.length === 0) {
        setError("Veuillez ajouter au moins un produit avec une quantité supérieure à 0");
        return;
      }

      // Then create the pack with the product IDs
      const packData = {
        products: createdProducts
      };

      // Log the request details
      console.log('Request URL:', "http://127.0.0.1:8000/api/products/create-pack/");
      console.log('Request headers:', {
        'Authorization': `Bearer ${tokens.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      console.log('Request data:', packData);

      // Make the API call to CreatePackView
      const response = await fetch("http://127.0.0.1:8000/api/products/create-pack/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packData)
      });

      console.log('Response status:', response.status); // Debug log
      console.log('Response headers:', Object.fromEntries(response.headers.entries())); // Debug log

      if (response.status === 401) {
        const errorData = await response.json().catch(() => ({}));
        console.log('401 Error details:', errorData); // Debug log
        console.log('Token used:', tokens.access); // Debug log
        setError(`Erreur d'authentification: ${errorData.detail || 'Token invalide ou expiré'}`);
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData); // Debug log
        setError(errorData.detail || "Erreur lors de la création du don");
        return;
      }

      const data = await response.json();
      console.log('Success response:', data); // Debug log
      
      // Show success message
      alert("Don créé avec succès!");
      
      // Reset form
      handleReset();

    } catch (err) {
      console.error("Error creating pack:", err);
      setError(err.message || "Une erreur est survenue lors de la création du don");
      // If there's an authentication error, redirect to login
      if (err.message.includes("Session expirée") || err.message.includes("authentication")) {
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProducts([
      { id: 1, name: "Produits", quantity: 0 },
      { id: 2, name: "Produits", quantity: 0 },
      { id: 3, name: "Produits", quantity: 0 },
      { id: 4, name: "Produits", quantity: 0 },
    ]);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Mock data for donations table
  const donationsData = [
    {
      id: 1,
      date: "xx/xx/xxxx",
      association: "Secours Alimentaire",
      quantite: "XX paniers",
      status: "Récupéré",
    },
    {
      id: 2,
      date: "xx/xx/xxxx",
      association: "Secours Alimentaire",
      quantite: "XX paniers",
      status: "Récupéré",
    },
    {
      id: 3,
      date: "xx/xx/xxxx",
      association: "Secours Alimentaire",
      quantite: "XX paniers",
      status: "En attente",
    },
    // Three new donation entries
    {
      id: 4,
      date: "xx/xx/xxxx",
      association: "Banque Alimentaire",
      quantite: "XX paniers",
      status: "Récupéré",
    },
    {
      id: 5,
      date: "xx/xx/xxxx",
      association: "Les Restos du Cœur",
      quantite: "XX paniers",
      status: "En attente",
    },
    {
      id: 6,
      date: "xx/xx/xxxx",
      association: "SOS Paniers Solidaires",
      quantite: "XX paniers",
      status: "Récupéré",
    },
  ];

  return (
    <>
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
          <Link to="/interface_commerçant">Acceuil</Link>
          <a
            href="#donations-section"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(".donations-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Tableau de dons
          </a>

          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("footer")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
          </a>
          <Link to="/commerçant_profil" className="profile-link">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="profile-icon"
            />
            Profil
          </Link>
        </div>
      </header>

      <div className="panier-container">
        {/* Animated background elements */}
        <div className="nature-animations">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
          <div className="leaf leaf-4"></div>
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="bird bird-1"></div>
          <div className="bird bird-2"></div>
          <div className="circle-decoration circle-1"></div>
          <div className="circle-decoration circle-2"></div>
          <div className="circle-decoration circle-3"></div>
        </div>

        <h1 className="panier-title">Gestion De Vos Dons</h1>

        <h2 className="panier-subtitle">Ajouter Un Nouveau Panier</h2>
        <p className="panier-instruction">
          Veuillez remplir les informations sur votre paniers
        </p>

        <form onSubmit={handleSubmit} className="panier-form">
          <div className="panier-form-content">
            {/* Left side - Image upload */}
            <div className="panier-image-upload" onClick={handleImageClick}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Aperçu du panier"
                  className="panier-preview"
                />
              ) : (
                <>
                  <div className="panier-upload-icon">+</div>
                  <p>Télécharger une Image pour le panier</p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="panier-file-input"
              />
            </div>

            {/* Right side - Product fields */}
            <div className="panier-form-fields">
              <h3 className="product-section-title">
                Description de votre panier :
              </h3>

              {/* Container for animated product fields */}
              <div className="product-fields-container">
                {/* Dynamic product fields */}
                {products.map((product) => (
                  <div key={product.id} className="product-field-container">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, name: e.target.value }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                      className="panier-input"
                      placeholder="Produit"
                    />
                    <div className="quantity-controls">
                      <button
                        type="button"
                        className="quantity-btn quantity-btn-minus"
                        onClick={() => decrementQuantity(product.id)}
                      >
                        -
                      </button>

                      {/* Quantity indicator */}
                      <div className="quantity-indicator">
                        {product.quantity}
                      </div>

                      <button
                        type="button"
                        className="quantity-btn quantity-btn-plus"
                        onClick={() => incrementQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add more button */}
              <div className="add-more-container">
                <button
                  type="button"
                  className="add-more-btn"
                  onClick={addProduct}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="panier-divider"></div>

          <div className="panier-actions">
            <button
              type="button"
              className="panier-button panier-button-cancel"
              onClick={handleReset}
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="panier-button panier-button-submit"
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "Soumettre"}
            </button>
          </div>

          {error && (
            <div className="error-message" style={{ 
              color: '#ff5252', 
              marginTop: '1rem', 
              padding: '0.5rem', 
              backgroundColor: 'rgba(255, 82, 82, 0.1)',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
        </form>

        {/* Donations Table Section */}
        <div className="sales-section donations-section" id="donations-section">
          <h2 className="sales-title">Les Dons</h2>

          <div className="sales-table-container">
            {/* Animated dots in background */}
            <div className="animated-dot dot1"></div>
            <div className="animated-dot dot2"></div>
            <div className="animated-dot dot3"></div>
            <div className="animated-dot dot4"></div>

            <table className="sales-table donations-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Association bénéficiaire</th>
                  <th>Quantité</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {donationsData.map((donation) => (
                  <tr key={donation.id}>
                    <td>{donation.date}</td>
                    <td>{donation.association}</td>
                    <td>{donation.quantite}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          donation.status === "Récupéré" ? "paid" : "unpaid"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
