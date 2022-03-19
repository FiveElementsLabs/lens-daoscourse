import { Button } from '@chakra-ui/react';
import { shortenAddress, useEthers } from '@usedapp/core';

export default function Connect(props) {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <Button onClick={() => activateBrowserWallet()} {...props}>
      {!account ? 'Connect Wallet' : shortenAddress(account)}
    </Button>
  );
}
