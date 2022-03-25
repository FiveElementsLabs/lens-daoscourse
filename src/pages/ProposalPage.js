import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Proposal from '../components/proposalPage/Proposal';
import { getProposal } from '../api/publications/get-proposal';
import { getComments } from '../api/publications/get-comments';

/*
 * 1- Get post with postId and dao name (params)
 * 2- Get comment with postId
 * 3- Create new comment
 * 4- Vote
 * 5- Visualize total vote
 *
 * Extra:
 *  - Open/Close proposal?
 */

export default function ProposalPage() {
  const { dao, postId } = useParams();
  const [proposal, setProposal] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (postId)
        try {
          const prop = await getProposal(postId);

          const comm = await getComments(postId);
          setProposal(prop);
          setComments(comm.items);
        } catch (err) {
          console.error('LOADING ERROR in ProposalPage: ', err?.message);
        }
    };
    loadData();
  }, [dao, postId, comments, proposal]);

  return (
    <>
      {proposal && typeof comments === 'object' && (
        <>
          <Proposal proposal={proposal} comments={comments} postId={postId} />
        </>
      )}
    </>
  );
}
