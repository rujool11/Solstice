import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider.jsx";

const Signup = () => {
  const { setUser } = ChatState(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const postDetails = (pic) => {
    setLoading(true);

    if (pic === undefined) {
      toast({
        title: 'Please select image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "WeChat");
      data.append("cloud_name", "ddlr4zdn7");

      fetch("https://api.cloudinary.com/v1_1/ddlr4zdn7/upload", {

        method: "post", 
        body: data,

      }).then((res) => res.json())
      .then((data) => {

        setPicture(data.url.toString()),
        console.log("successful upload");
        setLoading(false);

      }). catch((error) => {

        console.log(error),
        setLoading(false);
      })

    } else {
      toast({
        title: 'Please select jpeg/png image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
       title : "Please fill all required fields",
       status: "warning",
       duration: 5000,
       isClosable: true,
       position: "bottom",
      });
      setLoading(false);
      return;
    } 
    
    if (password!=confirmpassword) {
      toast({
       title : "Passwords do not match",
       status: "warning",
       duration: 5000,
       isClosable: true,
       position: "bottom",
      });
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
        "/api/user",
        {name, email, password, pic: picture || undefined},
        config,
      )

      toast({
       title : "Successful",
       status: "success",
       duration: 5000,
       isClosable: true,
       position: "bottom",
      });

      setUser(data); // set user to latest logged in user
      localStorage.setItem("userInfo", JSON.stringify(data)); // save data in localstorage under key useInfo to avoid repeated login
      setLoading(false);
      history.push("/chats");// open chats after successful registration
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
  };


  return (
    <VStack spacing="5px" pb={0} > 
      
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>

    </VStack>
  );
};

export default Signup;
