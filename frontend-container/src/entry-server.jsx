import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import WrappedApp from './App';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';

/**
 * @param {string} url
 * @param {string} [ssrManifest]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(
  url,
  ssrManifest,
  onShellReady,
  onShellError,
  onError,
  initialData,
  options
) {
  const helmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <WrappedApp initialData={initialData} />
      </StaticRouter>
    </HelmetProvider>,
  );

  return { appHtml, helmetContext, renderToPipeableStream };
}
