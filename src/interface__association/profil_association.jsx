import { useState, useEffect } from "react";
import "../interface__commeçant/modifier__profil.css"; // Reuse the same CSS
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AssociationProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: "Cameron",
    prenom: "Williamson",
    email: "Cameron",
    nomAssociation: "nom",
    motDePasse: "",
    confirmMotDePasse: "",
    telephone: "+213 6 1723 1123",
    wilaya: "Béjaïa",
    adresse: "Parungkuda, Kab. Sukabumi",
  });
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=60&width=60"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire soumises:", formData);
    // Ici vous pouvez ajouter la logique pour envoyer les données au serveur
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePhotoChange = () => {
    // Simuler un clic sur l'input file caché
    document.getElementById("photo-upload").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add useEffect to set body background color when component mounts
  useEffect(() => {
    // Save the original background color
    const originalBackground = document.body.style.backgroundColor;

    // Set very dark green background color for the entire page
    document.body.style.backgroundColor = "#021a12"; // Very dark green, almost black
    document.documentElement.style.backgroundColor = "#021a12";

    // Reset to original on component unmount
    return () => {
      document.body.style.backgroundColor = originalBackground;
      document.documentElement.style.backgroundColor = originalBackground;
    };
  }, []);

  return (
    <>
      {/* Add inline style to the outermost wrapper for the dark green background */}
      <div style={{ backgroundColor: "#021a12", minHeight: "100vh" }}>
        <header className="didi">
          <a href="#" className="logo">
            <img
              className="oops"
              src="/logo.png"
              alt="Logo GreenPick"
              style={{
                display: "inline-block",
                marginRight: "10px",
                verticalAlign: "middle",
                maxHeight: "40px",
                width: "auto",
              }}
            />
            <span style={{ color: "#93C572" }}>G</span>REEN
            <span style={{ color: "#FF9800" }}>P</span>ICK
          </a>
          <nav>
            <ul style={{ display: "flex", gap: "80px" }}>
              <li>
                <Link to="/interface_association"> Accueil</Link>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div
          className="profile-container"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(14, 39, 37, 0.8)), url('ayyaw.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div
            className="content-overlay"
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <h1
              id="infopr"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Informations du profile
            </h1>

            <div className="photo-section">
              <div className="profile-photo">
                <img src={profileImage} alt="Photo de profil" />
              </div>
              <button
                className="change-photo-btn"
                onClick={handlePhotoChange}
                style={{
                  backgroundColor: "#e0e0e0", // Light gray
                  color: "#333333", // Darker text for better contrast
                  borderColor: "#d0d0d0", // Slightly darker border
                  transition: "all 0.3s ease", // Smooth transition
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#d0d0d0"; // Darker on hover
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0e0e0"; // Back to original
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Changez votre photo <span className="edit-icon">✏️</span>
              </button>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="nom"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Entrez votre nom"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="prenom"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Entrez votre prénom"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Entrez votre email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="nomAssociation"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Nom de l'association
                  </label>
                  <input
                    type="text"
                    id="nomAssociation"
                    name="nomAssociation"
                    value={formData.nomAssociation}
                    onChange={handleChange}
                    placeholder="Entrez le nom de l'association"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group password-group">
                  <label
                    htmlFor="motDePasse"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Mot de passe
                  </label>
                  <div
                    className="password-input-container"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="motDePasse"
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      placeholder="Entrez votre mot de passe"
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                        zIndex: 10,
                      }}
                    >
                      <Eye className="eye-icon" size={18} />
                    </button>
                  </div>
                </div>

                <div className="form-group password-group">
                  <label
                    htmlFor="confirmMotDePasse"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Confirmez votre mot de passe
                  </label>
                  <div
                    className="password-input-container"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmMotDePasse"
                      name="confirmMotDePasse"
                      value={formData.confirmMotDePasse}
                      onChange={handleChange}
                      placeholder="Confirmez votre mot de passe"
                      style={{ paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                        zIndex: 10,
                      }}
                    >
                      <Eye className="eye-icon" size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label
                    htmlFor="telephone"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    N° de téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Entrez votre numéro"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="wilaya"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Wilaya
                  </label>
                  <input
                    type="text"
                    id="wilaya"
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    placeholder="Entrez votre wilaya"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="adresse"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    placeholder="Entrez votre adresse"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="update-btn"
                  style={{
                    backgroundColor: "#93C572", // Changed to green to match theme
                    color: "white",
                    padding: "10px 25px",
                    borderRadius: "30px",
                    border: "none",
                    fontWeight: "600",
                    boxShadow: "0 2px 10px rgba(147, 197, 114, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#7db35e"; // Darker green on hover
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(147, 197, 114, 0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#93C572"; // Back to original green
                    e.currentTarget.style.boxShadow =
                      "0 2px 10px rgba(147, 197, 114, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Mettre à jour
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    padding: "10px 25px",
                    borderRadius: "30px",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.8)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.5)";
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssociationProfileForm;
