import OrderConfirmation from "./components/order-confirmation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Confirmation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.a 
          href="#" 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img className="oops" src="logo.png" alt="image"></img>
          GREENPICK
        </motion.a>
        <nav>
          <ul>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#">Accueil</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/Login"> S'identifier </Link>
             
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
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
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
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
            </motion.li>
          </ul>
        </nav>
      </motion.header>
      <motion.main 
        className="min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <OrderConfirmation />
      </motion.main>
    </motion.div>
  );
}
