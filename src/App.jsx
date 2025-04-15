import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import Accueil from "./accueil"; // Correction de la casse (important sous Linux/macOS)
import General from "./General";
import SignupPage from "./formulaires/utilisateur/SignupPage";
import PaymentMethods from "./payment";

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
        {/* Wrap avec un div debug */}

        <General />
      </QueryClientProvider>
    ),
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
        element: <SignupPage />,
      },
      {

        path :"payment",
        element :<PaymentMethods />
      }
    ],
  },
]);

// Vérification du router
console.log("Router configuration:", router);
