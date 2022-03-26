/*
 *  These are publicly available variables used in the app.
 */

export const APP_NAME = 'DAOscourse';
export const APP_DESC = 'The All-in-one fair on-chain DAO governance solution.';

export const LENS_API_URL = 'https://api-mumbai.lens.dev/';
export const MUMBAI_RPC_URL = 'https://rpc-mumbai.matic.today';
export const MUMBAI_SCAN = 'https://mumbai.polygonscan.com/';

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
    daoToken: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    homepage: '0xc8-0x20',
    img: 'https://cryptoeccetera.com/wp-content/uploads/2021/03/uniswap-uni-logo-1170x1170.png',
  },
  {
    name: 'yearn',
    address: '0xc79C9cce7Fd3B10495e8866842DF64110759cC4d',
    desc: 'DeFi made simple.',
    profileId: '0x022e',
    daoToken: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    homepage: '0x022e-0x02',
    img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5864.png',
  },
  {
    name: 'lensdao',
    address: '0x6d1982CF26e93CBcac3867Df54334FBBFCa69592',
    desc: 'Building a social network is hard. Lens Protocol makes it easy.',
    profileId: '0x0221',
    daoToken: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    homepage: '0x0221-0x01',
    img: 'https://icodrops.com/wp-content/uploads/2022/02/LensProtocol_logo-1.jpeg',
  },
  {
    name: 'lidodao',
    address: '0x141E70FE74997664FFfB4D46dd7e2BFf9FAF9F75',
    desc: 'Liquidity for staked assets.',
    profileId: '0x0222',
    daoToken: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    homepage: '0x0222-0x01',
    img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8000.png',
  },
  {
    name: 'makerdao',
    address: '0xb722af821c7f9e87826c5f82f1142171f26d22c1',
    desc: 'An Unbiased Global Financial System.',
    profileId: '0x0223',
    daoToken: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    homepage: '0x0223-0x01',
    img: 'https://icodrops.com/wp-content/uploads/2020/11/DAO_Maker_logo-150x150.jpg',
  },
  {
    name: 'synthetix',
    address: '0xec3427b246506fbd80c91ae2a675bc99b4a40c18',
    desc: 'The derivatives liquidity protocol.',
    profileId: '0x0225',
    daoToken: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    homepage: '0x0225-0x01',
    img: 'https://www.finaria.it/wp-content/uploads/2022/02/comprare-synthetix.png',
  },
];
