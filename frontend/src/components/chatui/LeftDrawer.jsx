import React from "react";
import {
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Box,
  Input,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";

const LeftDrawer = ({children}) => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { search, setSearch } = useState("");
  const { loading, setLoading } = useState(false);
  const toast = useToast();

  const handleSearch = () => {
    if (!search) {
        toast({
            title: "please enter search field",
            status: "warning",
            isClosable: true,
            duration: 5000,
            position: "top-left",
        });
        return;
    } 
    try { 

    } catch (error) {

    }
  };

  return (
    <>
    <div onClick={onOpen}>{children}</div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px"span1px fontFamily="Kanit">Search Users</DrawerHeader>
          <DrawerBody>
            <Box
            display="flex"
            pd={2}
            >
                <Input 
                placeholder="search for user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                margin={1}
                />
                <Button marginTop= {1} onClick={handleSearch}><SearchIcon size={18}/></Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
