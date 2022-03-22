import { useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

import { createPost } from '../api/publications/post';

export default function CreatePost() {
  const { library } = useEthers();
  const [postMetaData, setPostMetaData] = useState({});

  const updatePostMetaData = (e, field) => {
    setPostMetaData({
      ...postMetaData,
      [field]: e.target.value,
    });
  };

  const onCreatePost = async e => {
    e.preventDefault();
    try {
      // See api/publications/post for full metadata types.
      const res = await createPost(library.getSigner(), postMetaData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Box
        mx="auto"
        mt={5}
        maxW="container.md"
        border="1px solid gray"
        rounded="xl"
        p={4}
      >
        <Text>Create new Post</Text>
        {/* Possible fields: profileId, name, description, external_url, image, imageMimeType, content */}
        <form onSubmit={onCreatePost}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor="profileId">Profile ID</FormLabel>
            <Input
              id="profileId"
              type="text"
              onChange={e => updatePostMetaData(e, 'profileId')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              onChange={e => updatePostMetaData(e, 'name')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              type="text"
              onChange={e => updatePostMetaData(e, 'description')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="external_url">External URL</FormLabel>
            <Input
              id="external_url"
              type="text"
              onChange={e => updatePostMetaData(e, 'external_url')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="image">Image URL</FormLabel>
            <Input
              id="image"
              type="text"
              onChange={e => updatePostMetaData(e, 'image')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="imageMimeType">Image MimeType</FormLabel>
            <Input
              id="imageMimeType"
              type="text"
              placeholder="image/jpeg"
              onChange={e => updatePostMetaData(e, 'imageMimeType')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              id="content"
              onChange={e => updatePostMetaData(e, 'content')}
            />
          </FormControl>
          <Button mt={5} type="submit" colorScheme="green">
            Create Post
          </Button>
        </form>
      </Box>
    </>
  );
}
