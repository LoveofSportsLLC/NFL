import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import WrappedApp from './App.jsx';

/**
 * The main render function for SSR.
 * @param {string} url - The URL to render.
 * @param {object} ssrManifest - The server-side rendering manifest.
 * @param {object} initialData - The data to prepopulate the app with.
 * @returns {object} An object containing the pipe, abort methods, and helmet context.
 */
export function render(url, ssrManifest, initialData) {
  const helmetContext = {};

  console.log('Rendering URL:', url);
  console.log('Initial Data:', JSON.stringify(initialData).slice(0, 250));

  try {
    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <WrappedApp initialData={initialData} />
        </StaticRouter>
      </HelmetProvider>,
    );

    // Return the pipe, abort, and helmetContext
    return { pipe, abort, helmetContext };
  } catch (error) {
    console.error('Render Error:', error);
    throw error; // Re-throw the error to be handled in server.js
  }
}
