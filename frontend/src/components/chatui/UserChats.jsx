import React from "react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useToast } from "@chakra-ui/react";
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

      setChats(data); 
    } catch (error) {
      console.log(error);
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "failed to load chats",
        position: "botton-left",
      })
    }
  }
};

export default UserChats;
