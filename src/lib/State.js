import { Buffer } from 'buffer';

/*
 *  This is a helper to keep track of some state
 *  via local storage.
 */

export const setAuthenticationToken = token => {
  localStorage.setItem('auth_token', token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthenticationToken = () => {
  return localStorage.removeItem('auth_token');
};

const getPayload = jwt => Buffer.from(jwt.split('.')[1], 'base64');
const getExpiration = jwt => new Date(getPayload(jwt).exp);

export const checkJwtExpiration = () => {
  const jwt = getAuthenticationToken();
  const expiration = getExpiration(jwt);
  const now = new Date();
  const oneMinute = 1000 * 60 * 1;
  console.warn('PAYLOAD: ', getPayload(jwt));
  if (expiration.getTime() - now.getTime() < oneMinute) {
    removeAuthenticationToken();
    return false;
  }
  return true;
};
