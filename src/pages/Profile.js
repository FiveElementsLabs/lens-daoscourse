import { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import {
  Box,
  Button,
  Code,
  useToast,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';

import { useProfile } from '../hooks/useProfile';
import { createProfile } from '../api/profile/create-profile';
import { updateProfile } from '../api/profile/update-profile';

export default function Profile() {
  const { account } = useEthers();
  const { profiles, currentProfile } = useProfile();
  const [selectedProfile, setSelectedProfile] = useState({});

  const [message, setMessage] = useState('');
  const [handle, setHandle] = useState('');
  const [profileMetaData, setProfileMetaData] = useState({});
  const toast = useToast();


  useEffect(() => {
    if (profiles) {
      setSelectedProfile(currentProfile);
    }
  }, [profiles, currentProfile]);

  const onCreateProfile = async e => {
    e.preventDefault();
    try {
      const res = await createProfile(account, handle);
      setMessage(res);
      toast({
        title: 'New profile created',
        status: 'success',
        position: 'bottom-right',
        variant: 'subtle',
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  const updateProfileMetaData = (e, field) => {
    setProfileMetaData({
      ...profileMetaData,
      [field]: e.target.value,
    });
  };

  const onUpdateProfile = async e => {
    e.preventDefault();
    try {
      // See api/profile/update-profile for full metadata types.
      await updateProfile(account, profileMetaData);
      toast({
        title: 'Profile updated',
        status: 'success',
        position: 'bottom-right',
        variant: 'subtle',
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  return (
    <>
      <Box mx='auto' maxW='container.md' rounded='xl' mt={5} p={4} bg={useColorModeValue('#ECF1FE', 'dark_accent')}>
        <Text>Create new Profile</Text>
        <form onSubmit={onCreateProfile}>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='handle'>Handle</FormLabel>
            <Input
              id='handle'
              type='text'
              onChange={e => setHandle(e.target.value)}
              bg={useColorModeValue('white', 'dark_background')}
            />
          </FormControl>
          <Button bg={'yellow_accent'} color={'white'} mt={5} type='submit'>
            Create Profile
          </Button>
        </form>
      </Box>

      <Box mx='auto' maxW='container.md' rounded='xl' mt={5} p={4} bg={useColorModeValue('#ECF1FE', 'dark_accent')}>
        <Text>Update one of my profiles</Text>
        {/* Possible fields: profileId, name, bio, location, website, twitterUrl, coverPicture */}
        <form onSubmit={onUpdateProfile}>
          <FormControl mt={5}>
            <FormLabel htmlFor='name'>Handle</FormLabel>
            <Input
              id='name'
              value={selectedProfile ? selectedProfile.handle : ''}
              type='text'
              onChange={e => updateProfileMetaData(e, 'name')}
              disabled={true}
              bg={useColorModeValue('white', 'dark_background')}
            />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel htmlFor='profileId'>Profile ID</FormLabel>
            <Select
              placeholder='Select profile'
              id='profileId'
              bg={useColorModeValue('white', 'dark_background')}
              defaultValue={selectedProfile ? selectedProfile.id : ''}
              onChange={e => {
                let profile = profiles.find(p => p.id === e.target.value);
                setSelectedProfile(profile);
                setProfileMetaData({ name: profile.name, bio: profile.bio, profileId: e.target.value });
              }}
            >
              {profiles?.map((profile, index) => {
                return (
                  <option key={index} value={profile.id}>
                    {profile.id}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              bg={useColorModeValue('white', 'dark_background')}
              id='name'
              defaultValue={selectedProfile ? selectedProfile.name : ''}
              type='text'
              onChange={e => updateProfileMetaData(e, 'name')}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='bio'>Bio</FormLabel>
            <Textarea
              id='bio'
              onChange={e => updateProfileMetaData(e, 'bio')}
              defaultValue={selectedProfile ? selectedProfile.bio : ''}
              bg={useColorModeValue('white', 'dark_background')}
            />
          </FormControl>
          <Button bg={'primary'} color={'white'} mt={5} type='submit'>
            Update this profile
          </Button>
        </form>
      </Box>

      <Container maxW='container.md' mt={10}>
        <Code maxW='container.md'>{message ? JSON.stringify(message) : ''}</Code>
      </Container>
    </>
  );
}
