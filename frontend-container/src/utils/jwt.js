//NFL/frontend-container/src/utils/jwt.js
import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
import axios from './axios';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Math.floor(new Date().getTime() / 1000);

  return decoded.exp > currentTime;
};

//const handleTokenExpired = (exp) => {
// let expiredTimer;
//
//  window.clearTimeout(expiredTimer);
//  const currentTime = Date.now();
//  const timeLeft = exp * 1000 - currentTime;
//  console.log("jwt.js", "handleTokenExpired", timeLeft);
//  expiredTimer = window.setTimeout(() => {
//    console.log("jwt.js", "handleTokenExpired", "expired");
//  }, timeLeft);
//};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    //This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { verify, sign, isValidToken, setSession };
