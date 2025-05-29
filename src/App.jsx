/* eslint-disable no-unused-vars */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import Accueil from "./accueil"; // Correction de la casse (important sous Linux/macOS)
import General from "./General";
import InscrireAcheteur from "./formulaires/acheteur/inscrire_acheteur";
import PaymentMethods from "./payment";
import Confirmation from "./confirmation";
import Custom404 from "./custom404";
import Login from "./formulaires/identifier/identifier";
import PolitiqueDeConfidentialite from "./a_propos/politique";
import Conditions from "./a_propos/conditions";
import Ui_utilisateur from "./interface_utilisateur/ui_utilisateur";
import AssociationWelcome from "./interface__association/AssociationWelcome";
import ProfileForm from "./interface__commeçant/modifier__profil";
import PaiementEspeces from "./confirm-especes-payment";
import CommentCaMarche from "./a_propos/comment_ça_marche";
import WelcomeCommerçant from "./interface__commeçant/welcome_commerçant";
import GestionPaniers from "./interface__commeçant/gestion-paniers";
import GestionDons from "./interface__commeçant/gestion-dons";
import ProductDetails from "./interface_utilisateur/product_details"; // Added import for ProductDetails
import { path } from "framer-motion/client";
import SignUpCommerçant from "./formulaires/commerçant/Logcomerçant";
import SignUpAssociation from "./formulaires/association/LogAssociation";
// Configuration robuste de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
// Vérification des composants (debug)
console.log("Accueil component:", Accueil); // Doit afficher une fonction
console.log("General component:", General); // Doit afficher une fonction
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <General />
      </QueryClientProvider>
    ),
    errorElement: <Custom404 />, // Add an error element to catch routing errors
    children: [
      {
        index: true,
        element: <Accueil />,
      },
      {
        path: "accueil",
        element: <Accueil />,
      },
      {
        path: "identifier",
        element: <Login />,
      },
      {
        path: "payment",
        element: <PaymentMethods />,
      },
      {
        path: "confirmation",
        element: <Confirmation />,
      },
      {
        path: "error_404",
        element: <Custom404 />,
      },
      {
        path: "politique",
        element: <PolitiqueDeConfidentialite />,
      },
      {
        path: "conditions",
        element: <Conditions />,
      },
      {
        path: "interface_utilisateur",
        element: <Ui_utilisateur />,
      },
      {
        path: "product_details/:id",
        element: <ProductDetails />,
      },
      {
        path: "interface_association",
        element: <AssociationWelcome />,
      },
      {
        path: "paiement_especes",
        element: <PaiementEspeces montant="XXXX.00DZ" />,
      },

      {
        path: "commerçant_profil",
        element: <ProfileForm />,
      },

      {
        path: "inscrire_acheteur",
        element: <InscrireAcheteur />,
      },

      {
        path: "inscrire_commerçant",
        element: <SignUpCommerçant />,
      },
      {
        path: "inscrire_association",
        element: <SignUpAssociation />,
      },
      {
        path: "comment_ca_marche",
        element: <CommentCaMarche />,
      },
      {
        path: "interface_commerçant",
        element: <WelcomeCommerçant />,
      },

      {
        path: "gestion_paniers",
        element: <GestionPaniers />,
      },

      {
        path: "gestion_dons",
        element: <GestionDons />,
      },
    ],
  },
]);
