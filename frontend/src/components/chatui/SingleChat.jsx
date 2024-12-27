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
import { useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import "./styles.css";

const ENDPOINT = "http://localhost:5000"; // backend
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toast = useToast();

  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join_chat", selectedChat._id); // join new room with selectedChatId

    } catch (error) {
      toast({
        duration: 5000,
        type: "error",
        position: "bottom",
        isClosable: true,
        title: "Could not fetch messages",
        description: error.message,
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop_typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("send_message", data);

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error occured",
          type: "error",
          duration: 5000,
          isClosable: true,
          description: error.message,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user); // pass user to server-side socket server
    socket.on("connected", () => setSocketConected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  const typingHandler = (event) => {
    setNewMessage(event.target.value);

    // typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true); // since this runs when we press any keys
      socket.emit("typing", selectedChat._id);
    }

    // debounce function to stop showing indicator after 3 seconds
    let lastTypingTime = new Date().getTime();
    let timerLength = 1500; // 1.5 seconds

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop_typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat; //keep backup so we can compare 
    
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message_received", (newMessageReceived) => {
      // if no chat selected, or does not match current selected chat
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // give notification, do not display
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    })
  });

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
                    fetchMessages={fetchMessages}
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
              <Box
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                className="hide-scrollbar"
              >
                {<ScrollableChat messages={messages} />}
              </Box>
            )}

            <FormControl onKeyDown={sendMessage} isRequired marginTop={3}>
              {isTyping ? <div>Typing...</div> : <></>}
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
