import { Text } from '@chakra-ui/react';

export default function Comment({ comment }) {
  const { metadata } = comment;
  const { name, description, content } = metadata;
  return (
    <>
      <Text fontSize='md'>
        {name} - {description} - {content}
      </Text>
    </>
  );
}
