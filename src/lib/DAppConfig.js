import { ChainId } from '@usedapp/core';

const DAppConfig = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    //[Mumbai.chainId]: MUMBAI_RPC_URL,
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/61a9f83ab0ae4873818b67960409b7fe',
  },
  notifications: {
    expirationPeriod: 3000,
  },
};

export default DAppConfig;
