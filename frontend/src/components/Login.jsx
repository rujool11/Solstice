import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {

    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Provide all required details",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type":"application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config,
      );

      toast({
       title : "Successful",
       status: "success",
       duration: 5000,
       isClosable: true,
       position: "bottom",
      });

      setLoading(false);
      history.pushState("/chats"); // open chats page when successful login
    } catch (error) {
      toast ({
        title: "Error Occured",
        description: error.response.data.message || error.message,
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing="5px">

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign In
      </Button>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@guest.com")
          setPassword("guestpassword")
        }}
      >
        Login as Guest
      </Button>
    </VStack>
  );
};

export default Login;
