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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Panier ajouté avec succès!");
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
