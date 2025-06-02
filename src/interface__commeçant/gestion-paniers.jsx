import { useState, useRef } from "react";
import "./gestion-paniers.css";
import { Link } from "react-router-dom";

export default function GestionPaniers() {
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [valeur, setValeur] = useState("");
  const [quantite, setQuantite] = useState("");
  const [delaiRecuperation, setDelaiRecuperation] = useState(""); // New state for pickup deadline
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock sales data
  const salesData = [
    {
      id: 1,
      montant: "XXXX.00 DZD",
      acheteur: "Christine Brooks",
      methodePaiement: "Bitaqa Edahabia",
      quantite: "XX paniers",
      status: "Payé",
    },
    {
      id: 2,
      montant: "XXXX.00 DZD",
      acheteur: "Rosie Pearson",
      methodePaiement: "Bitaqa Edahabia",
      quantite: "XX paniers",
      status: "Payé",
    },
    {
      id: 3,
      montant: "XXXX.00 DZD",
      acheteur: "Darrell Caldwell",
      methodePaiement: "En espèce",
      quantite: "XX paniers",
      status: "Non payé",
    },
    {
      id: 4,
      montant: "XXXX.00 DZD",
      acheteur: "Gilbert Johnston",
      methodePaiement: "Bitaqa Edahabia",
      quantite: "XX paniers",
      status: "Payé",
    },
    {
      id: 5,
      montant: "XXXX.00 DZD",
      acheteur: "Alan Cain",
      methodePaiement: "En espèce",
      quantite: "XX paniers",
      status: "Non payé",
    },
    {
      id: 6,
      montant: "XXXX.00 DZD",
      acheteur: "Alfred Murray",
      methodePaiement: "En espèce",
      quantite: "XX paniers",
      status: "Non payé",
    },
    {
      id: 7,
      montant: "XXXX.00 DZD",
      acheteur: "Maggie Sullivan",
      methodePaiement: "Bitaqa Edahabia",
      quantite: "XX paniers",
      status: "Payé",
    },
    {
      id: 8,
      montant: "XXXX.00 DZD",
      acheteur: "Rosie Todd",
      methodePaiement: "En espèce",
      quantite: "XX paniers",
      status: "Payé",
    },
    {
      id: 9,
      montant: "XXXX.00 DZD",
      acheteur: "Dollie Hines",
      methodePaiement: "En espèce",
      quantite: "XX paniers",
      status: "Payé",
    },
  ];

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

  // Check token expiration before making a request
  const checkTokenExpiration = async (tokens) => {
    if (!tokens || !tokens.access || !tokens.refresh) {
      console.log('Missing tokens:', tokens); // Debug log
      throw new Error("Tokens d'authentification manquants");
    }

    try {
      const tokenParts = tokens.access.split('.');
      if (tokenParts.length !== 3) {
        throw new Error("Format de token invalide");
      }

      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      console.log('Token payload:', tokenPayload); // Debug log
      
      const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      console.log('Token expiration check:', { expirationTime, currentTime }); // Debug log

      if (currentTime >= expirationTime) {
        console.log('Token expired, refreshing...');
        const newAccessToken = await refreshToken(tokens.refresh);
        return {
          ...tokens,
          access: newAccessToken
        };
      }

      return tokens;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      throw error;
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
        setError("Vous devez être connecté pour créer un panier");
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

      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('description', description);
      formData.append('price', prix);  // Price after sale
      formData.append('value', valeur);  // Price before sale
      formData.append('quantity', quantite);
      formData.append('expiry_date', delaiRecuperation);
      
      // Add image if it exists
      if (fileInputRef.current?.files[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      // Log the request details
      console.log('Request URL:', "http://127.0.0.1:8000/api/products/create/");
      console.log('Request headers:', {
        'Authorization': `Bearer ${tokens.access}`,
        'Accept': 'application/json',
      });
      console.log('Form data:', Object.fromEntries(formData));

      // Make the API call to CreateProductView
      const response = await fetch("http://127.0.0.1:8000/api/products/create/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Accept': 'application/json',
        },
        body: formData
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
        setError(errorData.detail || "Erreur lors de la création du panier");
        return;
      }

      const data = await response.json();
      console.log('Success response:', data); // Debug log
      
      // Show success message
      alert("Panier créé avec succès!");
      
      // Reset form
      handleReset();

    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Une erreur est survenue lors de la création du panier");
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
    setDescription("");
    setPrix("");
    setValeur("");
    setQuantite("");
    setDelaiRecuperation(""); // Reset the new field
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          <Link to="/interface_commerçant">Accueil</Link>
          <a
            href="#sales-section"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(".sales-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Tableau de ventes
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

        <h1 className="panier-title">Gestion De Vos Paniers</h1>

        <h2 className="panier-subtitle">Ajouter Un Nouveau Panier</h2>
        <p className="panier-instruction">
          Veuillez remplir les informations sur vos paniers
        </p>

        <form onSubmit={handleSubmit} className="panier-form">
          <div className="panier-form-content">
            <div className="panier-image-upload" onClick={handleImageClick}>
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
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

            <div id="no-scroll-form" className="panier-form-fields">
              <div className="panier-form-group">
                <label htmlFor="description">
                  Description de votre panier :
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder="Ajouter une petite description de ce qui peut se trouver dans vos paniers"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="panier-input"
                />
              </div>

              <div className="panier-form-group">
                <label htmlFor="prix">Prix des paniers :</label>
                <input
                  type="text"
                  id="prix"
                  placeholder="XXXXXX.00 DZD"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="panier-input"
                />
              </div>

              <div className="panier-form-group">
                <label htmlFor="valeur">la valeur des paniers :</label>
                <input
                  type="text"
                  id="valeur"
                  placeholder="XXXXXX.00 DZD"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  className="panier-input"
                />
              </div>

              <div className="panier-form-group">
                <label htmlFor="quantite">Quantité :</label>
                <input
                  type="text"
                  id="quantite"
                  placeholder="XXXXXX"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  className="panier-input"
                />
              </div>

              {/* New input field for pickup deadline */}
              <div className="panier-form-group">
                <label htmlFor="delaiRecuperation">
                  Délai de récupération :
                </label>
                <input
                  type="datetime-local"
                  id="delaiRecuperation"
                  value={delaiRecuperation}
                  onChange={(e) => setDelaiRecuperation(e.target.value)}
                  className="panier-input"
                />
              </div>
            </div>
          </div>

          <div className="panier-divider"></div>

          <div className="panier-actions">
            <button
              type="button"
              className="panier-button panier-button-cancel"
              onClick={handleReset}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="panier-button panier-button-submit"
            >
              Soumettre
            </button>
          </div>
        </form>

        {/* Sales Table Section */}
        <div className="sales-section" id="sales-section">
          <h2 className="sales-title">Les Ventes</h2>

          <div className="sales-table-container">
            {/* Animated dots in background */}
            <div className="animated-dot dot1"></div>
            <div className="animated-dot dot2"></div>
            <div className="animated-dot dot3"></div>
            <div className="animated-dot dot4"></div>

            <table className="sales-table">
              <thead>
                <tr>
                  <th>Montant</th>
                  <th>Acheteur</th>
                  <th>Méthode de Paiement</th>
                  <th>Quantité</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.montant}</td>
                    <td>{sale.acheteur}</td>
                    <td>{sale.methodePaiement}</td>
                    <td>{sale.quantite}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          sale.status === "Payé" ? "paid" : "unpaid"
                        }`}
                      >
                        {sale.status}
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
