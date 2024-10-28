import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useToast,
  Box,
  FormControl,
  Input,
  position,
  StepDescription,
  Spinner,
} from "@chakra-ui/react";
import View from "../icons/View";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import UserItemBadge from "../useravatar/UserItemBadge.jsx";
import UserListItem from "../useravatar/UserListItem.jsx";
import axios from "axios";

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedChat, setSelectedChat, user } = ChatState();
  const [ groupChatName, setGroupChatName ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ search, setSearch ] = useState("");
  const [ searchResult, setSearchResult ] = useState([]);
  const [ renameLoading, setRenameLoading ] = useState(false);

  const toast = useToast();

  const handleRemove = async ( userToRemove ) => {
    if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
        title: "only admins can remove someone",
      })
      return;
    }

    try{
      
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer: ${user.token}`,
        },
      };

      const { data } = await axios.put("/api/chat/groupremove", {
        userId: userToRemove._id,
        chatId: selectedChat._id,
      }, config); 

      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
      // set chat empty if user removed themself, they shouldnt be able to see chat anymore
      setFetchAgain(!fetchAgain);
      setLoading(false);

    } catch (error) {
      toast({
        duration: 5000,
        position: "bottom",
        isClosable: "true",
        status: "error",
        title: "Could not remove from group"
      })
      setLoading(false);
      return;
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        duration: 5000,
        status: "warning",
        isClosable: true,
        position: "bottom",
        title: "User Already exists in group!" 
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
        title: "Only admins can add user to the group",
      })
      return;
    }

    try{
      setLoading(true);
  
      const config = {
        headers: { 
          Authorization: `Bearer: ${user.token}`,
        },
      };
      
      const { data } = await axios.put("/api/chat/groupadd",{
          chatId: selectedChat._id,
          userId: userToAdd._id,
      },
        config
      ); 

      setSelectedChat(data);
      setFetchAgain(!fetchAgain); // to fetch chats again after updation
      setLoading(false);

    } catch(error) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom",
        title: "Error in adding user",
        description: `${error}`,
      })
    
    }

  };

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

  const handleRename = async () => {
    if (!groupChatName) return;

    try {

        setRenameLoading(true);
        
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const { data } = await axios.put("/api/chat/rename",{
            chatId: selectedChat._id,
            newChatName: groupChatName,
        }, config); 

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);

    } catch(error) {
        toast({
            duration: 5000,
            status: "error",
            isClosable: "true",
            position: "bottom",
            title: "Could not rename group!",
            description: `${error}`,
        })
        setRenameLoading(false);
    }

    setGroupChatName("");
  };

  return (
    <>
      <IconButton display={{ base: "flex" }} icon={<View />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"3xl"}
            fontFamily="Kanit"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="row" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserItemBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                p={2}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                {" "}
                Update{" "}
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input
                placeholder="Add User to group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg"/>
            ) : (
              searchResult?.slice(0,4).map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
