import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, useColorModeValue } from '@chakra-ui/react';
import { FcOrgUnit, FcComments, FcApproval } from 'react-icons/fc';

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
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
          </Box>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcComments} w={10} h={10} />}
              title={'Accept Proposals'}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
          </Box>
          <Box bg={useColorModeValue('#ECF1FE', 'dark_accent')} padding={10}>
            <Feature
              icon={<Icon as={FcApproval} w={10} h={10} />}
              title={'Make Decisions'}
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
              }
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Center>
  );
}
