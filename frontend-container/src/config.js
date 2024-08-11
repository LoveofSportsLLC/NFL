import { log } from './utils/logs.js';

// Determine if the code is running on the server (Node.js) or client (browser)
const isSSR = import.meta.env.SSR;

// if (isSSR) {
//   log('', 'Loaded Server environment variables', '', process.env);
//   log('', 'Build target is (server):', 'ssr');
// } else if (typeof import.meta !== 'undefined' && import.meta.env) {
//   log('', 'Loaded Client environment variables', '', import.meta.env);
// } else {
//   log('', 'Loaded Client environment variables', '', {});
//   log('', 'Build target is (client):', 'unknown');
// }

// Helper function to get environment variable based on the environment
const getEnvVar = (varName, defaultValue) => {
  if (isSSR) {
    return process.env[varName] || defaultValue;
  } else if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[varName] || defaultValue;
  } else {
    return defaultValue;
  }
};

// Environment variable access
export const baseURL = getEnvVar('VITE_AUTH0_BASE_URL', '');
export const newsApiKey = getEnvVar('VITE_NEWS_API_KEY', '');
export const HIGHLIGHTS_API_URL = `/api/everything?q=NFL%20highlight&apiKey=${newsApiKey}`;
export const INJURIES_API_URL = `/api/everything?q=NFL%20injury&apiKey=${newsApiKey}`;
export const LATEST_NEWS_API_URL = `/api/everything?q=NFL&apiKey=${newsApiKey}`;
export const YOUTUBE_API_KEY = getEnvVar('VITE_GOOGLE_APIKEY', '');
export const YOUTUBE_CHANNEL_ID = 'UCqZQlzSHbVJrwrn5XvzrzcA'; // NFL's YouTube channel ID
export const domain = getEnvVar('VITE_AUTH0_DOMAIN', '');
export const clientId = getEnvVar('VITE_AUTH0_CLIENT_ID', '');
export const audience = getEnvVar('VITE_API_AUDIENCE', '');
export const YOUTUBE_CLIENT_ID = getEnvVar('VITE_GOOGLE_CLIENT_ID', '');
export const AZURE_ML_ENDPOINT =
  'https://mlworkspace-qvwms.eastus.inference.ml.azure.com/score';
export const secret = getEnvVar('VITE_AUTH0_SECRET', '');
export const issuerBaseURL = getEnvVar('VITE_AUTH0_ISSUER_BASE_URL', '');
export const VITE_APP_INSIGHTS_CONNECTION_STRING = getEnvVar(
  'VITE_APP_INSIGHTS_CONNECTION_STRING',
  '',
);
export const VITE_APP_INSIGHTS_INSTRUMENTATION_KEY = getEnvVar(
  'VITE_APP_INSIGHTS_INSTRUMENTATION_KEY',
  '',
);
export const VITE_APP_INSIGHTS_KEY = getEnvVar('VITE_APP_INSIGHTS_KEY', '');
export const buybuttonid = getEnvVar('VITE_BUY_BUTTON', '');
export const publishablekey = getEnvVar('VITE_PUBLISHABLE_KEY', '');

// Debugging logs
// log('Is SSR build:', isSSR);
// log(
//   'Is local build:',
//   process.env.GIT_WORKFLOW === '0' || process.env.GIT_WORKFLOW === undefined,
// );
// log('Is cluster build:', process.env.GIT_WORKFLOW === '1');
// log('Client ID:', clientId);
// log('Domain:', domain);
// log('Audience:', audience);
// log(
//   'VITE_APP_INSIGHTS_CONNECTION_STRING:',
//   VITE_APP_INSIGHTS_CONNECTION_STRING,
// );
// log(
//   'VITE_APP_INSIGHTS_INSTRUMENTATION_KEY:',
//   VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
// );
// log('VITE_APP_INSIGHTS_KEY:', VITE_APP_INSIGHTS_KEY);
