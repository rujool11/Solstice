import React from 'react'
import { Container, Box, Text } from "@chakra-ui/react"

const homePage = () => {
  return (
  <Container maxW="xl" centerContent>
    <Box
      display="flex"
      justifyContent="center"
      padding={3}
      bg={"white"}
      width="100%"
      m="40px 0 15px 0"
      borderRadius="0.5rem"
      borderWidth="1px"
    >
      <Text fontSize="2xl" fontFamily={"Kanit"} fontWeight={"300"}>WeChat</Text>
    </Box>

    <Box bg={"white"} padding={3} borderRadius="0.5rem" width="100%" borderWidth="1px"></Box>

  </Container>
  );
}

export default homePage
