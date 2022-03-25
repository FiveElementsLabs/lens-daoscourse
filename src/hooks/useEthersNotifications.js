import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNotifications } from '@usedapp/core';

export const useEthersNotifications = () => {
  const { notifications } = useNotifications();
  const toast = useToast();
  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach(notif => {
        const id = notif.type;
        if (!toast.isActive(id)) {
          switch (id) {
            case 'walletConnected':
              toast({
                id,
                title: 'Wallet Connected',
                status: 'success',
                position: 'bottom-right',
                variant: 'solid',
              });
              break;
            case 'transactionStarted':
              toast({
                id,
                title: 'Transaction Sent',
                status: 'info',
                position: 'bottom-right',
                variant: 'solid',
              });
              break;
            case 'transactionSucceed':
              toast({
                id,
                title: 'Transaction Successful',
                status: 'success',
                position: 'bottom-right',
                variant: 'solid',
              });
              break;
            case 'transactionFailed':
              toast({
                id,
                title: 'Transaction Failed',
                status: 'error',
                position: 'bottom-right',
                variant: 'solid',
              });
              break;

            default:
              console.warn('Unexpected ethers notification.');
              break;
          }
        }
      });
    }
  }, [notifications, toast]);
};
