import React from "react";
import {
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Box,
  Input,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import ChatLoading from "./ChatLoading.jsx";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "../useravatar/UserListItem.jsx";

const LeftDrawer = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, setUser } = ChatState();

  const accessChats = async (userId) => {

  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "please enter search field",
        status: "warning",
        isClosable: true,
        duration: 5000,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        // since these API calls are protected
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      console.log(error);
      toast({
        title: "api call failed",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontFamily="Kanit">
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pd={2}>
              <Input
                placeholder="search for user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                margin={1}
              />
              <Button marginTop={1} onClick={handleSearch}>
                <SearchIcon size={18} />
              </Button>
            </Box>
            {loading ? <ChatLoading/> : (
              searchResult?.map((user) => { 
                return <UserListItem 
                  key = {user._id}
                  user = {user}
                  handleFunction = {() => accessChats(user._id)}
                />
              }) 
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
