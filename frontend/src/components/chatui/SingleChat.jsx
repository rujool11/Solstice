import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import ArrowLeft from "../icons/ArrowLeft";
import { IconButton } from "@chakra-ui/react";
import { getSenderFull, getSender } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import View from "../icons/View";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

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
                            <View/>
                        </ProfileModal>
                    }
                </>
            ) : (
                <>
                    {selectedChat.chatName.toUpperCase()}
                    {/* {update gc icon}     */}
                </>

            )}
          </Text>
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
