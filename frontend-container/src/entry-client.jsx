import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import WrappedApp from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';

console.log('Initializing Client Application');

function hydrateApp() {
  const container = document.getElementById('app');
  const initialData = window.__INITIAL_DATA__;

  if (container) {
    console.log(
      `Client-side hydration: Hydrating app for URL: ${window.location.href}`,
    );

    hydrateRoot(
      container,
      <StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <WrappedApp initialData={initialData} />
          </BrowserRouter>
        </HelmetProvider>
      </StrictMode>,
    );
  } else {
    console.error("Root container 'app' not found for hydration.");
  }
}

// Load scripts if necessary, then hydrate the app
hydrateApp();
