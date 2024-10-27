import React from "react";
import { ChatState } from "../../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat.jsx";

const ChatSpace = ({fetchAgain, setFetchAgain}) => {

  const { selectedChat } = ChatState();

  return (
    <Box display={{base: selectedChat ? "flex" : "none", md: "flex"}}
      alignItems="center"
      width={{base: "100%", md: "68%"}}
      flexDirection="column"
      padding={3}
      borderRadius="3px"
      borderWidth="1px" 
      color="black"
      background="white"
      fontFamily="Kanit"
    >

      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )

}

export default ChatSpace;
