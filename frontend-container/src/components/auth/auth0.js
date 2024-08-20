import pkg from 'express-openid-connect';
import * as config from '../../config.js';


const { auth, requiresAuth } = pkg;

// console.log('VITE_AUTH0_ISSUER_BASE_URL:', config.issuerBaseURL);
// console.log('VITE_AUTH0_CLIENT_ID:', config.clientId);
// console.log('VITE_AUTH0_SECRET:', config.secret);
// console.log('AUTH0_CLIENT_ID:', config.clientId);
// console.log('AUTH0_SECRET:', config.secret);
// console.log('BASE_URL:', config.baseURL);
// console.log('All environment variables:', process.env);

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

// console.log('Auth0 Config - authRequired:', authConfig.authRequired);
// console.log(ole.log(ole.log('Auth0 Config - auth0Logout:', authConfig.auth0Logout);
// console.log(ole.log('Auth0 Config - secret:', authConfig.secret);
// console.log('Auth0 Config - baseURL:', authConfig.baseURL);
// console.log('Auth0 Config - clientID:', authConfig.clientID);
// console.log('Auth0 Config - issuerBaseURL:', authConfig.issuerBaseURL);
// console.log(
//   'Auth0 Config - authorizationParams.redirect_uri:',
//   authConfig.authorizationParams.redirect_uri,
// );

export default auth(authConfig);
export { requiresAuth };
