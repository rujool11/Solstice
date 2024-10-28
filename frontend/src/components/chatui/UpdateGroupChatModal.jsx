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
} from "@chakra-ui/react";
import View from "../icons/View";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import UserItemBadge from "../useravatar/UserItemBadge.jsx";
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

  const handleRemove = ({ userToRemove }) => {};

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
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
