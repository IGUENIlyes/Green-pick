/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StepOne from "./step-one";
import StepTwo from "./step-two";
// import "./globals.css";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col" id="lut">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 -z-10">
            <img
              src="/background.jpg"
              alt="Légumes frais"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4 relative z-10">
            <h1 className="text-3xl font-bold text-green-800 text-center mb-8">
              S&apos;inscrire
            </h1>

            {currentStep === 1 ? (
              <StepOne
                formData={formData}
                updateFormData={updateFormData}
                onContinue={handleContinue}
              />
            ) : (
              <StepTwo
                formData={formData}
                updateFormData={updateFormData}
                onBack={handleBack}
              />
            )}

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="relative w-12 h-4">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 bg-orange-500 rounded-full"
                  initial={{ width: currentStep === 1 ? "100%" : "0%" }}
                  animate={{ width: currentStep === 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="relative w-12 h-4">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 bg-orange-500 rounded-full"
                  initial={{ width: currentStep === 2 ? "100%" : "0%" }}
                  animate={{ width: currentStep === 2 ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-gray-600">Déjà inscrit(e) ? </span>
              <Link href="#" className="text-green-800 font-medium">
                S&apos;identifier
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
