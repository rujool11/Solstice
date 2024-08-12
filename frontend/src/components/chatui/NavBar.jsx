import React from "react";
import { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
} from "@chakra-ui/react";
import SearchIcon from "../icons/SearchIcon.jsx";
import BellIcon from "../icons/BellIcon.jsx";
import ArrowDown from "../icons/ArrowDown.jsx";
import { ChatState } from "../../context/ChatProvider.jsx";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = ChatState();

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
        <Tooltip label="search for users" hasArrow placement="bottom">
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
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Kanit">
          Solstice
        </Text>

        <div d="flex" justifyContent="center" alignItems="center"> 
            <Menu>
              <MenuButton p={1}> 
              <BellIcon size={18} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} padding = {1} rightIcon={<ArrowDown size={18}/>}>
              <Avatar
              size="sm"
              name={user.name} 
              cursor="pointer"
              src={user.pic} />
            </MenuButton>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default NavBar;
