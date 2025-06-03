import "./confirm-especes-payment.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const PaiementEspeces = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Get cart total from localStorage
    const total = localStorage.getItem('cartTotal');
    if (total) {
      setCartTotal(parseFloat(total));
    }

    // Create a full-page background
    document.body.style.backgroundImage = "url('accueil.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "#021a12";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Get cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      console.log('Cart items:', cartItems);
      
      if (cartItems.length === 0) {
        setError("Votre panier est vide");
        return;
      }

      // Get auth token and check user role
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      console.log('Auth token:', tokens?.access ? 'Present' : 'Missing');
      
      if (!tokens?.access) {
        setError("Vous devez être connecté pour confirmer votre commande");
        navigate('/identifier', { state: { from: '/paiement_especes' } });
        return;
      }

      // Decode JWT token to check role
      const tokenPayload = JSON.parse(atob(tokens.access.split('.')[1]));
      console.log('User role:', tokenPayload.role);
      
      if (tokenPayload.role !== 'client') {
        setError("Seuls les clients peuvent effectuer des réservations");
        navigate('/identifier', { state: { from: '/paiement_especes' } });
        return;
      }

      // Create orders for each cart item
      for (const item of cartItems) {
        const requestData = {
          pack: item.id,
          quantity: item.quantity
        };
        console.log('Sending request with data:', requestData);

        try {
          const response = await fetch('http://127.0.0.1:8000/api/orders/reserve/client/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens.access}`,
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestData),
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', Object.fromEntries(response.headers.entries()));

          // Check if response is JSON
          const contentType = response.headers.get("content-type");
          let errorMessage = "Une erreur est survenue lors de la réservation";

          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log('Response data:', data);
            
            if (!response.ok) {
              if (response.status === 403) {
                setError("Vous n'avez pas les permissions nécessaires pour effectuer cette action");
                localStorage.removeItem('tokens');
                navigate('/identifier', { state: { from: '/paiement_especes' } });
                return;
              }
              // Handle non_field_errors array
              if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
                errorMessage = data.non_field_errors[0];
              } else {
                errorMessage = data.detail || data.message || errorMessage;
              }
              throw new Error(errorMessage);
            }
          } else {
            // Handle non-JSON response
            if (!response.ok) {
              const text = await response.text();
              console.log('Non-JSON response:', text);
              
              if (response.status === 500) {
                errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
                console.error('Server error details:', text);
              } else if (response.status === 403) {
                setError("Vous n'avez pas les permissions nécessaires pour effectuer cette action");
                localStorage.removeItem('tokens');
                navigate('/identifier', { state: { from: '/paiement_especes' } });
                return;
              }
              throw new Error(errorMessage);
            }
          }
        } catch (itemError) {
          console.error('Error processing item:', item, itemError);
          throw itemError;
        }
      }

      // Clear cart from localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');

      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (err) {
      console.error('Order confirmation error:', err);
      setError(err.message || "Une erreur est survenue lors de la confirmation de la commande");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="didi">
        <a href="#" className="logo">
          <img className="oops" src="logo.png" alt="image"></img>
          GREENPICK
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <Link to="/Login"> S'identifier </Link>
            </li>
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
        </nav>
      </header>
      <div className="paiement-container">
        <div className="paiement-card">
          <div className="paiement-header">
            <div className="icon-container">
              <svg
                className="money-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 10H22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 14H22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="paiement-title">Paiement En Espèces</h1>
          </div>

          <p className="paiement-description">
            Vous paierez à notre point de vente.
          </p>

          <div className="divider"></div>

          {error && (
            <div className="error-message" style={{ color: '#ff4444', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div className="paiement-footer">
            <div className="total-container">
              <span className="total-label">Total à payer :</span>
              <span className="total-amount">{cartTotal.toFixed(2)} DZD</span>
            </div>

            <button 
              className="confirm-button"
              onClick={handleConfirmOrder}
              disabled={isLoading}
            >
              {isLoading ? 'Confirmation en cours...' : 'Confirmer la commande'}
              {!isLoading && (
                <svg
                  className="check-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaiementEspeces;
