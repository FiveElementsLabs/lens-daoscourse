import { Heading, Avatar, Box, Center, Text, Stack, Button, Badge, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { capitalizeName } from '../../lib/Helpers';

export default function DaoCard(props) {
  const { name, desc, tag, img, tags } = props;

  const tagBg = useColorModeValue('#84AFFF', 'gray.700');

  return (
    <Center>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('#ECF1FE', 'dark_accent')}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar size={'xl'} name={name} alt={'Avatar Alt'} mb={4} pos={'relative'} src={img} backgroundColor='white' />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {capitalizeName(name)}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {tag}
        </Text>
        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
          {desc}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6} mb={6}>
          {tags?.map((tag, idx) => (
            <Badge key={idx} px={2} py={1} bg={tagBg} fontWeight={'400'}>
              #{tag}
            </Badge>
          ))}
        </Stack>

        <Button rounded={'full'} px={6} colorScheme={'orange'} bg={'orange.400'} _hover={{ bg: 'orange.500' }}>
          <Link to={`/${name}`}>Go to proposals</Link>
        </Button>
      </Box>
    </Center>
  );
}
