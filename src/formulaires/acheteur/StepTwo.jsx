"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const StepTwo = ({ formData, handleInputChange, prevStep }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      console.log('Sending registration request with data:', {
        first_name: formData.prenom,
        last_name: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        password: formData.motDePasse
      })

      const response = await fetch('http://127.0.0.1:8000/api/auth/signup/client/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.prenom,
          last_name: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          password: formData.motDePasse
        }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
        console.log('Response data:', data)
      } else {
        const text = await response.text()
        console.log('Non-JSON response:', text)
        throw new Error(`Server returned non-JSON response: ${text}`)
      }

      if (response.ok) {
        // Store the tokens in localStorage
        if (data.tokens && data.tokens.access && data.tokens.refresh) {
          localStorage.setItem('access_token', data.tokens.access)
          localStorage.setItem('refresh_token', data.tokens.refresh)
          
          // Show success message
          alert("Inscription réussie !")
          
          // Redirect to the categories page
          navigate('/interface_utilisateur/')
        } else {
          throw new Error('Invalid response format: missing tokens')
        }
      } else {
        // Handle validation errors
        if (data.detail) {
          setError(data.detail)
        } else if (typeof data === 'object') {
          const errorMessage = Object.entries(data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n')
          setError(errorMessage || "Une erreur est survenue lors de l'inscription")
        } else {
          setError("Une erreur est survenue lors de l'inscription")
        }
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    }
  }

  return (
    <div className="acheteur-form-step">
      <h1 className="acheteur-form-title">Sécurité</h1>
      {error && <div className="acheteur-error-message">{error}</div>}
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
          <button type="submit" className="acheteur-btn-submit" disabled={!formData.acceptConditions}>
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  )
}

export default StepTwo
