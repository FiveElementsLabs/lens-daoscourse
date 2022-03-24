import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { getProfiles } from "../api/profile/get-profiles";

export const useProfile = () => {
  const { account } = useEthers();
  const [profiles, setProfiles] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  
  useEffect(() => {
    const loadProfiles = async () => {
      // 1. Check if we already have a user object in local memory.
      // 2. If we do, just set it as current user.
      // 3. If we don't, call the API to fetch all users, and set the current user
      //    as first. The user can change it in the dropdown in the Navbar component.

      const current = localStorage.getItem("current_profile");
      if (current) {
        // TODO: Call the API and check that "current" is actually one of the 
        //       currently logged in user's profiles.
        setCurrentProfile(current);
      } else {
        // Set the profile as the first in the array as default.
        const res = await getProfiles(account);
        setProfiles(res.profiles.items);
        setCurrentProfile(profiles[0])
        localStorage.setItem("current_profile", profiles[0]);
      }
    }
    loadProfiles();
  }, [account]);

  return { profiles, currentProfile, setCurrentProfile }
}