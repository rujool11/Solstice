import React, { useEffect } from "react";
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
};

export default UserChats;
