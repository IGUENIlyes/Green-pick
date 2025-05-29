import { useState, useRef } from "react";
import "./gestion-paniers.css";

export default function GestionPaniers() {
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [valeur, setValeur] = useState("");
  const [quantite, setQuantite] = useState("");
  const [delaiRecuperation, setDelaiRecuperation] = useState(""); // New state for pickup deadline
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire
    alert(`Panier ajouté avec succès!
    Description: ${description}
    Prix: ${prix}
    Valeur: ${valeur}
    Quantité: ${quantite}
    Délai de récupération: ${delaiRecuperation}`); // Added to alert
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
          <a href="/accueil">Accueil</a>
          <a href="/tableau-de-ventes">Tableau de ventes</a>

          <a href="/contact">Contact</a>
          <a href="/profile" className="profile-link">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="profile-icon"
            />
            Profil
          </a>
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
        <div className="sales-section">
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
