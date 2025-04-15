
import { useState } from "react";
import Button from "./button";
import FloatingLabelInput from "./floating-label-input";

export default function StepOne({ formData, updateFormData, onContinue }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.nom) newErrors.nom = "Le nom est requis";
    if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format d'email invalide";
    if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onContinue();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FloatingLabelInput
        id="nom"
        label="Nom"
        value={formData.nom}
        onChange={(e) => updateFormData({ nom: e.target.value })}
        error={errors.nom}
      />

      <FloatingLabelInput
        id="prenom"
        label="Prénom"
        value={formData.prenom}
        onChange={(e) => updateFormData({ prenom: e.target.value })}
        error={errors.prenom}
      />

      <FloatingLabelInput
        id="email"
        label="E-mail"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        error={errors.email}
      />

      <FloatingLabelInput
        id="telephone"
        label="Téléphone"
        type="tel"
        value={formData.telephone}
        onChange={(e) => updateFormData({ telephone: e.target.value })}
        error={errors.telephone}
      />

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full"
        >
          Continuer
        </Button>
      </div>
    </form>
  );
}
