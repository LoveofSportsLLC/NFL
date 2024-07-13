const isServer = typeof process !== 'undefined' && process.env.NODE_ENV;

export const baseURL = (() => {
  if (isServer) {
    return process.env.BASE_URL; // Local development and cluster secrets
  }
  return import.meta.env.VITE_AUTH0_BASE_URL; // Fallback for client-side
})();

export const newsApiKey = isServer
  ? process.env.VITE_NEWS_API_KEY
  : import.meta.env.VITE_NEWS_API_KEY;
export const HIGHLIGHTS_API_URL = `/api/everything?q=NFL%20highlight&apiKey=${newsApiKey}`;
export const INJURIES_API_URL = `/api/everything?q=NFL%20injury&apiKey=${newsApiKey}`;
export const LATEST_NEWS_API_URL = `/api/everything?q=NFL&apiKey=${newsApiKey}`;
export const YOUTUBE_API_KEY = isServer
  ? process.env.VITE_GOOGLE_APIKEY
  : import.meta.env.VITE_GOOGLE_APIKEY;
export const YOUTUBE_CHANNEL_ID = 'UCqZQlzSHbVJrwrn5XvzrzcA'; // NFL's YouTube channel ID
export const domain = isServer
  ? process.env.VITE_AUTH0_DOMAIN
  : import.meta.env.VITE_AUTH0_DOMAIN;
export const clientId = isServer
  ? process.env.VITE_AUTH0_CLIENT_ID
  : import.meta.env.VITE_AUTH0_CLIENT_ID;
export const audience = isServer
  ? process.env.VITE_API_AUDIENCE
  : import.meta.env.VITE_API_AUDIENCE;
export const YOUTUBE_CLIENT_ID = isServer
  ? process.env.VITE_GOOGLE_CLIENT_ID
  : import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const AZURE_ML_ENDPOINT =
  'https://mlworkspace-qvwms.eastus.inference.ml.azure.com/score';
export const secret = isServer
  ? process.env.VITE_AUTH0_SECRET
  : import.meta.env.VITE_AUTH0_SECRET;
export const issuerBaseURL = isServer
  ? process.env.VITE_AUTH0_ISSUER_BASE_URL
  : import.meta.env.VITE_AUTH0_ISSUER_BASE_URL;
export const VITE_APP_INSIGHTS_CONNECTION_STRING = isServer
  ? process.env.VITE_APP_INSIGHTS_CONNECTION_STRING
  : import.meta.env.VITE_APP_INSIGHTS_CONNECTION_STRING;
export const VITE_APP_INSIGHTS_INSTRUMENTATION_KEY = isServer
  ? process.env.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY
  : import.meta.env.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY;
