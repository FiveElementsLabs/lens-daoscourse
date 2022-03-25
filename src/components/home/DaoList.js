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
          <DaoCard tag={'@uniswap'} desc={'Uniswap v3 Protocol'} name={'uniswap'} to={`/uniswap`} />
          <GridItem>
            <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
          </GridItem>
          <GridItem>
            <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
          </GridItem>
          <GridItem>
            <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
          </GridItem>
          <GridItem>
            <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
          </GridItem>
          <GridItem>
            <DaoCard tag={'@yearnfinance'} desc={'Yearn Finance'} name={'yearn'} />
          </GridItem>
        </Grid>
      </Center>
    </>
  );
}
