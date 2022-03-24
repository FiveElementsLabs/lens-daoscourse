import { Heading, Avatar, Box, Center, Text, Stack, Button, Badge, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function DaoCard(props) {
  const { name, desc, tag } = props;
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar size={'xl'} name={name} alt={'Avatar Alt'} mb={4} pos={'relative'} />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {tag}
        </Text>
        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
          {desc}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6} mb={6}>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #dao
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #defi
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #uniswap
          </Badge>
        </Stack>

        <Link to={`/${name}`}>
          <Button
            flex={1}
            bg={'#0055FF'}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
          >
            {' '}
            Go to proposals
          </Button>
        </Link>
      </Box>
    </Center>
  );
}
