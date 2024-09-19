import { useAuth0 } from "@auth0/auth0-react";
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function Header() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const [opened, { toggle }] = useDisclosure(false);

  const [name, setUserName] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const userName = user?.nickname?.split(".");
      const fullName = userName[0] + " " + userName[1];
      setUserName(fullName);
    }
  }, [isAuthenticated]);

  return (
    <header className="header">
      <ActionIcon
        size={34}
        radius="md"
        variant="default"
        aria-label="ActionIcon with size as a number"
      >
        <IconSearch style={{ width: rem(18), height: rem(18) }} />
      </ActionIcon>
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      {isAuthenticated ? (
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton w={34} h={34} >
              <Group gap={7}>
                <Avatar
                  src={user.picture}
                  alt={user.nickname}
                  radius="sm"
                  size={34}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>
              <Flex>
                <Avatar
                  src={user.picture}
                  alt={user.nickname}
                  radius="sm"
                  size={40}
                />
                <Box ml="md">
                  <Text
                    fw={500}
                    size="sm"
                    lh={1}
                    style={{ textTransform: "capitalize" }}
                  >
                    {name}
                  </Text>
                  <Text fw={500} size="xs" c="gray" lh={1} mt={6}>
                    {user.email}
                  </Text>
                </Box>
              </Flex>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              color="red"
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      )}
    </header>
  );
}

export default Header;
