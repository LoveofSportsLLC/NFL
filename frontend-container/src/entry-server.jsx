import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import WrappedApp from './App.jsx';
import { StaticRouter } from 'react-router-dom/server.js';
import { HelmetProvider } from './utils/HelmetLoader';

/**
 * The main render function for SSR.
 * @param {string} url - The URL to render.
 * @param {string} [ssrManifest] - The server-side rendering manifest.
 * @param {object} initialData - The data to prepopulate the app with.
 * @param {function} onShellReady - Callback when the shell is ready.
 * @param {function} onShellError - Callback on shell error.
 * @param {function} onError - Callback on general error.
 */

export function render(
  url,
  ssrManifest,
  initialData,
  onShellReady = (pipe) => {}, // Default to a no-op function if not provided
  onShellError = (err) => {
    console.error('Shell Error:', err);
  }, // Log error by default
  onError = (err) => {
    console.error('Render Error:', err);
  }, // Log error by default
) {
  const helmetContext = {};

  const { pipe, abort } = renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <WrappedApp initialData={initialData} />
      </StaticRouter>
    </HelmetProvider>,
    {
      onShellReady:
        typeof onShellReady === 'function' ? onShellReady : () => {}, // Ensure it's a function
      onShellError:
        typeof onShellError === 'function'
          ? onShellError
          : (err) => {
              console.error('Shell Error:', err);
            }, // Ensure it's a function
      onError:
        typeof onError === 'function'
          ? onError
          : (err) => {
              console.error('Render Error:', err);
            }, // Ensure it's a function
    },
  );

  return { pipe, abort };
}