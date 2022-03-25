import { useEffect } from 'react';
import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { getProfiles } from '../api/profile/get-profiles';

export const useProfile = () => {
  const { account, library } = useEthers();
  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();

  const changeProfile = profile => {
    setCurrentProfile(profile);
    localStorage.setItem('current_profile', profile.handle);
  };

  const loadProfiles = async () => {
    if (account) {
      const current = localStorage.getItem('current_profile');
      const res = await getProfiles(account, library.getSigner());

      setProfiles(res.profiles.items);

      // Set the profile as the first in the array as default.
      // If we have a user in memory, check that it's one of the
      // currently logged user's profiles, and set it to be remembered
      // upon page refresh.
      if (current) {
        const currentProfileFromHandle = res.profiles.items.find(pr => pr.handle === current);
        if (currentProfileFromHandle) {
          setCurrentProfile(currentProfileFromHandle);
        } else {
          changeProfile(res.profiles.items[0]);
        }
      } else {
        changeProfile(res.profiles.items[0]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await loadProfiles();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { profiles, currentProfile, changeProfile };
};
