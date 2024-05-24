//src/entry-client.jsx
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import * as Sentry from "@sentry/react";
import { BrowserRouter, useNavigate } from "react-router-dom";

// Initialize Sentry
Sentry.init({
  dsn: "https://b16886f980d8c15a00c13777956e85dc@o4507292522053632.ingest.us.sentry.io/4507292533260288",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        "localhost",
        "http://localhost:3000/",
        "https://loveoffootball.io/",
        "https://uat.loveoffootball.io/",
        /^https:\/\/yourserver\.io\/api/,
      ],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_API_AUDIENCE;
const pubproddev = import.meta.env.PUBLIC_ENV__NODE_ENV;

console.log("domain", domain);
console.log("clientId", clientId);
console.log("audience", audience);
console.log("pubproddev", pubproddev);

const onRedirectCallback = (appState) => {
  const navigate = useNavigate();
  const targetUrl = appState?.returnTo || window.location.pathname;
  navigate(targetUrl);
};

const rootElement = document.getElementById("root");
const root = hydrateRoot(
  rootElement,
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        authorizationParams={{
          redirect_uri: window.location.origin + "/dashboard/default",
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
