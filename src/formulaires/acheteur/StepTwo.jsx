"use client"

import { useState } from "react"

const StepTwo = ({ formData, handleInputChange, prevStep }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pourriez ajouter la logique pour soumettre le formulaire
    console.log("Formulaire soumis:", formData)
    alert("Inscription réussie!")
  }

  return (
    <div className="acheteur-form-step">
      <h1 className="acheteur-form-title">Sécurité</h1>
      <form onSubmit={handleSubmit}>
        <div className="acheteur-form-group acheteur-password-group">
          <input
            type={showPassword ? "text" : "password"}
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            required
          />
          <button type="button" className="acheteur-toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? "Masquer" : "Afficher"}
          </button>
        </div>
        <div className="acheteur-form-group">
          <input
            type="password"
            name="confirmMotDePasse"
            value={formData.confirmMotDePasse}
            onChange={handleInputChange}
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>
        <div className="acheteur-form-group acheteur-checkbox-group">
          <input
            type="checkbox"
            id="acceptConditions"
            name="acceptConditions"
            checked={formData.acceptConditions}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="acceptConditions">J'accepte les Conditions d'utilisation</label>
        </div>
        <div className="acheteur-form-buttons">
          <button type="button" className="acheteur-btn-submit acheteur-btn-back" onClick={prevStep}>
            Retour
          </button>
          <button type="submit" className="acheteur-btn-submit">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  )
}

export default StepTwo
