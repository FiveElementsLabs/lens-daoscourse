import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DAO_PROFILES } from '../lib/ConfigVars';

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      {DAO_PROFILES.map(Dao => (
        <Link key={Dao.address} to={`/${Dao.name}`}>
          <Text>{Dao.name}</Text>
        </Link>
      ))}
    </>
  );
}
