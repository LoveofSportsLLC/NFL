import React, { StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import WrappedApp from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from './utils/HelmetLoader';
import * as diff from 'diff';

console.log('Initializing Client Application');

const App = () => {
  useEffect(() => {
    // Get the container element
    const container = document.getElementById('app');
    const initialData = window.__INITIAL_DATA__;

    if (container) {
      console.log(
        'Container found, hydrating app with initialData:',
        initialData,
      );

      // Hydrate the root with the initial data
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

      setTimeout(() => {
        const clientHTML = container.innerHTML;
        console.log(
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
            console.log('HTML Diff (added):', part.value);
          } else if (part.removed) {
            console.log('HTML Diff (removed):', part.value);
          }
        });
      }, 2000); // Wait a bit to ensure hydration is complete
    } else {
      console.error("Root container 'app' not found for hydration.");
    }
  }, []);

  return null;
};

export default App;
