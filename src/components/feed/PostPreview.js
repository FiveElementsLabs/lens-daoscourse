import {
  Box,
  Text,
  Heading,
  Badge,
  Flex,
  Avatar,
  HStack,
} from '@chakra-ui/react';

export default function PostPreview({
  title,
  desc,
  category,
  author,
  role,
  avatar,
  date,
  ...rest
}) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' {...rest} align='left'>
      <Flex>
        <Avatar src={avatar} />
        <Box ml='3'>
          <Text fontWeight='bold'>{author}</Text>
          <Text fontSize='sm'>{role}</Text>
        </Box>
      </Flex>
      <Heading fontSize='xl' marginTop='1rem'>
        {title}
      </Heading>
      <Text mt={4}>{desc}</Text>
      <HStack marginTop='1rem'>
        <Badge colorScheme={categories[category]}>{category}</Badge>
        <Text fontSize='xs'>{date}</Text>
      </HStack>
    </Box>
  );
}

const categories = {
  general: 'green',
  finance: 'red',
  ideas: 'yellow',
};
