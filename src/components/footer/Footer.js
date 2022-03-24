import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import Logo from './Logo';

import lightIcon from '../footer/icon_light.svg';
import darkIcon from '../footer/icon_dark.svg';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      position='absolute'
      bottom='0'
      w='full'
      backgroundColor={useColorModeValue('light_azure', 'dark_azure')}
      color={useColorModeValue('gray.700', 'gray.100')}
    >
      <Container
        as={Stack}
        maxW='container.xl'
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo darkLogo={darkIcon} lightLogo={lightIcon} width="80rem"/>
        <Text>© 2022 Five Elements Labs. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Discord'} href={'#'}>
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
