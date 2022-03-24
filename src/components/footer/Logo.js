import { useColorMode } from '@chakra-ui/react';
import darkLogo from './dark-logo.svg';
import lightLogo from './light-logo.svg';

export default function Logo() {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? (
    <img width='160rem' height='auto' src={lightLogo} />
  ) : (
    <img width='160rem' height='auto' src={darkLogo} />
  );
}
