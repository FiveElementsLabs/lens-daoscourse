import omitDeep from 'omit-deep';

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
