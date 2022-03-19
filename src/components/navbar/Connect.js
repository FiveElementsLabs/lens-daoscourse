import { useEffect } from 'react';
import {
  useEthers,
  shortenAddress,
  useLookupAddress,
  Mumbai,
} from '@usedapp/core';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
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

export default function Connect() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activateBrowserWallet, account, error, deactivate } = useEthers();
  const { hasCopied, onCopy } = useClipboard(account || '');
  const ens = useLookupAddress();

  useEffect(() => {
    if (error && !toast.id('conn_err'))
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
        <Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button>
      ) : (
        <Button onClick={onOpen}>{ens ?? shortenAddress(account)}</Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              padding={3}
              mb={4}
              rounded="lg"
              backgroundColor={useColorModeValue('gray.100', 'gray.600')}
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.500')}
            >
              <Text mb={1}>Connected with Metamask:</Text>
              <Text mb={3} fontWeight="bold" fontSize="sm">
                {account}
              </Text>
              <Flex>
                <Button
                  variant="link"
                  mr={6}
                  size="sm"
                  rightIcon={<CopyIcon />}
                  onClick={onCopy}
                >
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
                <Link
                  href={Mumbai.getExplorerAddressLink(account || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="link"
                    size="sm"
                    rightIcon={<ExternalLinkIcon />}
                  >
                    See on Explorer
                  </Button>
                </Link>
              </Flex>
            </Box>
            <Flex mb={3}>
              <Button mr={3} onClick={onClose} colorScheme="blue">
                Close
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  deactivate();
                  onClose();
                }}
              >
                Disconnect
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
