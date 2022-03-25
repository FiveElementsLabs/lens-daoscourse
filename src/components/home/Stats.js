import { Box, chakra, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { BsPeople } from 'react-icons/bs';
import { GoComment, GoCommentDiscussion } from 'react-icons/go';
import Theme from '../../lib/Theme';

function StatsCard(props) {
  const { title, stat, icon, textColor } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      backgroundColor={useColorModeValue('white', 'dark_accent')}
      borderColor={textColor}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated color={textColor}>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'} color={textColor}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Stats() {
  return (
    <Box maxW='7xl' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={{ base: '3xl', md: '4xl' }} py={10} fontWeight={'bold'}>
        DAOscourse is growing, be part of it!
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Followers'}
          stat={'500'}
          textColor={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)}
          icon={<BsPeople size={'3em'} color={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)} />}
        />
        <StatsCard
          title={'Proposals'}
          stat={'120+'}
          textColor={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)}
          icon={
            <GoCommentDiscussion
              size={'3em'}
              color={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)}
            />
          }
        />
        <StatsCard
          title={'Comments'}
          stat={'2,300+'}
          textColor={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)}
          icon={<GoComment size={'3em'} color={useColorModeValue(Theme.colors.primary, Theme.colors.yellow_accent)} />}
        />
      </SimpleGrid>
    </Box>
  );
}
