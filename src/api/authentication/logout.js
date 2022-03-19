import { removeAuthenticationToken } from '../../lib/State';

export const logout = () => {
  removeAuthenticationToken();
  return 'Logout successful';
};
