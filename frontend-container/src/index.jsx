import React from "react";
import { createRoot } from "react-dom/client"; // Correct import for React 18
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./apolloClient";
import ErrorBoundary from "./components/ErrorBoundary";

// Environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_API_AUDIENCE;
console.log("Auth0 domain:", domain);
console.log("Auth0 client ID:", clientId);
console.log("Auth0 audience:", audience);
// Create root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Proper use of createRoot

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        authorizationParams={{
          redirect_uri: window.location.origin + "/dashboard/default", 
        }}
      >
        <ApolloProvider client={client}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ApolloProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
