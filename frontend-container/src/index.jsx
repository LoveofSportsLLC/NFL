// src/index.jsx

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider, withAuth0 } from "@auth0/auth0-react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router-dom";

// Initialize Sentry
Sentry.init({
  dsn: "https://b16886f980d8c15a00c13777956e85dc@o4507292522053632.ingest.us.sentry.io/4507292533260288",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    "http://localhost:3000/",
    "https://loveoffootball.io/",
    "https://uat.loveoffootball.io/",
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_API_AUDIENCE;
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

const Auth0Callback = withAuth0(({ auth0 }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const targetUrl = auth0.appState?.returnTo || window.location.pathname;
    navigate(targetUrl);
  }, [auth0, navigate]);
  return null;
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

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
        onRedirectCallback={Auth0Callback}
      >
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
