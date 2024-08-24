import React, { StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import WrappedApp from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from './utils/HelmetLoader';
import * as diff from 'diff';

console.log('Initializing Client Application');

// Detect whether to use CDN or not
const useCDN = import.meta.env.VITE_USE_CDN === 'true';

// Function to dynamically load a script
function loadScript(src, crossOrigin = 'anonymous') {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = crossOrigin;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Load CDN scripts if useCDN is true
if (useCDN) {
  console.log('Using CDN for React and ReactDOM');
  Promise.all([
    loadScript('https://cdn.skypack.dev/react@18.3.1'),
    loadScript('https://cdn.skypack.dev/react-dom@18.3.1')
  ]).then(() => {
    console.log('CDN scripts loaded successfully');
    hydrateApp();
  }).catch(err => {
    console.error('Error loading CDN scripts:', err);
  });
} else {
  // Initialize immediately if not using CDN
  hydrateApp();
}

function hydrateApp() {
  // Development-specific code
  const isServe = import.meta.env.VITE_COMMAND === 'serve';
  if (isServe) {
    console.log('Running in serve mode: Development');
    import('http://localhost:3000/@react-refresh').then((RefreshRuntime) => {
      RefreshRuntime.injectIntoGlobalHook(window);
      window.$RefreshReg$ = () => {};
      window.$RefreshSig$ = () => (type) => type;
      window.__vite_plugin_react_preamble_installed__ = true;
    });
    import('http://localhost:3000/@vite/client');
  } else {
    console.log('Running as a build');
  }

  const App = () => {
    useEffect(() => {
      const container = document.getElementById('app');
      const initialData = window.__INITIAL_DATA__;

      if (container) {
        console.log(
          'Container found, hydrating app with initialData:',
          initialData,
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

        setTimeout(() => {
          const clientHTML = container.innerHTML;
          console.log(
            'Client rendered HTML (first 2000 chars):',
            clientHTML.substring(0, 2000),
          );

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

  // Hydrate the app component
  hydrateRoot(document.getElementById('app'), <App />);
}

export default App;