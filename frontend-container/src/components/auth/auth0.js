import pkg from 'express-openid-connect';
import * as config from '../../config.js';
import logger from '../../utils/logger.js';

const { auth, requiresAuth } = pkg;

// logger.debug('VITE_AUTH0_ISSUER_BASE_URL:', config.issuerBaseURL);
// logger.debug('VITE_AUTH0_CLIENT_ID:', config.clientId);
// logger.debug('VITE_AUTH0_SECRET:', config.secret);
// logger.debug('AUTH0_CLIENT_ID:', config.clientId);
// logger.debug('AUTH0_SECRET:', config.secret);
// logger.debug('BASE_URL:', config.baseURL);
// logger.debug('All environment variables:', process.env);

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

// logger.debug('Auth0 Config - authRequired:', authConfig.authRequired);
// logger.debug(ole.log(ole.log('Auth0 Config - auth0Logout:', authConfig.auth0Logout);
// logger.debug(ole.log('Auth0 Config - secret:', authConfig.secret);
// logger.debug('Auth0 Config - baseURL:', authConfig.baseURL);
// logger.debug('Auth0 Config - clientID:', authConfig.clientID);
// logger.debug('Auth0 Config - issuerBaseURL:', authConfig.issuerBaseURL);
// logger.debug(
//   'Auth0 Config - authorizationParams.redirect_uri:',
//   authConfig.authorizationParams.redirect_uri,
// );

export default auth(authConfig);
export { requiresAuth };
