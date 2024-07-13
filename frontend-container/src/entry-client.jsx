import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import WrappedApp from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { log } from './utils/logs';
import * as diff from 'diff';

log('Initializing Client Application');

const container = document.getElementById('app');
const initialData = window.__INITIAL_DATA__;

if (container) {
  log('Container found, hydrating app with initialData:', initialData);
  hydrateRoot(
    container,
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <WrappedApp initialData={initialData} />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );

  setTimeout(() => {
    const clientHTML = container.innerHTML;
    log(
      'Client rendered HTML (first 2000 chars):',
      clientHTML.substring(0, 2000),
    );

    // Compare server and client HTML
    const serverHTML = document.documentElement.innerHTML;
    const diffResult = diff.diffLines(serverHTML, clientHTML);

    const truncatedDiffs = diffResult.reduce((acc, part) => {
      if (part.added || part.removed) {
        const truncatedPart =
          part.value.length > 500
            ? part.value.substring(0, 500) + '...[truncated]'
            : part.value;
        acc.push({ ...part, value: truncatedPart });
      }
      return acc;
    }, []);

    truncatedDiffs.forEach((part) => {
      if (part.added) {
        log('HTML Diff (added):', part.value);
      } else if (part.removed) {
        log('HTML Diff (removed):', part.value);
      }
    });
  }, 1000); // Wait a bit to ensure hydration is complete
} else {
  console.error("Root container 'app' not found for hydration.");
  log("Root container 'app' not found for hydration.");
}
