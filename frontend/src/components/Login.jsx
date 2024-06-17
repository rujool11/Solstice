import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = () => {}

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
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
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
