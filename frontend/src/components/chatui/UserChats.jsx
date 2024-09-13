import React, { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";

const UserChats = () => {
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data); 
    } catch (error) {

      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "failed to load chats",
        position: "botton-left",
      })
    }
  }


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []); // fetch chats on initial render

  // if small screen (base breakpoint) display only chatSpace selected Chat exists, 
  // else display userChats, on larger screens (from md breakpoint), display both (flex)
  return <Box
  
    display={{base: selectedChat ? "none" : "flex", md: "flex"}}
    flexDir="column"
    alignItems="center"
    padding={3}
    bg="white"
    width={{base: "100%", md: "30%"}}
    borderRadius="8px"
    borderWidth="3px"
  >
    <Box
      pb={3}
      px={3}
      fontSize="30px"
      fontFamily={"Kanit"}
      display="flex"
      flexDir="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      My Chats
    </Box>
  </Box>
};

export default UserChats;