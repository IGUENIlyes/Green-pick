import { useState, useEffect } from "react";
import "./modifier__profil.css";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: "Cameron",
    prenom: "Williamson",
    email: "Cameron",
    nomCommerce: "nom",
    registreCommerce: "XXXXXXXXXXX",
    compteBancaire: "XXXXXXXXXXX",
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
            <img className="oops" src="logo.png" alt="image"></img>
            GREENPICK
          </a>
          <nav>
            <ul>
              <li>
                <a href="#">Accueil</a>
              </li>
              <li>
                <Link to="/Login"> S'identifier </Link>
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
              <button className="change-photo-btn" onClick={handlePhotoChange}>
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
                    htmlFor="nomCommerce"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    Nom du commerce
                  </label>
                  <input
                    type="text"
                    id="nomCommerce"
                    name="nomCommerce"
                    value={formData.nomCommerce}
                    onChange={handleChange}
                    placeholder="Entrez le nom du commerce"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="registreCommerce"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    N° du registe de commerce
                  </label>
                  <input
                    type="text"
                    id="registreCommerce"
                    name="registreCommerce"
                    value={formData.registreCommerce}
                    onChange={handleChange}
                    placeholder="Entrez le numéro de registre"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="compteBancaire"
                    style={{
                      color: "#ffffff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    N° de compte bancaire
                  </label>
                  <input
                    type="text"
                    id="compteBancaire"
                    name="compteBancaire"
                    value={formData.compteBancaire}
                    onChange={handleChange}
                    placeholder="Entrez le numéro de compte"
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
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="motDePasse"
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      placeholder="Entrez votre mot de passe"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      <Eye className="eye-icon" />
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
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmMotDePasse"
                      name="confirmMotDePasse"
                      value={formData.confirmMotDePasse}
                      onChange={handleChange}
                      placeholder="Confirmez votre mot de passe"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <Eye className="eye-icon" />
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
                <button type="submit" className="update-btn">
                  Mettre à jour
                </button>
                <button type="button" className="cancel-btn">
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

export default ProfileForm;
