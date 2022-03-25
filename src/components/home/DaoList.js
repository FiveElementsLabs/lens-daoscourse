import { Center, Grid, GridItem, Heading } from '@chakra-ui/react';
import DaoCard from '../layout/DaoCard';

export default function DaoList() {
  return (
    <>
      <Center id='daos'>
        <Heading color={'white'} mb={5} fontSize={{ base: '3xl', md: '5xl' }}>
          DAOs
        </Heading>{' '}
      </Center>
      <Center>
        <Grid
          align={'center'}
          textAlign={'center'}
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={10}
        >
          <GridItem>
            <DaoCard
              tag={'@uniswap'}
              desc={'Uniswap v3 Protocol'}
              tags={['defi', 'dex', 'eth']}
              name={'uniswap'}
              to={`/uniswap`}
              img={'https://cryptoeccetera.com/wp-content/uploads/2021/03/uniswap-uni-logo-1170x1170.png'}
            />
          </GridItem>
          <GridItem>
            <DaoCard
              tag={'@lensprotocol'}
              desc={'Lens Protocol'}
              name={'lensdao'}
              tags={['social', 'graph', 'web3']}
              img={'https://icodrops.com/wp-content/uploads/2022/02/LensProtocol_logo-1.jpeg'}
            />
          </GridItem>
          <GridItem>
            <DaoCard
              tag={'@yearnfinance'}
              desc={'Yearn Finance'}
              name={'yearn'}
              tags={['defi', 'yield']}
              img={'https://s2.coinmarketcap.com/static/img/coins/200x200/5864.png'}
            />
          </GridItem>
          <GridItem>
            <DaoCard
              tag={'@lidofinance'}
              desc={'Lido Finance'}
              name={'lidodao'}
              tags={['eth2', 'liquidity']}
              img={'https://s2.coinmarketcap.com/static/img/coins/200x200/8000.png'}
            />
          </GridItem>
          <GridItem>
            <DaoCard
              tag={'@makerdao'}
              desc={'Maker Dao'}
              name={'makerdao'}
              tags={['defi', 'gov', 'dai']}
              img={'https://icodrops.com/wp-content/uploads/2020/11/DAO_Maker_logo-150x150.jpg'}
              ì
            />
          </GridItem>
          <GridItem>
            <DaoCard
              tag={'@Synthetix'}
              desc={'Synthetix Dao'}
              name={'synthetix'}
              tags={['yield', 'gov', 'defi']}
              img={'https://www.finaria.it/wp-content/uploads/2022/02/comprare-synthetix.png'}
            />
          </GridItem>
        </Grid>
      </Center>
    </>
  );
}
