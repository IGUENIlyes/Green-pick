"use client"

const StepOne = ({ formData, handleInputChange, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <div className="acheteur-form-step">
      <h1 className="acheteur-form-title">S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <div className="acheteur-form-group">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder="Nom"
            required
          />
        </div>
        <div className="acheteur-form-group">
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            placeholder="Prénom"
            required
          />
        </div>
        <div className="acheteur-form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="acheteur-form-group">
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            placeholder="Téléphone"
            required
          />
        </div>
        <button type="submit" className="acheteur-btn-submit">
          Continuer
        </button>
      </form>
    </div>
  )
}

export default StepOne
