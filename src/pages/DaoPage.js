import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPublications } from '../api/publications/get-publications';
import { DAO_PROFILES } from '../lib/ConfigVars';

// 1. Control if the :dao name exists in the dao array.
// 2. Query proposals for the dao (get posts)
// 3. show a list of proposals (feed)

export default function DaoPage() {
  const { dao } = useParams();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadDaoData = async () => {
      if (dao) {
        try {
          const daoData = DAO_PROFILES.find(d => d.name === dao);
          const res = await getPublications(daoData.profileId);
          setProposals(res);
        } catch (err) {
          console.error(err?.message);
        }
      }
    };
    loadDaoData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao]);

  return (
    <>
      {proposals && proposals.map(proposal => <Proposal proposal={proposal} />)}
    </>
  );
}

function Proposal() {
  return <>test</>;
}
