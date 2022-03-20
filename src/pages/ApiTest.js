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
import { createPost } from '../api/publications/post';

export default function ApiTest() {
  const { account } = useEthers();
  const { login, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [handle, setHandle] = useState('');

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

  const onCreatePost = async e => {
    e.preventDefault();

    // TODO: Set post metadata according to test Form
    const postMetaData = {};

    try {
      const res = await createPost(postMetaData);
      setMessage(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Box mx="auto" maxW="md" mt={4}>
        <Flex>
          <Button
            w="full"
            onClick={async () => setMessage(await ping())}
            mr={5}
          >
            Ping
          </Button>
          <Button onClick={onClear}>Clear</Button>
        </Flex>
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
          onClick={async () => setMessage(await getPublications())}
        >
          Get publications by 0x13
        </Button>
        <Button
          w="full"
          mt={5}
          onClick={async () => setMessage(await getProfiles(account))}
        >
          Get my profiles
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
          <FormControl mt={5}>
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
        mt={5}
        maxW="container.md"
        border="1px solid gray"
        rounded="xl"
        p={4}
      >
        <Text>Create new Post</Text>
        <form onSubmit={onCreatePost}>
          <FormControl mt={5}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input id="description" type="text" />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="external_url">External URL</FormLabel>
            <Input id="external_url" type="text" />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="image_url">Image URL</FormLabel>
            <Input id="image_url" type="text" />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="image_mime_type">Image MimeType</FormLabel>
            <Input id="image_mime_type" type="text" placeholder="image/jpeg" />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea id="content" />
          </FormControl>
          <Button mt={5} type="submit" colorScheme="green">
            Create Post
          </Button>
        </form>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{JSON.stringify(message)}</Code>
      </Container>
    </>
  );
}
