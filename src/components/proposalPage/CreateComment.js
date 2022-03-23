import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { Box, FormControl, Textarea, Button, Spacer, useColorModeValue, Flex, Text } from '@chakra-ui/react';
import { createComment } from '../../api/publications/comment';
import { getProfiles } from '../../api/profile/get-profiles';

export default function CreateComment(postId) {
  const { library, account } = useEthers();
  const [comment, setComment] = useState();
  const [profile, setProfile] = useState();

  const onComment = async e => {
    e.preventDefault();
    // Set Metadata according to our frontend comment policy.#
    // Name: "Comment by {handle}"
    // Description == Content, and we show only Content

    // First, we need to fetch the currently logged in user's profile.
    //
    const commentMetaData = {
      name: `Comment by @${profile.name}`,
    };
    // await createComment(library.getSigner(), commentMetaData);
  };

  useEffect(() => {
    const getProfile = async () => {
      const profiles = await getProfiles(account);
      console.log(profiles.profiles.items[0]);
      setProfile(profiles.profiles.items[0]);
    };
    getProfile();
  });

  const border = useColorModeValue('gray.300', 'gray.700');

  return (
    <Box w='full' mt={3} p={3} border='1px solid' borderColor={border}>
      <form onSubmit={onComment} style={{ textAlign: 'right' }}>
        <FormControl isRequired borderBottom='1px solid' borderColor={border}>
          <Textarea
            placeholder='Write your comment here'
            border='0'
            resize='none'
            onChange={e => setComment(e.target.value)}
          />
        </FormControl>
        <Flex>
          <Text fontSize={16} width='fit-content' my='auto'>
            {profile?.name} :
          </Text>
          <Spacer />
          <Button type='submit' mt={3}>
            Publish Comment
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
