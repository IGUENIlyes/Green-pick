
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Composant Button réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.type="button"] - Type du bouton (button, submit, reset)
 * @param {string} [props.variant="primary"] - Variante du style (primary, secondary, outline, text)
 * @param {string} [props.size="medium"] - Taille du bouton (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Si le bouton doit prendre toute la largeur disponible
 * @param {string} [props.to] - Lien de destination (utilise React Router si fourni)
 * @param {string} [props.href] - Lien externe (utilise <a> si fourni)
 * @param {Function} [props.onClick] - Fonction à exécuter au clic
 * @param {boolean} [props.disabled=false] - Si le bouton est désactivé
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} [props.className] - Classes CSS additionnelles
 */
function Button({
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  to,
  href,
  onClick,
  disabled = false,
  children,
  className = "",
  ...rest
}) {
  // Classes de base pour tous les boutons
  const baseClasses =
    "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Classes selon la variante
  const variantClasses = {
    primary: "bg-[#03443B] text-white hover:bg-[#02332C] focus:ring-[#03443B]",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-[#03443B] text-[#03443B] hover:bg-[#03443B]/10 focus:ring-[#03443B]",
    text: "text-[#03443B] hover:bg-[#03443B]/10 focus:ring-[#03443B]",
  };

  // Classes selon la taille
  const sizeClasses = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-6 py-3",
  };

  // Classe pour la largeur
  const widthClass = fullWidth ? "w-full" : "";

  // Classe pour l'état désactivé
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // Combinaison de toutes les classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

  // Si un lien interne est fourni, utiliser Link de react-router
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...rest}>
        {children}
      </Link>
    );
  }

  // Si un lien externe est fourni, utiliser <a>
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Sinon, utiliser un bouton standard
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

// Validation des props
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "text"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
