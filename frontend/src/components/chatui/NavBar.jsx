import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import SearchIcon from "../icons/SearchIcon.jsx";
import BellIcon from "../icons/BellIcon.jsx";
import ArrowDown from "../icons/ArrowDown.jsx";
import { ChatState } from "../../context/ChatProvider.jsx";
import ProfileModal from "./ProfileModal.jsx";
import { useHistory } from "react-router-dom";
import LeftDrawer from "./LeftDrawer.jsx";

const NavBar = () => {
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setUser } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="3px 6px 3px 6px"
        borderWidth="3px"
      >
        <LeftDrawer>
          <Button variant="ghost">
            <SearchIcon size={18} />
            <Text
              fontFamily="Kanit"
              display={{ base: "none", md: "flex" }}
              padding="2"
            >
              Search User
            </Text>
            {/* Text will not be displayed at the base breakpoint (smaller than md screens)
            After md breakpoint, i.e medium sized screens, display will be flex  */}
          </Button>
        </LeftDrawer>

        <Text fontSize="2xl" fontFamily="Kanit">
          Solstice
        </Text>

        <div display="flex">
          <Menu>
            <MenuButton p={1}>
              <BellIcon size={18} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              padding={1}
              rightIcon={<ArrowDown size={18} />}
            >
              <Avatar
                size="sm"
                name={user.name}
                cursor="pointer"
                src={user.pic}
              />
            </MenuButton>

            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default NavBar;
