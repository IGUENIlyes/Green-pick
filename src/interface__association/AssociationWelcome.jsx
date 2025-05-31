/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./AssociationWelcome.css";
import LyesBar from "./lyes_bar";
import { Link } from "react-router-dom";
import backgroundImage from "/forme sin (1).png"; // Importez direct

const categories = [
  {
    id: 1,
    title: "Tout Les paniers",
    imageUrl: "/CREEN PIck 23 (6).png",
  },
  {
    id: 2,
    title: "Restauration Rapide Locale",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 3,
    title: "Restaurants de Grillades",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 4,
    title: "Restaurants de Fruits de Mer",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 5,
    title: "Restaurants de Luxe",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 6,
    title: "Cuisine Internationale",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 7,
    title: "Pâtisseries",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 8,
    title: "Cafés & Thés",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 9,
    title: "Cuisine Végétarienne",
    imageUrl: "CREEN PIck 23 (6).png",
  },
  {
    id: 10,
    title: "Cuisine Asiatique",
    imageUrl: "CREEN PIck 23 (6).png",
  },
];

const donations = [
  {
    id: 1,
    title: "Pains frais, viennoiseries, pâtisseries",
    image: "/Messi.png",
    description: "Pains frais et viennoiseries du jour",
    nom: "Boulangerie de HAMMOU",
    adresse: "18 Rue des Martyrs, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Pain frais du jour", quantite: 10, unite: "pièces" },
      { nom: "Croissants au beurre", quantite: 8, unite: "pièces" },
      { nom: "Tarte aux pommes", quantite: 3, unite: "pièces" },
    ],
    dateLimite: "Disponible jusqu'à demain 12h",
    imageModal: "/Messi.png",
  },
  {
    id: 2,
    title: "Burgers,frites,wraps poulet",
    image: "/Messi.png",
    description: "Menus complets à récupérer",
    nom: "Snack Express",
    adresse: "12 Avenue de la Liberté, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Burger maison", quantite: 5, unite: "pièces" },
      { nom: "Frites fraîches", quantite: 3, unite: "barquettes" },
      { nom: "Wraps poulet", quantite: 4, unite: "pièces" },
    ],
    dateLimite: "Disponible jusqu'à aujourd'hui 20h",
    imageModal: "/snack-modal.jpg",
  },
  {
    id: 3,
    title: "Fruits et légumes produits secs, conserves",
    image: "/Messi.png",
    description: "Produits frais et conserves",
    nom: "Primeur du Centre",
    adresse: "5 Rue Centrale, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Pommes", quantite: 12, unite: "kg" },
      { nom: "Carottes", quantite: 8, unite: "kg" },
      { nom: "Conserves de tomates", quantite: 6, unite: "boîtes" },
    ],
    dateLimite: "Disponible jusqu'à demain 18h",
    imageModal: "/primeur-modal.jpg",
  },
  {
    id: 4,
    title: "Pizzas,calzones",
    image: "/Messi.png",
    description: "Pizzas fraîches du jour",
    nom: "Pizzeria Bella",
    adresse: "22 Avenue de la Gare, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Pizza Margherita", quantite: 4, unite: "pièces" },
      { nom: "Calzone", quantite: 2, unite: "pièces" },
    ],
    dateLimite: "Disponible jusqu'à aujourd'hui 22h",
    imageModal: "/pizza-modal.jpg",
  },
  {
    id: 5,
    title: "Éclairs, macarons, tartelettes, cake",
    image: "/Messi.png",
    description: "Pâtisseries variées",
    nom: "Pâtisserie Douceur",
    adresse: "8 Rue des Fleurs, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Éclairs au chocolat", quantite: 6, unite: "pièces" },
      { nom: "Macarons assortis", quantite: 12, unite: "pièces" },
      { nom: "Tartelettes aux fruits", quantite: 5, unite: "pièces" },
      { nom: "Cake marbré", quantite: 1, unite: "gâteau" },
    ],
    dateLimite: "Disponible jusqu'à demain 15h",
    imageModal: "/patisserie-modal.jpg",
  },
  {
    id: 6,
    title: "Grillades variées",
    image: "/Messi.png",
    description: "Viandes et accompagnements",
    nom: "Grill House",
    adresse: "15 Route de Sétif, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Brochettes de poulet", quantite: 10, unite: "pièces" },
      { nom: "Côtelettes d'agneau", quantite: 6, unite: "pièces" },
      { nom: "Frites maison", quantite: 4, unite: "barquettes" },
    ],
    dateLimite: "Disponible jusqu'à aujourd'hui 23h",
    imageModal: "/grillades-modal.jpg",
  },
  {
    id: 7,
    title: "Sushi Box Deluxe",
    image: "/Messi.png",
    description: "Sushis frais du jour",
    nom: "Sushi Zen",
    adresse: "3 Rue de la Mer, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Sushi saumon", quantite: 16, unite: "pièces" },
      { nom: "California rolls", quantite: 12, unite: "pièces" },
      { nom: "Maki avocat", quantite: 8, unite: "pièces" },
    ],
    dateLimite: "Disponible jusqu'à aujourd'hui 21h",
    imageModal: "/sushi-modal.jpg",
  },
  {
    id: 8,
    title: "Plats Traditionnels",
    image: "/Messi.png",
    description: "Cuisine traditionnelle",
    nom: "Chez Mémé",
    adresse: "10 Rue des Oliviers, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Couscous royal", quantite: 3, unite: "plats" },
      { nom: "Tajine poulet olives", quantite: 2, unite: "plats" },
    ],
    dateLimite: "Disponible jusqu'à demain 13h",
    imageModal: "/traditionnel-modal.jpg",
  },
  {
    id: 9,
    title: "Salades Composées",
    image: "/Messi.png",
    description: "Salades fraîches",
    nom: "Salad'Bar",
    adresse: "27 Avenue de l'Indépendance, Béjaïa 06000, Algérie.",
    paniers: [
      { nom: "Salade César", quantite: 4, unite: "grandes barquettes" },
      { nom: "Salade niçoise", quantite: 3, unite: "grandes barquettes" },
      { nom: "Taboulé maison", quantite: 2, unite: "barquettes" },
    ],
    dateLimite: "Disponible jusqu'à aujourd'hui 19h",
    imageModal: "/salade-modal.jpg",
  },
];

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const DonationModal = ({ donation, onClose, onReserve, isAlreadyReserved }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!donation) return null;

  const handleReservation = () => {
    if (!isAlreadyReserved) {
      setShowConfirmation(true);
      onReserve(); // Call the onReserve callback when reservation is made
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }} onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: 700,
          width: "95%",
          padding: 0,
          borderRadius: 20,
          overflow: "hidden",
          background: "#03584e",
          color: "white",
          display: "flex",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          animate={{ x: showConfirmation ? -700 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2
            style={{
              color: "#4eff4e",
              marginBottom: 8,
              fontWeight: 700,
              fontSize: 22,
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            Commerçant offrant le don:
          </h2>
          <div
            style={{
              fontWeight: 700,
              color: "#4effd6",
              fontSize: 22,
              marginBottom: 8,
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            {donation.nom}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#b2f7e2",
              marginBottom: 18,
              fontSize: 15,
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            <span style={{ marginRight: 8 }}>📍</span>
            {donation.adresse}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 19,
              margin: "18px 0 6px 0",
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            Panier:
          </div>
          {donation.paniers &&
            donation.paniers.map((item, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: 16,
                  marginBottom: 2,
                  textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
                }}
              >
                {item.nom} : {item.quantite} {item.unite}
              </div>
            ))}
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 2,
              marginTop: 18,
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            Date limite de récupération:
          </div>
          <div
            style={{
              fontSize: 15,
              marginBottom: 24,
              textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
            }}
          >
            {donation.dateLimite}
          </div>
          {isAlreadyReserved ? (
            <button
              style={{
                background: "#cccccc",
                color: "white",
                border: "none",
                borderRadius: 20,
                padding: "12px 32px",
                fontWeight: 700,
                fontSize: 18,
                marginTop: 10,
                textShadow: "2px 2px 8px #012b1e, 0 0 4px #000",
              }}
              disabled
            >
              Don déjà réservé
            </button>
          ) : (
            <button
              style={{
                background: "#ff8c00",
                color: "white",
                border: "none",
                borderRadius: 20,
                padding: "12px 32px",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                marginTop: 10,
                textShadow: "2px 2px 8px #012b1e, 0 0 4px #000",
              }}
              onClick={handleReservation}
            >
              Réserver
            </button>
          )}
        </motion.div>

        <motion.div
          style={{
            flex: 1,
            minWidth: 250,
            background: "transparent",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            padding: 0,
            position: "relative",
            zIndex: 2,
          }}
          animate={{ x: showConfirmation ? -700 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <img
            src={donation.imageModal || donation.image}
            alt="Panier"
            style={{
              marginRight: "20px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "30px",
              maxHeight: "100%",
              display: "block",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
              transform: "translateX(32px)",
              background: "#01382f",
            }}
          />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            background: "#03584e",
            color: "white",
            zIndex: 3,
          }}
          initial={{ x: 700 }}
          animate={{ x: showConfirmation ? 0 : 700 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <div style={{ flex: 1, textAlign: "left" }}>
              <h2
                style={{
                  color: "#4eff4e",
                  marginBottom: 20,
                  fontSize: 28,
                  fontWeight: 700,
                  textShadow: "3px 3px 16px #012b1e, 0 0 8px #000",
                }}
              >
                Réservation Accordée !
              </h2>
              <p
                style={{
                  fontSize: 18,
                  marginBottom: 30,
                  lineHeight: 1.6,
                  textShadow: "2px 2px 8px #012b1e, 0 0 4px #000",
                }}
              >
                Veuillez récupérer votre don au magasin {donation.nom} avant la
                date limite.
              </p>
              <div
                style={{
                  background: "rgba(255, 140, 0, 0.2)",
                  padding: "15px 25px",
                  borderRadius: 15,
                  border: "2px solid #ff8c00",
                  marginBottom: 30,
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#ff8c00",
                    textShadow: "2px 2px 8px #012b1e, 0 0 4px #000",
                  }}
                >
                  Dernier délai pour la récupération&nbsp;:{" "}
                  {donation.dateLimite}
                </p>
              </div>
              <motion.button
                style={{
                  background: "#ff8c00",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "12px 32px",
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: "pointer",
                  textShadow: "2px 2px 8px #012b1e, 0 0 4px #000",
                }}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Fermer
              </motion.button>
            </div>

            <motion.div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                flexShrink: 0,
              }}
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <img
                src={donation.imageModal || donation.image}
                alt="Produit réservé"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Modify the delete confirmation component to be more compact
const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #e53935 0%, #b71c1c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        zIndex: 5,
        borderRadius: 12,
      }}
    >
      <p
        style={{
          color: "white",
          fontWeight: "600",
          margin: 0,
          fontSize: 14,
          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        Supprimer ce don ?
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "white",
            color: "#d32f2f",
            border: "none",
            padding: "6px 10px",
            borderRadius: 15,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          onClick={onConfirm}
        >
          Oui
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "6px 10px",
            borderRadius: 15,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          Non
        </motion.button>
      </div>
    </motion.div>
  );
};

// Update the CartModal component to fix scrolling issues
const CartModal = ({ isOpen, onClose, reservedItems = [], onRemoveItem }) => {
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  if (!isOpen) return null;

  const handleDeleteConfirm = (id) => {
    onRemoveItem(id);
    setItemToDeleteId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "80px",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        style={{
          background: "linear-gradient(135deg, #065f51 0%, #00332b 100%)",
          width: "90%",
          maxWidth: "550px",
          borderRadius: 20,
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh", // Set maximum height for the modal
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background:
              "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 180,
            height: 180,
            background:
              "radial-gradient(circle at bottom right, rgba(127,255,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: -40,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />

        {/* Header - Keep fixed at top */}
        <div
          style={{
            padding: "18px 25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 100%)",
            position: "relative",
            flexShrink: 0, // Prevent header from shrinking
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: 0,
              color: "#4effb5",
              fontSize: 22,
              fontWeight: 600,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ marginRight: 10 }}
            >
              <path d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
              <path d="M6 6l-2-4" />
            </svg>
            Dons Réservés
          </motion.h2>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "white",
              cursor: "pointer",
              padding: 0,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            &times;
          </motion.button>
        </div>

        {/* Items - Make this section scrollable */}
        <div
          style={{
            overflowY: "auto",
            padding: "5px 2px",
            scrollbarWidth: "thin",
            scrollbarColor: "#1b6b5b transparent",
            position: "relative",
            flex: 1, // Take up available space
          }}
        >
          {reservedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: "40px 25px",
                textAlign: "center",
                color: "#b3e0d7",
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  marginBottom: 15,
                  opacity: 0.6,
                }}
              >
                🛒
              </div>
              <p style={{ fontSize: 16, marginBottom: 5 }}>
                Aucun don réservé pour le moment.
              </p>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.7,
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                Réservez des dons alimentaires pour les retrouver ici et
                contribuer à réduire le gaspillage.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {reservedItems.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    padding: "15px 20px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 5px",
                    transition: "background-color 0.3s ease",
                    borderRadius: 12,
                    overflow: "hidden", // Add this to contain the sliding confirmation
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Item content */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        overflow: "hidden",
                        marginRight: 16,
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        border: "2px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 16,
                          color: "white",
                          fontWeight: 500,
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#7fcec0",
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            opacity: 0.8,
                          }}
                        >
                          📍
                        </span>
                        {item.nom}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                          marginTop: 4,
                        }}
                      >
                        {item.dateLimite}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(255,99,71,0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDeleteId(item.id);
                      }}
                      style={{
                        background: "rgba(255,99,71,0.3)",
                        color: "white",
                        border: "none",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        padding: 0,
                        cursor: "pointer",
                        marginLeft: 15,
                      }}
                    >
                      ×
                    </motion.button>
                  </div>

                  {/* Sliding delete confirmation */}
                  <AnimatePresence>
                    {itemToDeleteId === item.id && (
                      <DeleteConfirmation
                        onConfirm={() => handleDeleteConfirm(item.id)}
                        onCancel={() => setItemToDeleteId(null)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer - Keep fixed at bottom */}
        <div
          style={{
            padding: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
            flexShrink: 0, // Prevent footer from shrinking
          }}
        >
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            {reservedItems.length > 0
              ? `${reservedItems.length} don${
                  reservedItems.length > 1 ? "s" : ""
                } réservé${reservedItems.length > 1 ? "s" : ""}`
              : "Aucun don réservé"}
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#ff8c00",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#ff7b00",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 30,
              padding: "8px 20px",
              boxShadow:
                "0 4px 15px rgba(255,140,0,0.3), 0 2px 5px rgba(0,0,0,0.2)",
            }}
            onClick={onClose}
          >
            Fermer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Similarly update the FavoritesModal component to fix scrolling issues
const FavoritesModal = ({
  isOpen,
  onClose,
  favoriteItems = [],
  donations = [],
  onRemoveFavorite,
}) => {
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  if (!isOpen) return null;

  // Filter donations to show only those in favorites
  const favoritedDonations = donations.filter((donation) =>
    favoriteItems.has(donation.id)
  );

  const handleDeleteConfirm = (id) => {
    onRemoveFavorite(id);
    setItemToDeleteId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "80px",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        style={{
          background: "linear-gradient(135deg, #00796b 0%, #004d40 100%)",
          width: "90%",
          maxWidth: "550px",
          borderRadius: 20,
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh", // Set maximum height for the modal
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background:
              "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 180,
            height: 180,
            background:
              "radial-gradient(circle at bottom right, rgba(0,230,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: -40,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(0,230,0,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />

        {/* Header - Keep fixed at top */}
        <div
          style={{
            padding: "18px 25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 100%)",
            position: "relative",
            flexShrink: 0, // Prevent header from shrinking
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: 0,
              color: "#4effb5",
              fontSize: 22,
              fontWeight: 600,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ marginRight: 10 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Dons Favoris
          </motion.h2>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "white",
              cursor: "pointer",
              padding: 0,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            &times;
          </motion.button>
        </div>

        {/* Items - Make this section scrollable */}
        <div
          style={{
            overflowY: "auto",
            padding: "5px 2px",
            scrollbarWidth: "thin",
            scrollbarColor: "#1b6b5b transparent",
            position: "relative",
            flex: 1, // Take up available space
          }}
        >
          {favoritedDonations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: "40px 25px",
                textAlign: "center",
                color: "#b3e0d7",
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  marginBottom: 15,
                  opacity: 0.6,
                }}
              >
                💚
              </div>
              <p style={{ fontSize: 16, marginBottom: 5 }}>
                Aucun don favori pour le moment.
              </p>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.7,
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                Ajoutez des dons à vos favoris en cliquant sur l'icône de cœur.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {favoritedDonations.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    padding: "15px 20px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 5px",
                    transition: "background-color 0.3s ease",
                    borderRadius: 12,
                    overflow: "hidden", // Add this to contain the sliding confirmation
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Item content */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        overflow: "hidden",
                        marginRight: 16,
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        border: "2px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 16,
                          color: "white",
                          fontWeight: 500,
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#7fcec0",
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            marginRight: 5,
                            opacity: 0.8,
                          }}
                        >
                          📍
                        </span>
                        {item.nom}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: "rgba(255,99,71,0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDeleteId(item.id);
                      }}
                      style={{
                        background: "rgba(255,99,71,0.3)",
                        color: "white",
                        border: "none",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        padding: 0,
                        cursor: "pointer",
                        marginLeft: 15,
                      }}
                    >
                      ×
                    </motion.button>
                  </div>

                  {/* Sliding delete confirmation */}
                  <AnimatePresence>
                    {itemToDeleteId === item.id && (
                      <DeleteConfirmation
                        onConfirm={() => handleDeleteConfirm(item.id)}
                        onCancel={() => setItemToDeleteId(null)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer - Keep fixed at bottom */}
        <div
          style={{
            padding: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
            flexShrink: 0, // Prevent footer from shrinking
          }}
        >
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            {favoritedDonations.length > 0
              ? `${favoritedDonations.length} don${
                  favoritedDonations.length > 1 ? "s" : ""
                } favori${favoritedDonations.length > 1 ? "s" : ""}`
              : "Aucun don favori"}
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#00c853",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#00c853",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 30,
              padding: "8px 20px",
              boxShadow:
                "0 4px 15px rgba(0,200,83,0.3), 0 2px 5px rgba(0,0,0,0.2)",
            }}
            onClick={onClose}
          >
            Fermer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Update HeaderGreenpick to handle favorites click
const HeaderGreenpick = ({
  favoritesCount,
  reservedCount,
  onCartClick,
  onFavoritesClick,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const scrollToFooter = (e) => {
    e.preventDefault();
    // Find the footer element or last section of the page
    const footer =
      document.querySelector("footer") ||
      document.querySelector(".donations-section");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDonations = (e) => {
    e.preventDefault();
    const donationsSection = document.querySelector(".donations-section");
    if (donationsSection) {
      donationsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        background: "#1a9b8a",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 80,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="/logo.png"
          alt="GREENPICK"
          style={{ height: 54, width: 54, objectFit: "contain" }}
        />
        <span
          style={{
            fontWeight: 700,
            fontSize: 32,
            color: "#cef5e0 ",
            letterSpacing: 1,
            textShadow: "1px 1px 5px rgba(0, 0, 0)",
          }}
        >
          <span style={{ color: "#7FFF00" }}>G</span>REEN
          <span style={{ color: "#FF8C00" }}>P</span>ICK
        </span>
      </div>
      {/* Liens */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 50,
          position: "relative",
        }}
      >
        <Link
          to="/accueil"
          className="header-link"
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 500,
            textDecoration: "none",
            textShadow: "1px 1px 5px rgba(0, 0, 0)",
          }}
        >
          accueil
        </Link>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <a
            href="#"
            className="header-link"
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
              textShadow: "1px 1px 5px rgba(0, 0, 0)",
            }}
            onClick={(e) => {
              e.preventDefault();
              setOpen((o) => !o);
            }}
          >
            catégories <span style={{ fontSize: 18 }}>▼</span>
          </a>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -30, borderRadius: 50 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                  borderRadius: 12,
                  transition: {
                    height: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.2 },
                    borderRadius: { duration: 0.2, delay: 0.1 },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -10,
                  borderRadius: 50,
                  transition: {
                    duration: 0.2,
                    height: { delay: 0.1 },
                  },
                }}
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "#e0f7ea",
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.9), inset 0 -5px 15px rgba(0,0,0,0.2)",
                  minWidth: 220,
                  maxHeight: 380,
                  overflowY: "auto",
                  zIndex: 100,
                  transformOrigin: "top center",
                  perspective: "1000px",
                  border: "2px solid rgba(255,255,255,0.9)",
                }}
                className="categories-dropdown"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{ padding: "6px 0" }}
                >
                  {categories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.04,
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -20,
                        transition: {
                          duration: 0.15,
                          delay: (categories.length - index) * 0.02,
                        },
                      }}
                      style={{
                        padding: "10px 16px",
                        color: "#03190d",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                        margin: "4px 6px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.7)",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.1), inset 0 2px 5px rgba(255,255,255,0.9), inset 0 -3px 8px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(5px)",
                        position: "relative",
                        overflow: "hidden",
                        textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                      }}
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(26, 155, 138, 0.15)",
                        color: "#004d40",
                        x: 8,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOpen(false)}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: 2,
                          background:
                            "linear-gradient(90deg, #00c853, #18ffff)",
                        }}
                      />
                      {cat.title}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a
          href="#contact"
          className="header-link"
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 500,
            textDecoration: "none",
            textShadow: "1px 1px 5px rgba(0, 0, 0)",
          }}
          onClick={scrollToFooter}
        >
          contact
        </a>
        <a
          href="#dons"
          className="header-link"
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 500,
            textDecoration: "none",
            textShadow: "1px 1px 5px rgba(0, 0, 0)",
          }}
          onClick={scrollToDonations}
        >
          dons
        </a>
      </nav>
      {/* Icônes */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
       
        {/* Cœur avec badge */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "#f9fffc",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={onFavoritesClick}
          >
            <svg
              width="28"
              height="28"
              fill={favoritesCount > 0 ? "#1a9b8a" : "none"}
              stroke="#1a9b8a"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          {favoritesCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                background: "#00e600",
                color: "#f9fffc",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: "50%",
                minWidth: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
              }}
            >
              {favoritesCount}
            </span>
          )}
        </div>
        {/* Profil */}

        <Link to="/association_profile_form">
          <div
            style={{
              background: "#f9fffc",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="#1a9b8a"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </div>
        </Link>

        {/* Panier avec badge */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "#f9fffc",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={onCartClick}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="#1a9b8a"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
              <path d="M6 6l-2-4" />
            </svg>
          </div>
          {reservedCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                background: "#ff8c00", // Using orange for the cart badge to differentiate from favorites
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: "50%",
                minWidth: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
              }}
            >
              {reservedCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

const AssociationWelcome = () => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredDonation, setHoveredDonation] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [visibleDonations, setVisibleDonations] = useState(6);
  const [modalDonation, setModalDonation] = useState(null);
  const [reservedDonations, setReservedDonations] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reservedItems, setReservedItems] = useState([]);
  const [reservedDonationIds, setReservedDonationIds] = useState(new Set());
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const newPosition = Math.max(scrollPosition - 400, 0);
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const newPosition = Math.min(scrollPosition + 400, maxScroll);
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Gestion des erreurs d'image
  const handleImageError = (id) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const showMoreDonations = () => {
    setVisibleDonations(donations.length);
  };

  // Add this function to handle incrementing reserved count and adding item to reservedItems
  const incrementReservedCount = () => {
    if (modalDonation && !reservedDonationIds.has(modalDonation.id)) {
      setReservedDonations((count) => count + 1);

      // Use the ID as a key to prevent duplicate reservations
      setReservedDonationIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(modalDonation.id);
        return newSet;
      });

      // Check if this donation is already in reservedItems
      const alreadyExists = reservedItems.some(
        (item) => item.id === modalDonation.id
      );
      if (!alreadyExists) {
        setReservedItems((prev) => [...prev, modalDonation]);
      }
    }
  };

  // Function to check if a donation is already reserved
  const isDonationReserved = (donationId) => {
    return reservedDonationIds.has(donationId);
  };

  // Add function to remove an item from reservations
  const removeReservation = (donationId) => {
    // Remove from reservedDonationIds set
    setReservedDonationIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(donationId);
      return newSet;
    });

    // Remove from reservedItems array
    setReservedItems((prev) => prev.filter((item) => item.id !== donationId));

    // Decrement the reservation count
    setReservedDonations((count) => Math.max(0, count - 1));
  };

  // Add function to remove a favorite
  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(id);
      return newFavorites;
    });
  };

  return (
    <>
      <HeaderGreenpick
        favoritesCount={favorites.size}
        reservedCount={reservedDonations}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
      />

      <div className="association-welcome-container">
        <div className="welcome-overlay"></div>
        <motion.div
          className="welcome-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="welcome-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bienvenue Sur GreenPick ! Accédez Aux Dons Alimentaires Des
            Commerçants Locaux Et Gérez Vos Demandes Facilement.
          </motion.h1>
          <LyesBar />
        </motion.div>
      </div>

      <motion.section
        className="category-section"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={backgroundImage}
          alt=""
          className="category-background-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="category-header"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="title-with-fruits">
            <motion.div
              className="fruit-container left"
              whileHover={{
                scale: [1, 1.2, 1.1],
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon apple large-icon"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
            >
              Explorez Nos Catégories
            </motion.h2>

            <motion.div
              className="fruit-container right"
              whileHover={{
                scale: [1, 1.2, 1.1],
                rotate: [0, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <img
                src="GREENPICK.png"
                alt="Fruit"
                className="fruit-icon apple large-icon"
              />
            </motion.div>
          </div>

          <motion.p
            className="faite"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              delay: 0.5,
            }}
          >
            "Explorez nos différentes catégories pour des délices variés !"
          </motion.p>
        </motion.div>

        <div className="carousel-container">
          <motion.button
            className="nav-button nav-button-left"
            onClick={scrollLeft}
            whileHover={{
              scale: 1.2,
              x: -5,
              backgroundColor: "#4CAF50",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.div
            className="categories-carousel"
            ref={carouselRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div
                className="category-card"
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -15,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                  },
                }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <motion.div
                  className="category-icon"
                  animate={{
                    backgroundColor:
                      hoveredCategory === category.id ? "#4CAF50" : "#8cc490b8",
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  <AnimatePresence>
                    {!imageErrors[category.id] && (
                      <motion.img
                        src={category.imageUrl || "/placeholder.svg"}
                        alt={category.title}
                        className="category-image"
                        onError={() => handleImageError(category.id)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter:
                            hoveredCategory === category.id
                              ? "brightness(0) invert(1)"
                              : "brightness(0)",
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  className="category-title"
                  animate={{
                    scale: hoveredCategory === category.id ? [1, 1.1, 1.05] : 1,
                    color:
                      hoveredCategory === category.id ? "#4CAF50" : "white",
                    transition: {
                      scale: {
                        duration: 0.3,
                        repeat: hoveredCategory === category.id ? Infinity : 0,
                        repeatType: "reverse",
                      },
                    },
                  }}
                >
                  {category.title}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="nav-button nav-button-right"
            onClick={scrollRight}
            whileHover={{
              scale: 1.2,
              x: 5,
              backgroundColor: "#4CAF50",
              color: "white",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>

        {/* Remove the empty div that creates extra space */}
        {/* <motion.div className="etp" ...></motion.div> */}
      </motion.section>

      <motion.section
        className="donations-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          marginTop: 0, // Remove any top margin
          paddingTop: "40px", // Add some padding instead for spacing
        }}
      >
        <motion.div className="donations-header">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Découvrez Les Dons Disponibles !
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="donations-subtitle"
          >
            Accédez aux invendus généreusement offerts par nos commerçants
            partenaires. Réservez les dons qui vous intéressent et contribuez à
            la lutte contre le gaspillage alimentaire !
          </motion.p>
        </motion.div>

        <motion.div
          className="donations-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          {donations.slice(0, visibleDonations).map((donation) => (
            <motion.div
              key={donation.id}
              className="donation-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredDonation(donation.id)}
              onHoverEnd={() => setHoveredDonation(null)}
              onClick={() => setModalDonation(donation)}
              style={{
                position: "relative",
                background: "#ffffff",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                border: "2px solid #046B5C",
                padding: "8px",
              }}
            >
              <div
                className="donation-image-container"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "240px",
                  overflow: "hidden",
                  borderRadius: "18px",
                  marginBottom: "8px", // Added small margin to separate from title
                }}
              >
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="donation-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: isDonationReserved(donation.id)
                      ? "grayscale(30%)"
                      : "none",
                  }}
                />
                {isDonationReserved(donation.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "#ff8c00",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: "bold",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                      zIndex: 1,
                    }}
                  >
                    Réservé
                  </div>
                )}
              </div>

              {/* Title container with centered layout including heart below */}
              <div
                className="donation-title-container"
                style={{
                  padding: "0 5px 5px",
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#046B5C",
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "90%",
                  }}
                >
                  {donation.title}
                </h3>

                {/* Heart icon centered below the title - with enhanced hover effects */}
                <motion.button
                  className={`like-button ${
                    favorites.has(donation.id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(donation.id);
                  }}
                  whileHover={{
                    scale: 1.2,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: favorites.has(donation.id) ? "#e91e63" : "#ccc",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    marginTop: "2px",
                    transition: "color 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e91e63"; // Pink on hover
                  }}
                  onMouseLeave={(e) => {
                    if (!favorites.has(donation.id)) {
                      e.currentTarget.style.color = "#ccc"; // Back to gray if not favorited
                    } else {
                      e.currentTarget.style.color = "#e91e63"; // Stay pink if favorited
                    }
                  }}
                >
                  <HeartIcon filled={favorites.has(donation.id)} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleDonations < donations.length && (
          <motion.div
            className="show-more-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="show-more-button"
              onClick={showMoreDonations}
              whileHover={{
                scale: 1.1,
                y: -8,
                rotate: 3,
                backgroundColor: "#ff8c00",
                boxShadow: "0 20px 40px rgba(255, 140, 0, 0.4)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 8,
                  mass: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                },
              }}
              whileTap={{
                scale: 0.95,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
            >
              <motion.span
                whileHover={{
                  scale: 1.1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 8,
                  },
                }}
              >
                Voir Plus
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </motion.section>
      {modalDonation && (
        <DonationModal
          donation={modalDonation}
          onClose={() => setModalDonation(null)}
          onReserve={incrementReservedCount}
          isAlreadyReserved={isDonationReserved(modalDonation.id)}
        />
      )}
      <AnimatePresence>
        {isCartOpen && (
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            reservedItems={reservedItems}
            onRemoveItem={removeReservation}
          />
        )}
        {isFavoritesOpen && (
          <FavoritesModal
            isOpen={isFavoritesOpen}
            onClose={() => setIsFavoritesOpen(false)}
            favoriteItems={favorites}
            donations={donations}
            onRemoveFavorite={removeFavorite}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AssociationWelcome;
