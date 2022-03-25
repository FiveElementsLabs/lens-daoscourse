import { useEffect } from 'react';
import { useEthers, shortenAddress, useLookupAddress, Mumbai } from '@usedapp/core';
import { Link as ReachLink } from 'react-router-dom';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { RiPlantLine } from 'react-icons/ri';
import { useToast, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Text,
  Flex,
  Link,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  useClipboard,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useProfile } from '../../hooks/useProfile';
import SelectProfile from './SelectProfile';

export default function Connect(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentProfile } = useProfile();
  const { activateBrowserWallet, account, error, deactivate } = useEthers();
  const { hasCopied, onCopy } = useClipboard(account || '');
  const ens = useLookupAddress();

  useEffect(() => {
    if (error)
      toast({
        id: 'conn_err',
        title: 'Connection Error',
        status: 'error',
        position: 'bottom-right',
      });
  }, [error, toast]);

  return (
    <>
      {!account ? (
        <Button onClick={() => activateBrowserWallet()} {...props}>
          Connect Wallet
        </Button>
      ) : (
        <Button onClick={onOpen} {...props}>
          {ens ?? shortenAddress(account)}
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('light_background', 'dark_background')}>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              id='modal-account-card'
              padding={3}
              mb={4}
              rounded='lg'
              backgroundColor={useColorModeValue('light_azure', 'dark_azure')}
            >
              <Text mb={1}>Connected with Metamask:</Text>
              <Text mb={3} fontWeight='bold' fontSize='sm'>
                {account}
              </Text>
              <Flex>
                <Button variant='link' mr={6} size='sm' rightIcon={<CopyIcon />} onClick={onCopy}>
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
                <Link href={Mumbai.getExplorerAddressLink(account || '')} target='_blank' rel='noopener noreferrer'>
                  <Button variant='link' size='sm' rightIcon={<ExternalLinkIcon />}>
                    See on Explorer
                  </Button>
                </Link>
              </Flex>
            </Box>

            <Box
              id='modal-lens-profile'
              padding={3}
              mb={4}
              rounded='lg'
              backgroundColor={useColorModeValue('light_azure', 'dark_azure')}
            >
              {currentProfile ? (
                <>
                  <Text>Your Lens profile:</Text>
                  <SelectProfile w='full' mt={3} />
                </>
              ) : (
                <>
                  <Text>You don't have any Lens profile associated with this wallet.</Text>
                  <ReachLink to='/how-it-works'>
                    <Button size='sm' mt={3} rightIcon={<RiPlantLine />}>
                      Get started with Lens
                    </Button>
                  </ReachLink>
                </>
              )}
            </Box>

            <Flex mb={3} id='modal-buttons'>
              <Button mr={3} onClick={onClose} colorScheme='blue'>
                Close
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  deactivate();
                  onClose();
                }}
              >
                Disconnect wallet
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
