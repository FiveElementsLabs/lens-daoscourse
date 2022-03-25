import { useToast } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

import { login as loginCall } from '../api/authentication/login';
import { logout as logoutCall } from '../api/authentication/logout';

export const useAuth = () => {
  const toast = useToast();
  const { account, library } = useEthers();

  const login = async () => {
    try {
      if (!library) console.error('Provider not loaded');
      if (!library.getSigner()) console.error('Signer not loaded');
      console.log('LIBRARY: ', library);
      const res = await loginCall(account, library.getSigner());
      if (res.message === 'Already logged in') {
        // This runs if we are already logged in.
        if (!toast.isActive('already_logged_in'))
          toast({
            id: 'already_logged_in',
            title: 'Already logged in',
            status: 'info',
            position: 'bottom-right',
            variant: 'solid',
          });
      } else {
        // This runs if we login successfully.
        if (!toast.isActive('login_success'))
          toast({
            id: 'login_success',
            title: 'Login successful',
            status: 'success',
            position: 'bottom-right',
            variant: 'solid',
          });
        return res.data;
      }
    } catch (err) {
      // This runs if we fail to login.
      if (!toast.isActive('login_fail'))
        toast({
          id: 'login_fail',
          title: 'Error while logging in',
          status: 'error',
          position: 'bottom-right',
          variant: 'solid',
        });
      return err?.message;
    }
  };

  const logout = () => {
    logoutCall();
    if (!toast.isActive('logout_success'))
      toast({
        id: 'logout_success',
        title: 'Logout successful',
        status: 'success',
        position: 'bottom-right',
        variant: 'solid',
      });
    return 'Logout successful';
  };

  return { login, logout };
};
