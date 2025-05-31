/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import "./error-404.css";

export default function Custom404() {
  // Set the background for the entire page
  useEffect(() => {
    // Save original background
    const originalBackground = document.body.style.background;
    const originalOverflow = document.body.style.overflow;

    // Apply dark green background to entire page
    document.body.style.background =
      "linear-gradient(135deg, #0a5043 0%, #083b32 100%)";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    // Clean up on unmount
    return () => {
      document.body.style.background = originalBackground;
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const backgroundLines = {
    position: "fixed", // Changed from absolute to fixed
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(135deg, rgba(50, 120, 80, 0.1) 25%, transparent 25%, transparent 10%, rgba(40, 100, 60, 0.1) 50%, rgba(5, 10, 60, 0.1) 75%, transparent 5%, transparent)",
    backgroundSize: "40px 40px",
    zIndex: "-1",
  };

  // Wrapper style that covers the entire viewport
  const pageWrapperStyle = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Background pattern */}
      <div style={backgroundLines}></div>

      {/* Animated background elements - positioned fixed to cover entire viewport */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          initial={{
            x: -50,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
            opacity: 0.3,
          }}
          animate={{
            x: window.innerWidth + 100,
            rotate: [0, 360],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight + 50,
              Math.random() * window.innerHeight - 50,
            ],
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            position: "fixed", // Changed to fixed
            width: 20 + Math.random() * 15,
            height: 20 + Math.random() * 15,
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234ceb9b60"><path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22L6.66,19.7C7.14,19.87,7.64,20,8,20C19,20,22,3,22,3C21,5,14,5.25,9,6.25C4,7.25,2,11.5,2,13.5C2,15.5,3.75,17.25,3.75,17.25C7,8,17,8,17,8z" /></svg>')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Light beam animation */}
      <motion.div
        initial={{ opacity: 0.05 }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.05, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed", // Changed to fixed
          width: "150%",
          height: "150%",
          top: "-25%",
          left: "-25%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(76, 235, 155, 0.07), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header with green theme */}

      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          className="error-container"
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "100%",
            margin: 0,
            borderRadius: 0,
            background: "rgba(8, 59, 50, 0.7)",
            backdropFilter: "blur(5px)",
            borderTop: "1px solid rgba(76, 235, 155, 0.2)",
            borderBottom: "1px solid rgba(76, 235, 155, 0.2)",
            padding: "60px 20px",
          }}
        >
          <div
            className="error-content"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.h1
              className="ops"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Oops! erreur....
            </motion.h1>

            <motion.h1
              className="error-title"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="number"
                animate={{
                  rotateY: [0, 360],
                  color: ["#ffffff", "#4ceb9b", "#ffffff"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                4
              </motion.span>

              <motion.img
                src="/pizza.png"
                alt="Pizza"
                width={190}
                height={200}
                className="pizza-image"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.2, rotate: [0, 20, -20, 0] }}
              />

              <motion.span
                className="number"
                animate={{
                  rotateY: [0, 360],
                  color: ["#ffffff", "#4ceb9b", "#ffffff"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                4
              </motion.span>
            </motion.h1>

            <motion.p
              className="error-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              La page que vous recherchez semble introuvable
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/" className="home-button">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: "inline-block", width: "100%" }}
                >
                  Retour à l'accueil
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating food elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`food-${i}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              opacity: 0.4,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth + 50,
                Math.random() * window.innerWidth - 50,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 50,
                Math.random() * window.innerHeight + 50,
              ],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "fixed", // Changed to fixed
              width: 30 + Math.random() * 20,
              height: 30 + Math.random() * 20,
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23${
                Math.random() > 0.5 ? "FFA726" : "FFCC80"
              }"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              zIndex: 0,
              filter: "blur(1px)",
              pointerEvents: "none",
            }}
          />
        ))}
      </main>

      {/* Update CSS for full-width container */}
      <style jsx="true">{`
        .error-container {
          background-color: rgba(8, 59, 50, 0.7);
          backdrop-filter: blur(5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          width: 100%;
          box-sizing: border-box;
        }

        .error-title {
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .number {
          font-size: 120px;
          font-weight: bold;
          color: white;
          text-shadow: 0 0 15px rgba(76, 235, 155, 0.8);
        }

        .pizza-image {
          filter: drop-shadow(0 0 10px rgba(76, 235, 155, 0.5));
        }

        .error-message {
          color: white;
          font-size: 22px;
          margin-bottom: 30px;
          text-align: center;
        }

        .home-button {
          background: linear-gradient(45deg, #4ceb9b, #93c572);
          color: #083b32;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 5px 15px rgba(76, 235, 155, 0.4);
          transition: all 0.3s ease;
        }

        .home-button:hover {
          box-shadow: 0 8px 25px rgba(76, 235, 155, 0.6);
          background: linear-gradient(45deg, #93c572, #4ceb9b);
        }

        .ops {
          color: #4ceb9b;
          text-shadow: 0 0 10px rgba(76, 235, 155, 0.5);
        }
      `}</style>
    </div>
  );
}
