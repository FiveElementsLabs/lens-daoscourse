import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Box, Button, Code, Flex, Container, FormControl, FormLabel, Input, Textarea, Text } from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { ping } from '../api/health/ping';
import { getPublications } from '../api/publications/get-publications';
import { createProfile } from '../api/profile/create-profile';
import { getProfiles } from '../api/profile/get-profiles';
import { updateProfile } from '../api/profile/update-profile';
import { createPost } from '../api/publications/post';
import { createComment } from '../api/publications/comment';

export default function ApiTest() {
  const { account, library } = useEthers();
  const { login, logout } = useAuth();
  const { currentProfile } = useProfile();

  const [message, setMessage] = useState('');
  const [handle, setHandle] = useState('');
  const [profileMetaData, setProfileMetaData] = useState({});
  const [postMetaData, setPostMetaData] = useState({});
  const [commentMetaData, setCommentMetaData] = useState({});

  const onClear = () => {
    setMessage('');
  };

  const onCreateProfile = async e => {
    e.preventDefault();
    try {
      const res = await createProfile(account, handle);
      setMessage(res);
    } catch (err) {
      console.error(err?.message);
    }
  };

  const updateProfileMetaData = (e, field) => {
    setProfileMetaData({
      ...profileMetaData,
      [field]: e.target.value,
    });
  };

  const updatePostMetaData = (e, field) => {
    setPostMetaData({
      ...postMetaData,
      [field]: e.target.value,
    });
  };

  const updateCommentMetaData = (e, field) => {
    setCommentMetaData({
      ...commentMetaData,
      [field]: e.target.value,
    });
  };

  const onUpdateProfile = async e => {
    e.preventDefault();
    try {
      // See api/profile/update-profile for full metadata types.
      await updateProfile(account, profileMetaData);
    } catch (err) {
      console.error(err?.message);
    }
  };

  const onCreatePost = async e => {
    e.preventDefault();
    try {
      // See api/publications/post for full metadata types.
      const res = await createPost(library.getSigner(), postMetaData);
      setMessage(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onCreateComment = async e => {
    e.preventDefault();
    try {
      const res = await createComment(library.getSigner(), commentMetaData);
      setMessage(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Box mx='auto' maxW='container.md' mt={4} p={3} border='1px solid gray' rounded='xl'>
        <Flex>
          <Button w='full' onClick={async () => setMessage(await ping())} mr={5}>
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
        <Flex mt={4}>
          <Button w='full' onClick={async () => setMessage(async () => await login())} mr={5}>
            Login
          </Button>
          <Button onClick={() => setMessage(logout())}>Logout</Button>
        </Flex>
        <Button w='full' mt={5} onClick={async () => setMessage(await getPublications(currentProfile.id))}>
          Get your publications
        </Button>
        <Button w='full' mt={5} onClick={async () => setMessage(await getProfiles(account))}>
          Get all my profiles
        </Button>
      </Box>

      <Box mx='auto' maxW='container.md' border='1px solid gray' rounded='xl' mt={5} p={4}>
        <Text>Create new Profile</Text>
        <form onSubmit={onCreateProfile}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='handle'>Handle</FormLabel>
            <Input id='handle' type='text' onChange={e => setHandle(e.target.value)} />
          </FormControl>
          <Button colorScheme='green' mt={5} type='submit'>
            Create Profile
          </Button>
        </form>
      </Box>

      <Box mx='auto' maxW='container.md' border='1px solid gray' rounded='xl' mt={5} p={4}>
        <Text>Update one of my profiles</Text>
        {/* Possible fields: profileId, name, bio, location, website, twitterUrl, coverPicture */}
        <form onSubmit={onUpdateProfile}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='profileId'>Profile ID</FormLabel>
            <Input id='profileId' type='text' onChange={e => updateProfileMetaData(e, 'profileId')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id='name' type='text' onChange={e => updateProfileMetaData(e, 'name')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='bio'>Bio</FormLabel>
            <Textarea id='bio' onChange={e => updateProfileMetaData(e, 'bio')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='location'>Location</FormLabel>
            <Input id='location' type='text' onChange={e => updateProfileMetaData(e, 'location')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='website'>Website</FormLabel>
            <Input id='website' type='text' onChange={e => updateProfileMetaData(e, 'website')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='twitter'>Twitter</FormLabel>
            <Input id='twitter' type='text' onChange={e => updateProfileMetaData(e, 'twitterUrl')} />
          </FormControl>
          <Button colorScheme='blue' mt={5} type='submit'>
            Update this profile
          </Button>
        </form>
      </Box>

      <Box mx='auto' mt={5} maxW='container.md' border='1px solid gray' rounded='xl' p={4}>
        <Text>Create new Post</Text>
        {/* Possible fields: profileId, name, description, external_url, image, imageMimeType, content */}
        <form onSubmit={onCreatePost}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='profileId'>Profile ID</FormLabel>
            <Input id='profileId' type='text' onChange={e => updatePostMetaData(e, 'profileId')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id='name' type='text' onChange={e => updatePostMetaData(e, 'name')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Input id='description' type='text' onChange={e => updatePostMetaData(e, 'description')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='external_url'>External URL</FormLabel>
            <Input id='external_url' type='text' onChange={e => updatePostMetaData(e, 'external_url')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='image'>Image URL</FormLabel>
            <Input id='image' type='text' onChange={e => updatePostMetaData(e, 'image')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='imageMimeType'>Image MimeType</FormLabel>
            <Input
              id='imageMimeType'
              type='text'
              placeholder='image/jpeg'
              onChange={e => updatePostMetaData(e, 'imageMimeType')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='content'>Content</FormLabel>
            <Textarea id='content' onChange={e => updatePostMetaData(e, 'content')} />
          </FormControl>
          <Button mt={5} type='submit' colorScheme='green'>
            Create Post
          </Button>
        </form>
      </Box>

      <Box mx='auto' mt={5} maxW='container.md' border='1px solid gray' rounded='xl' p={4}>
        <Text>Create new Comment</Text>
        {/* Possible fields: profileId, publicationId, name, description, external_url, image, imageMimeType, content */}
        <form onSubmit={onCreateComment}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='profileId'>Profile ID</FormLabel>
            <Input id='profileId' type='text' onChange={e => updateCommentMetaData(e, 'profileId')} />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='publicationId'>Publication ID (userId-postId)</FormLabel>
            <Input id='publicationId' type='text' onChange={e => updateCommentMetaData(e, 'publicationId')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id='name' type='text' onChange={e => updateCommentMetaData(e, 'name')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Input id='description' type='text' onChange={e => updateCommentMetaData(e, 'description')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='external_url'>External URL</FormLabel>
            <Input id='external_url' type='text' onChange={e => updateCommentMetaData(e, 'external_url')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='image'>Image URL</FormLabel>
            <Input id='image' type='text' onChange={e => updateCommentMetaData(e, 'image')} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='imageMimeType'>Image MimeType</FormLabel>
            <Input
              id='imageMimeType'
              type='text'
              placeholder='image/jpeg'
              onChange={e => updateCommentMetaData(e, 'imageMimeType')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='content'>Content</FormLabel>
            <Textarea id='content' onChange={e => updateCommentMetaData(e, 'content')} />
          </FormControl>
          <Button mt={5} type='submit' colorScheme='green'>
            Create Comment
          </Button>
        </form>
      </Box>

      <Container maxW='container.md' mt={10}>
        <Code maxW='container.md'>{JSON.stringify(message)}</Code>
      </Container>
    </>
  );
}
