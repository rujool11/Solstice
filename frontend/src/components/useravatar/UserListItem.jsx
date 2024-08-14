import React from "react";
import { Box, Avatar, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        bg: "#38B2AC",
        color: "white",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="5px"
    >
      <Avatar
        src={user.pic}
        name={user.name}
        mr={2}
        size="sm"
        cursor="pointer"
      />
      <Box>
        <Text fontFamily="Kanit">{user.name}</Text>
        <Text fontFamily="Kanit" fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
