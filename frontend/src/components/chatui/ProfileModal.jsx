import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  Box,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import View from "../icons/View";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // wrap children in modal (refer to chakraUI docs)
  return (
    <>
      {children ? <IconButton variant="ghost" onClick={onOpen}>{children}</IconButton> : <View />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            display="flex"
            justifyContent="center"
            fontFamily="Kanit"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              border="3px solid"
              borderColor="purple"
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text fontSize={{ base: "25px", md: "30px" }} fontFamily="Kanit">
              {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
