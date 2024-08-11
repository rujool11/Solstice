import React from "react";
import { ChatState } from "../context/ChatProvider.jsx";
import NavBar from "../components/misc/NavBar.jsx";
import { Box } from "@chakra-ui/react";
import UserChats from "../components/misc/UserChats.jsx";
import ChatSpace from "../components/misc/ChatSpace.jsx";

const chatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <NavBar />}
      {/* if user exists, NavBar rendered */}

      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        width="100%"
        height="90vh"
      >
        {user && <UserChats />}
        {user && <ChatSpace />}
      </Box>
    </div>
  );
};

export default chatPage;
