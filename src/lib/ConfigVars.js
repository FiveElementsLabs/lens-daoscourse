/*
 *  These are publicly available variables used in the app.
 */

export const APP_NAME = 'DAOscourse';
export const APP_DESC = 'The All-in-one fair on-chain DAO governance solution.';

export const LENS_API_URL = 'https://api-mumbai.lens.dev/';
export const MUMBAI_RPC_URL = 'https://rpc-mumbai.matic.today';

export const LENS_HUB_CONTRACT = '0xd7B3481De00995046C7850bCe9a5196B7605c367';

// Metadata Standards can change.
// Check for updates here: https://docs.lens.dev/docs/metadata-standards
export const LENS_PUBLICATION_METADATA_VERSION = '1.0.0';

// We can use an appId to fingerprint all the content created
// through the DAOscourse dApp. This is embedded in the metadata
// of all our publications. See: lib/ipfs for more info.
export const APP_ID = 'testing-daoscourse';

// This it the list of DAOs using Daoscourse.
// It could become dynamic by querying a separate database.
export const DAO_PROFILES = [
  {
    name: 'uniswap',
    address: '0x8002e5D8cA10e2b0e7d1bd98C367fE08FA555A71',
    desc: 'Uniswap is a decentralized protocol for automated liquidity provision.',
    profileId: '0xc8',
  },
  {
    name: 'yearn',
    address: '0xc79C9cce7Fd3B10495e8866842DF64110759cC4d',
    desc: 'DeFi made simple.',
    profileId: '0x13',
  },
];
