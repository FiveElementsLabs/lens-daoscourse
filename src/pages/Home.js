import { Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DAO_PROFILES } from '../lib/ConfigVars';
import Hero from '../components/layout/Hero'
import DaoCard from '../components/layout/DaoCard';

export default function Home() {
  return (
    <>
      <Hero/>
      <Grid templateColumns={'repeat(3, 1fr)'} gap={4}>
        <GridItem>
          <DaoCard/>
        </GridItem>
        <GridItem>
          <DaoCard/>
        </GridItem >
        <GridItem>
          <DaoCard/>
        </GridItem>
        <GridItem>
          <DaoCard/>
        </GridItem>
        <GridItem>
          <DaoCard/>
        </GridItem >
        <GridItem>
          <DaoCard/>
        </GridItem>
        <GridItem>
          <DaoCard/>
        </GridItem>
        <GridItem>
          <DaoCard/>
        </GridItem >
        <GridItem>
          <DaoCard/>
        </GridItem>
      </Grid>
      {DAO_PROFILES.map(Dao => (
        <Link key={Dao.address} to={`/${Dao.name}`}>
          <Text>{Dao.name}</Text>
        </Link>
      ))}
    </>
  );
}
