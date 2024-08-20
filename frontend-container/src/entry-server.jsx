import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import WrappedApp from './App';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';

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
  onShellReady,
  onShellError,
  onError,
  options,
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
        onShellReady(pipe);
      },
      onShellError(error) {
        if (onShellError) {
          onShellError(error);
        } else {
          console.error('Shell Error encountered:', error);
        }
        abort();
      },
      onError(error) {
        if (onError) {
          onError(error);
        }
        console.error('Render Error encountered:', error);
      },
      ...options,
    },
  );

  return { pipe, abort };
}
