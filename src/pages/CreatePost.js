import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

import { createComment } from '../api/publications/comment';

export default function CreatePost() {
  const [postMetaData, setPostMetaData] = useState({});
  const { daoPage } = useParams();
  const { library } = useEthers();

  const updatePostMetaData = (e, field) => {
    setPostMetaData({
      ...postMetaData,
      [field]: e.target.value,
    });
  };

  const onComment = async e => {
    e.preventDefault();
    const commentMetaData = {
      profileId: postMetaData?.profileId,
      publicationId: daoPage,
      name: postMetaData.name,
      description: postMetaData.description,
      attributes: [],
      content: postMetaData.content,
    };
    console.log('COMMENT METADATA: ', commentMetaData);

    //  postMetaData: {
    //    profileId: hexId: the ID of who is pubilishing the post (must be logged-in).
    //    publicationId: hexId-hexId: The ID of the publication to point comment on.
    //    description?: Markdown
    //    content?: Markdown
    //    external_url: Url
    //    image: Url
    //    imageMimeType: MimeType (e.g. 'image/jpeg')
    //    name: string
    //    media: [ {
    //          item: Url
    //          type: MimeType (e.g. 'image/jpeg')
    //        } ]
    //    appId: 'testing-daoscourse'
    //  }

    await createComment(library.getSigner(), commentMetaData);
  };

  return (
    <>
      <Box mx='auto' mt={5} maxW='container.md' border='1px solid gray' rounded='xl' p={4}>
        <Text>Create new Post</Text>
        {/* Possible fields: profileId, name, description, external_url, image, imageMimeType, content */}
        <form onSubmit={onComment}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='profileId'>Profile ID</FormLabel>
            <Input id='profileId' type='text' onChange={e => updatePostMetaData(e, 'profileId')} />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='name'>Title</FormLabel>
            <Input id='name' type='text' onChange={e => updatePostMetaData(e, 'name')} />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Input id='description' type='text' onChange={e => updatePostMetaData(e, 'description')} />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='content'>Content</FormLabel>
            <Textarea id='content' onChange={e => updatePostMetaData(e, 'content')} />
          </FormControl>
          <Button mt={5} type='submit' colorScheme='green'>
            Create Post
          </Button>
        </form>
      </Box>
    </>
  );
}
