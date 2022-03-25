import DaoList from '../components/home/DaoList';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';

import Stats from '../components/home/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <DaoList />
      <Stats />
    </>
  );
}
