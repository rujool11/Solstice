import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const homePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        padding={3}
        bg={"white"}
        width="100%"
        m="40px 0 10px 0"
        borderRadius="0.5rem"
        borderWidth="1px"
      >
        <Text fontSize="2xl" fontFamily={"Kanit"} fontWeight={"300"}>
          WeChat
        </Text>
      </Box>

      <Box
        bg={"white"}
        padding={3}
        paddingBottom={0}
        borderRadius="0.5rem"
        width="100%"
        borderWidth="1px"
      >
        <Tabs
          mb="1rem"
          variant="soft-rounded"
          colorScheme="green"
          align="center"
          textColor={"black"}
        >
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><Signup/></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default homePage;
