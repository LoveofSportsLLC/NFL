// src/config.js
export const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
export const HIGHLIGHTS_API_URL = `/api/everything?q=NFL%20highlight&apiKey=${newsApiKey}`;
export const INJURIES_API_URL = `/api/everything?q=NFL%20injury&apiKey=${newsApiKey}`;
export const LATEST_NEWS_API_URL = `/api/everything?q=NFL&apiKey=${newsApiKey}`;
export const YOUTUBE_API_KEY = import.meta.env.VITE_GOOGLE_APIKEY;
export const YOUTUBE_CHANNEL_ID = "UCqZQlzSHbVJrwrn5XvzrzcA"; // NFL's YouTube channel ID
export const domain = import.meta.env.VITE_AUTH0_DOMAIN;
export const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
export const audience = import.meta.env.VITE_API_AUDIENCE;
export const YOUTUBE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const AZURE_ML_ENDPOINT =
  "https://mlworkspace-qvwms.eastus.inference.ml.azure.com/score";
