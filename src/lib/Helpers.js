import omitDeep from 'omit-deep';
import { Buffer } from 'buffer';
import { getAuthenticationToken, removeAuthenticationToken } from './State';

/*
 *  These are general helpers useful throughout the app.
 */

export const prettyJSON = (message, obj) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const omit = (object, name) => {
  return omitDeep(object, name);
};

export const capitalizeName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const getPayload = async () => await JSON.parse(Buffer.from(getAuthenticationToken()?.split('.')[1], 'base64'));
const getExpiration = async () => new Date((await getPayload()).exp * 1000);

export const checkJwtExpiration = async () => {
  if (!getAuthenticationToken()) {
    return false;
  }

  const expiration = await getExpiration();
  const now = new Date();
  const oneMinute = 1000 * 60 * 1;

  if (expiration.getTime() - now.getTime() < oneMinute) {
    removeAuthenticationToken();
    return false;
  }
  return true;
};
