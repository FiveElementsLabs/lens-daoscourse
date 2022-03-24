import { Grid, GridItem } from '@chakra-ui/react';
import Hero from '../components/layout/Hero';
import DaoCard from '../components/layout/DaoCard';
import Stats from '../components/layout/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <Grid templateColumns={'repeat(2, 1fr)'} gap={4}>
        <GridItem>
          <DaoCard tag={'@uniswap'} desc={'Uniswap v3 Protocol'} name={'uniswap'} to={`/uniswap`} />
        </GridItem>
        <GridItem>
          <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
        </GridItem>
      </Grid>
      <Stats />
      <br></br>
    </>
  );
}
