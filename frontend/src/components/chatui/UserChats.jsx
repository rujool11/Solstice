import React, { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, useToast, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import IconAdd from "../icons/IconAdd";
import ChatLoading from "./ChatLoading.jsx";
import { getSender } from "../../config/ChatLogics.jsx"

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

  // if small screen (base breakpoint) display only chatSpace if selected Chat exists, 
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
      flexDir="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      My Chats
    <Button
      display="flex"
      fontSize="15px"
      rightIcon={<IconAdd/>}
    >
      New Group Chat
    </Button>
    </Box>

    <Box
    display="flex"
    flexDir="column"
    padding={3}
    width="100%"
    height="100%"
    overflowY="hidden"
    >
      {chats ? (
        <Stack overflowY="auto">
          {chats.map((chat) => (
            <Box
            onClick={() => setSelectedChat(chat)}
            cursor="pointer"
            bgColor={selectedChat === chat ? "#6495ED": "#E8E8E8"}
            color={selectedChat === chat ? "white" : "black" }
            px={3}
            py={2}
            borderRadius="5px"
            margin="1px"
            key={chat._id}
            >
              <Text>
                {!chat.isGroupChat ? (
                  getSender(loggedUser, chat.users)
                ) : (chat.chatName)}
              </Text>
            </Box>
          ))}
        </Stack>

      ): (
        <ChatLoading/>
      )}
    </Box>
  </Box>
};

export default UserChats;
