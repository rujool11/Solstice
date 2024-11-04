import React from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import ArrowLeft from "../icons/ArrowLeft";
import { IconButton } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { getSenderFull, getSender } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import { FormControl } from "@chakra-ui/react";
import View from "../icons/View";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const { user, selectedChat, setSelectedChat } = ChatState();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id, 
        }, config);

        setMessages([messages, data]);

      } catch (error) {
        toast({
          title: "Error occured",
          type: "error",
          duration: 5000,
          isClosable: true,
          description: error.message,
          position: "bottom",
        })
      }
    } 
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // typing indicator logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Kanit"
            p={3}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowLeft />}
              p={2}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                {
                  <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                    <View />
                  </ProfileModal>
                }
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                }
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            py={3}
            px={5}
            width="100%"
            height="100%"
            borderRadius="3px"
            overflowY="hidden"
            background="#E8E8E8"
          >
            {loading ? (
              <Spinner
                size="xl"
                height={20}
                width={20}
                margin="auto"
                alignSelf="center"
              />
            ) : (
              <div>{/*Messages*/}</div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired marginTop={3}>
              <Input
                variant="filled"
                background="#E0E0E0"
                placeholder="Enter a message.."
                onChange={typingHandler}
                value={newMessage}
                fontFamily="Kanit"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text fontFamily="Kanit" fontSize="3xl">
            Select a chat to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
