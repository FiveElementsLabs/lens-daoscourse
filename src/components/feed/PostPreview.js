import { Box, Text, Heading, Stack, Badge } from '@chakra-ui/react';

export default function PostPreview({ title, desc, category, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest} align="left">
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
      <Badge colorScheme={categories[category]}>{category}</Badge>
    </Box>
  );
}


const categories = {
    general: 'green',
    finance: 'red',
    ideas: 'yellow'
}