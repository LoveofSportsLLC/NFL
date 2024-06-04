//src/entry-server.jsx
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import * as Sentry from "@sentry/react";

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

export async function render(url, ssrManifest) {
  return new Promise((resolve, reject) => {
    const html = renderToString(
      <StaticRouter location={url}>
        <Auth0Provider
          domain={process.env.VITE_AUTH0_DOMAIN}
          clientId={process.env.VITE_AUTH0_CLIENT_ID}
          audience={process.env.VITE_API_AUDIENCE}
          authorizationParams={{ redirect_uri: `${url}/dashboard/default` }}
        >
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Auth0Provider>
      </StaticRouter>,
    );

    resolve({
      html,
      head: "", // Add SSR helmet handling if necessary
    });
  });
}
