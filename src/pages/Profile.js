import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../components/feed/Feed';
import { DAO_PROFILES } from '../lib/ConfigVars';
import { getPublications } from '../api/publications/get-publications';

// 1. Control if the :dao name exists in the dao array
// 2. Query proposals for the dao (get posts)
// 3. show a list of proposals (feed)
// 4.

export default function Profile() {
  const { dao } = useParams();
  const [proposals, setProposals] = useState([]);
  const [daoData, setDaoData] = useState();

  useEffect(async () => {
    if (dao) {
      setDaoData(checkDaoExist(dao));

      setProposals(await getPublications(daoData.profileId));
      console.log(proposals);
      console.log(2);
    }
  }, [dao]);

  return (
    <>
      {proposals.map(proposal => (
        <Proposal proposal={proposal} />
      ))}
    </>
  );
}

function Proposal() {
  return <>test</>;
}

function checkDaoExist(dao) {
  console.log(dao);
  const d = DAO_PROFILES.find(d => d.name === dao);
  return d;
}
