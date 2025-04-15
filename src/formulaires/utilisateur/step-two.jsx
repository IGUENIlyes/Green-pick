

import { useState } from "react";
import Button from "./button";
 import { Checkbox } from "./checkbox";
import { Eye, EyeOff } from "lucide-react";
import { CheckCircle } from "lucide-react";
import FloatingLabelInput from "./floating-label-input";

// eslint-disable-next-line no-unused-vars
export default function StepTwo({ formData, updateFormData, onBack }) {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 8)
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    if (!formData.acceptTerms)
      newErrors.acceptTerms =
        "Vous devez accepter les conditions d'utilisation";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Ici, vous pourriez soumettre le formulaire complet
      console.log("Formulaire soumis avec succès", formData);
      alert("Inscription réussie!");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FloatingLabelInput
        id="password"
        label="Mot de passe"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={(e) => updateFormData({ password: e.target.value })}
        error={errors.password}
        rightElement={
          <button
            type="button"
            onClick={toggleShowPassword}
            className="text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      <FloatingLabelInput
        id="confirmPassword"
        label="Confirmez votre mot de passe"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="terms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            updateFormData({ acceptTerms: checked === true })
          }
          className="mt-1 border-orange-500 data-[state=checked]:bg-orange-500"
        />
        <label htmlFor="terms" className="text-sm">
          J&apos;accepte les Conditions d&apos;utilisation
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full"
        >
          S&apos;inscrire
        </Button>
      </div>
    </form>
  );
}
