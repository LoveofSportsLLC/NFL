import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import WrappedApp from './App.jsx';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from './utils/HelmetLoader';

/**
 * The main render function for SSR with type checks and logging.
 * @param {string} url - The URL to render.
 * @param {object} ssrManifest - The server-side rendering manifest.
 * @param {object} initialData - The data to prepopulate the app with.
 * @param {object} options - Options for the renderToPipeableStream function.
 * @returns {object} An object containing the pipe and abort methods.
 */
export function render(url, ssrManifest, initialData, options = {}) {
  const helmetContext = {};

  // Basic validation and logging
  if (!url || typeof url !== 'string') {
    throw new Error(`Invalid URL passed to render function: ${url}`);
  }

  if (!ssrManifest || typeof ssrManifest !== 'object') {
    throw new Error(
      `Invalid SSR Manifest passed to render function: ${ssrManifest}`,
    );
  }

  if (!initialData || typeof initialData !== 'object') {
    throw new Error(
      `Invalid Initial Data passed to render function: ${initialData}`,
    );
  }

  if (!options || typeof options !== 'object') {
    throw new Error(`Invalid Options passed to render function: ${options}`);
  }

  const { onShellReady, onShellError, onError } = options;

  if (typeof onShellReady !== 'function') {
    throw new Error('onShellReady must be a function.');
  }

  if (typeof onShellError !== 'function') {
    throw new Error('onShellError must be a function.');
  }

  if (typeof onError !== 'function') {
    throw new Error('onError must be a function.');
  }

  console.log('Rendering URL:', url);
  console.log('Initial Data:', JSON.stringify(initialData).slice(0, 250));
  console.log('Options:', JSON.stringify(options).slice(0, 250));

  try {
    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <WrappedApp initialData={initialData} />
        </StaticRouter>
      </HelmetProvider>,
      {
        onShellReady() {
          console.log('Shell ready, starting to stream.');
          onShellReady(pipe);
        },
        onShellError(err) {
          console.error('Error during shell rendering:', err);
          onShellError(err);
        },
        onError(err) {
          console.error('Error during streaming:', err);
          onError(err);
        },
      },
    );

    if (typeof pipe !== 'function') {
      throw new Error('Expected pipe to be a function.');
    }

    console.log('Render function executed successfully.');
    return { pipe, abort };
  } catch (error) {
    console.error('Error during SSR render:', error);
    throw error;
  }
}
