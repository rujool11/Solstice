import React from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Stack,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {

  const history = useHistory();

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push('/chats'); // if logged in, push to chats

  }, [history]); // if user is logged in, push them to the chats page


  return (
    <Box width="100vw" height="100vh">
      <Grid templateColumns="repeat(2, 1fr)" height="100%" width="100%">
        <GridItem
          name="branding"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={3} textAlign="center">
            <Text fontSize="5rem" fontWeight="bold" color="white">
              Solstice
            </Text>
            <Text fontSize="3rem" fontWeight="medium" color="white">
              Real Time Chat App
            </Text>
          </Stack>
        </GridItem>
        <GridItem
          name="forms"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg={"white"}
            p={6}
            borderRadius="1.5rem"
            width="80%"
            borderWidth="1px"
          >
            <Tabs
              variant="soft-rounded"
              colorScheme="blue"
              align="center"
              textColor={"black"}
            >
              <TabList>
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
