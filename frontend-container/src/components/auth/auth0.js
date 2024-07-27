import pkg from 'express-openid-connect';
import * as config from '../../config.js';
import { log } from '../../utils/logs.js';

const { auth, requiresAuth } = pkg;

// log('VITE_AUTH0_ISSUER_BASE_URL:', config.issuerBaseURL);
// log('VITE_AUTH0_CLIENT_ID:', config.clientId);
// log('VITE_AUTH0_SECRET:', config.secret);
// log('AUTH0_CLIENT_ID:', config.clientId);
// log('AUTH0_SECRET:', config.secret);
// log('BASE_URL:', config.baseURL);
// log('All environment variables:', process.env);

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  baseURL: config.baseURL,
  clientID: config.clientId,
  issuerBaseURL: config.issuerBaseURL,
  secret: config.secret,
  authorizationParams: {
    redirect_uri: config.baseURL + '/dashboard/default',
  },
};

// log('Auth0 Config - authRequired:', authConfig.authRequired);
// log('Auth0 Config - auth0Logout:', authConfig.auth0Logout);
// log('Auth0 Config - secret:', authConfig.secret);
// log('Auth0 Config - baseURL:', authConfig.baseURL);
// log('Auth0 Config - clientID:', authConfig.clientID);
// log('Auth0 Config - issuerBaseURL:', authConfig.issuerBaseURL);
// log(
//   'Auth0 Config - authorizationParams.redirect_uri:',
//   authConfig.authorizationParams.redirect_uri,
// );

export default auth(authConfig);
export { requiresAuth };
