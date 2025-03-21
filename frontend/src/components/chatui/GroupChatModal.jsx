import React from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import UserItemBadge from "../useravatar/UserItemBadge";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "../useravatar/UserListItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to search user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length < 2) {
      toast({
        status: "error",
        title: "Incomplete form",
        description: "please fill all the fields (at least 3 members in a group)",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("api/chat/group",{
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config);

      setChats([data, ...chats]);
      onClose(); // close the modal
      toast({
        title: "New Group Chat Created!",
        status: "success",
        isClosable: "true",
        duration: 5000,
      });
      setLoading(false);

    } catch (error) {
      toast({
        title: "Failed to create group",
        description: error.response,data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = (userToDelete) => {
    // filter out user who has same id, and update selectedUsers array
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToDelete._id)
    );
  };

  const handleGroup = (userToAdd) => {
    //  if user already exists, just show toast and return
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        isClosable: true,
        duration: 5000,
        position: "top",
      });

      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Kanit"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" flexDirection="column">
            <FormControl>
              <Input
                placeholder="Chat Name"
                marginBottom={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users (search by username)"
                marginBottom={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            <Box display="flex" flexWrap="wrap" width="100%">
              {selectedUsers.map((u) => (
                <UserItemBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {/* render searched users, only display 4 at a time */}
            {loading ? (
              <div>loading</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              fontFamily="Kanit"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
