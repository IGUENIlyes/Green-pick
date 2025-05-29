import { useState } from "react";
import { motion } from "framer-motion";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche pour:", searchTerm);
    // Ici vous pouvez ajouter la logique de recherche
  };

  return (
    <motion.form 
      className="search-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSearch}
    >
      <motion.input
        type="text"
        placeholder="Entrez vorte emplacement..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button 
        type="submit"
        className="search-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        cherchez
      </motion.button>
    </motion.form>
  );
}

export default SearchBar;
