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
  },
  onError = (err) => {
    console.error('Render Error:', err);
  },
) {
  const helmetContext = {};

  const { pipe, abort } = renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <WrappedApp initialData={initialData} />
      </StaticRouter>
    </HelmetProvider>,
    {
      onShellReady(pipe) {
        console.log(
          'onShellReady: pipe is a function:',
          typeof pipe === 'function',
        );
        if (typeof pipe === 'function') {
          onShellReady(pipe);
        } else {
          console.error('pipe is not a function:', pipe);
        }
      },
      onShellError(error) {
        console.error('onShellError called:', error);
        if (typeof onShellError === 'function') {
          onShellError(error);
        }
        abort();
      },
      onError(error) {
        console.error('onError called:', error);
        if (typeof onError === 'function') {
          onError(error);
        }
      },
    },
  );

  if (typeof pipe !== 'function') {
    console.error('Returned pipe is not a function:', pipe);
  }

  return { pipe, abort };
}