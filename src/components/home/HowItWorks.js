import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, useColorModeValue } from '@chakra-ui/react';
import { FcOrgUnit, FcBullish, FcApproval, FcPortraitMode, FcKindle, FcPanorama } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex w={16} h={16} align={'center'} justify={'center'} color={'white'} rounded={'full'} bg={'gray.100'} mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function HowItWorks() {
  return (
    <Center id='how-it-works'>
      <Box p={2}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW={1000} py={{ base: 20, md: 20 }}>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcOrgUnit} w={10} h={10} />}
              title={'Create your own DAO page'}
              text={'Create and customize your DAO page to maximize engagement with community'}
            />
          </Box>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcBullish} w={10} h={10} />}
              title={'Grow your audience'}
              text={'Track profiles activity, reward active contribution to your ecosistem. Recruit more contributors'}
            />
          </Box>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcApproval} w={10} h={10} />}
              title={'Discussion and voting'}
              text={'Proposals, comments and votes all happening on DAOscourse'}
            />
          </Box>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcPortraitMode} w={10} h={10} />}
              title={'Create your profile'}
              text={'Set up your lens profile in minutes'}
            />
          </Box>{' '}
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcKindle} w={10} h={10} />}
              title={'Own your contributions'}
              text={'Create your contribution history so that DAOs can reward you accordingly'}
            />
          </Box>{' '}
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcPanorama} w={10} h={10} />}
              title={'Monitor governance'}
              text={'Follow your favorite DAOs and discussion, all in one place'}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Center>
  );
}
