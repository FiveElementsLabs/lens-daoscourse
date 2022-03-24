import { Heading, Avatar, Box, Center, Text, Stack, Button, Badge, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function DaoCard(props) {
  const { name, desc, tag } = props;
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('#ECF1FE', 'dark_accent')}
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
          <Badge px={2} py={1} bg={useColorModeValue('#84AFFF', 'gray.700')} fontWeight={'400'}>
            #dao
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('#84AFFF', 'gray.700')} fontWeight={'400'}>
            #defi
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('#84AFFF', 'gray.700')} fontWeight={'400'}>
            #uniswap
          </Badge>
        </Stack>

        <Link to={`/${name}`}>
          <Button
            flex={1}
            bg={useColorModeValue('#0055FF', 'yellow_accent')}
            textColor={useColorModeValue('white', 'white')}
            fontSize={'sm'}
            rounded={'full'}
            _hover={{
              bg: useColorModeValue('#0077ff', '#ff7d22'),
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
