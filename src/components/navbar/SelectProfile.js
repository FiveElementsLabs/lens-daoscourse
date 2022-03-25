import { Button, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useProfile } from '../../hooks/useProfile';

export default function SelectProfile(props) {
  const { profiles, currentProfile, changeProfile } = useProfile();

  return (
    <>
      {profiles?.length && (
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<Avatar size='xs' src={currentProfile?.picture?.url} name={currentProfile?.handle} />}
            rightIcon={<ChevronDownIcon />}
            {...props}
          >
            {currentProfile?.handle}
          </MenuButton>
          <MenuList>
            {profiles?.map((profile, idx) => (
              <MenuItem onClick={() => changeProfile(profile)} key={idx}>
                <Avatar size='xs' src={profile?.picture?.url} name={profile.handle} mr='10px' />
                {profile.handle}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
}
