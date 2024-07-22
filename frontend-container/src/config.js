// Determine if the code is running on the server (Node.js)
const isServer = typeof process !== 'undefined' && process.env.NODE_ENV;

// Determine if the build is local or in the cluster
const isLocal = isServer && (process.env.GIT_WORKFLOW === '0' || process.env.DOCKER_ENV === 'false');
const isCluster = isServer && process.env.GIT_WORKFLOW === '1';

// Helper function to get environment variable based on server or client build
const getEnvVar = (serverEnvVar, clientEnvVar) => {
  if (isServer) {
    return serverEnvVar;
  } else if (typeof import.meta !== 'undefined' && import.meta.env !== 'undefined') {
    return clientEnvVar;
  } else {
    throw new Error('Cannot access import.meta.env in this environment');
  }
};

// Set the baseURL based on the environment
export const baseURL = getEnvVar(process.env.BASE_URL, import.meta.env?.VITE_AUTH0_BASE_URL);

export const newsApiKey = getEnvVar(process.env.VITE_NEWS_API_KEY, import.meta.env?.VITE_NEWS_API_KEY);

export const HIGHLIGHTS_API_URL = `/api/everything?q=NFL%20highlight&apiKey=${newsApiKey}`;
export const INJURIES_API_URL = `/api/everything?q=NFL%20injury&apiKey=${newsApiKey}`;
export const LATEST_NEWS_API_URL = `/api/everything?q=NFL&apiKey=${newsApiKey}`;

export const YOUTUBE_API_KEY = getEnvVar(process.env.VITE_GOOGLE_APIKEY, import.meta.env?.VITE_GOOGLE_APIKEY);

export const YOUTUBE_CHANNEL_ID = 'UCqZQlzSHbVJrwrn5XvzrzcA'; // NFL's YouTube channel ID

export const domain = getEnvVar(process.env.VITE_AUTH0_DOMAIN, import.meta.env?.VITE_AUTH0_DOMAIN);

export const clientId = getEnvVar(process.env.VITE_AUTH0_CLIENT_ID, import.meta.env?.VITE_AUTH0_CLIENT_ID);

export const audience = getEnvVar(process.env.VITE_API_AUDIENCE, import.meta.env?.VITE_API_AUDIENCE);

export const YOUTUBE_CLIENT_ID = getEnvVar(process.env.VITE_GOOGLE_CLIENT_ID, import.meta.env?.VITE_GOOGLE_CLIENT_ID);

export const AZURE_ML_ENDPOINT = 'https://mlworkspace-qvwms.eastus.inference.ml.azure.com/score';

export const secret = getEnvVar(process.env.VITE_AUTH0_SECRET, import.meta.env?.VITE_AUTH0_SECRET);

export const issuerBaseURL = getEnvVar(process.env.VITE_AUTH0_ISSUER_BASE_URL, import.meta.env?.VITE_AUTH0_ISSUER_BASE_URL);

export const VITE_APP_INSIGHTS_CONNECTION_STRING = getEnvVar(process.env.VITE_APP_INSIGHTS_CONNECTION_STRING, import.meta.env?.VITE_APP_INSIGHTS_CONNECTION_STRING);

export const VITE_APP_INSIGHTS_INSTRUMENTATION_KEY = getEnvVar(process.env.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY, import.meta.env?.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY);

export const buybuttonid = getEnvVar( process.env.VITE_BUY_BUTTON, import.meta.env?.VITE_BUY_BUTTON );

export const publishablekey = getEnvVar(process.env.VITE_PUBLISHABLE_KEY, import.meta.env?.VITE_PUBLISHABLE_KEY);

// Log statements for debugging
console.log('Is server build:', isServer);
console.log('Is local build:', isLocal);
console.log('Is cluster build:', isCluster);
console.log('Client ID from process.env:', process.env.VITE_AUTH0_CLIENT_ID);
console.log('Client ID from import.meta.env:', typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_AUTH0_CLIENT_ID : 'undefined');
console.log('Client ID:', clientId);
