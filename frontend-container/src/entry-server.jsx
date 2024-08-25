import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import WrappedApp from './App.jsx';
import { StaticRouter } from 'react-router-dom/server.js';
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

  // Type and value checks with logging
  if (typeof url !== 'string' || !url) {
    console.error('Render Error: Invalid or missing URL:', url);
    throw new Error('Invalid URL passed to render function.');
  }

  if (typeof ssrManifest !== 'object' || ssrManifest === null) {
    console.error(
      'Render Error: Invalid or missing SSR Manifest:',
      ssrManifest,
    );
    throw new Error('Invalid SSR Manifest passed to render function.');
  }

  if (typeof initialData !== 'object' || initialData === null) {
    console.error(
      'Render Error: Invalid or missing Initial Data:',
      initialData,
    );
    throw new Error('Invalid Initial Data passed to render function.');
  }

  if (typeof options !== 'object' || options === null) {
    console.error('Render Error: Invalid or missing Options:', options);
    throw new Error('Invalid Options passed to render function.');
  }

  // Log detailed information about the options object
  console.log(
    'Options received in render function:',
    JSON.stringify(options, null, 2),
  );

  // Check if required callbacks are present in options
  const { onShellReady, onShellError, onError } = options;

  if (typeof onShellReady !== 'function') {
    console.error(
      'Render Error: onShellReady is not a function:',
      onShellReady,
    );
    throw new Error('Invalid onShellReady function passed to render function.');
  }

  if (typeof onShellError !== 'function') {
    console.error(
      'Render Error: onShellError is not a function:',
      onShellError,
    );
    throw new Error('Invalid onShellError function passed to render function.');
  }

  if (typeof onError !== 'function') {
    console.error('Render Error: onError is not a function:', onError);
    throw new Error('Invalid onError function passed to render function.');
  }

  console.log('Entry-Server: Render Function Called');
  console.log('Entry-Server: URL:', url);
  console.log(
    'Entry-Server: SSR Manifest:',
    JSON.stringify(ssrManifest).slice(0, 250),
  );
  console.log(
    'Entry-Server: Initial Data:',
    JSON.stringify(initialData).slice(0, 250),
  );
  console.log('Entry-Server: Options:', JSON.stringify(options).slice(0, 250));

  // Proceed with rendering after checks
  try {
    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <WrappedApp initialData={initialData} />
        </StaticRouter>
      </HelmetProvider>,
      {
        onShellReady: options.onShellReady,
        onShellError: options.onShellError,
        onError: options.onError,
      },
    );

    if (typeof pipe !== 'function') {
      throw new Error('pipe is not a function');
    }

    // Log success
    console.log('Render Function: renderToPipeableStream called successfully.');

    return { pipe, abort };
  } catch (error) {
    console.error(
      'Render Function: Error during renderToPipeableStream:',
      error,
    );
    throw error;
  }
}