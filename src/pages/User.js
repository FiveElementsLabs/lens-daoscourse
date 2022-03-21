import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import {
  Box,
  Button,
  Code,
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';
import { ping } from '../api/health/ping';
import { getPublications } from '../api/publications/get-publications';
import { createProfile } from '../api/profile/create-profile';
import { getProfiles } from '../api/profile/get-profiles';
import { updateProfile } from '../api/profile/update-profile';
import { createPost } from '../api/publications/post';

export default function User() {
  const { account, library } = useEthers();
  const { login, logout } = useAuth();

  const [message, setMessage] = useState('');
  const [handle, setHandle] = useState('');
  const [profileMetaData, setProfileMetaData] = useState({});
  const [postMetaData, setPostMetaData] = useState({});

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

  return (
    <>
      <Box
        mx="auto"
        maxW="container.md"
        mt={14}
        p={3}
        border="1px solid gray"
        rounded="xl"
      >
        <Flex mt={4}>
          <Button
            w="full"
            onClick={async () => setMessage(await login())}
            mr={5}
          >
            Login
          </Button>
          <Button onClick={() => setMessage(logout())}>Logout</Button>
        </Flex>
        <Button
          w="full"
          mt={5}
          onClick={async () => setMessage(await getProfiles(account))}
        >
          Get all my profiles
        </Button>
      </Box>

      <Box
        mx="auto"
        maxW="container.md"
        border="1px solid gray"
        rounded="xl"
        mt={5}
        p={4}
      >
        <Text>Create new Profile</Text>
        <form onSubmit={onCreateProfile}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor="handle">Handle</FormLabel>
            <Input
              id="handle"
              type="text"
              onChange={e => setHandle(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="green" mt={5} type="submit">
            Create Profile
          </Button>
        </form>
      </Box>

      <Box
        mx="auto"
        maxW="container.md"
        border="1px solid gray"
        rounded="xl"
        mt={5}
        p={4}
      >
        <Text>Update one of my profiles</Text>
        {/* Possible fields: profileId, name, bio, location, website, twitterUrl, coverPicture */}
        <form onSubmit={onUpdateProfile}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor="profileId">Profile ID</FormLabel>
            <Input
              id="profileId"
              type="text"
              onChange={e => updateProfileMetaData(e, 'profileId')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              onChange={e => updateProfileMetaData(e, 'name')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <Textarea
              id="bio"
              onChange={e => updateProfileMetaData(e, 'bio')}
            />
          </FormControl>
          <Button colorScheme="blue" mt={5} type="submit">
            Update this profile
          </Button>
        </form>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{message ? JSON.stringify(message) : ""}</Code>
      </Container>
    </>
  );
}
