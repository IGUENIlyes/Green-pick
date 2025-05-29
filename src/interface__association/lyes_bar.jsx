import { useState } from "react";
import { motion } from "framer-motion";
  import "./lyes_bar.css";

const LyesBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche pour:", searchTerm);
  };

  return (
    <motion.form 
      className="searche-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      onSubmit={handleSearch}
    >
      <motion.input
        type="text"
        placeholder="Entrez votre emplacement..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searche-input"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button 
        type="submit"
        className="searche-button"
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "#00a86b"
        }}
        whileTap={{ scale: 0.95 }}
      >
        cherchez
      </motion.button>
    </motion.form>
  );
};

export default LyesBar; 