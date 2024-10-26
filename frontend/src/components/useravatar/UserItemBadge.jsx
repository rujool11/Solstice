import { Box } from '@chakra-ui/react'
import React from 'react'
import CloseIcon from "../icons/CloseIcon.jsx"

const UserItemBadge = ({user, handleFunction}) => {
    return (
        <Box
        px={1}
        display="flex"
        alignItems="center"
        borderRadius="7px"
        m={1}
        mb={1}
        p={1}
        color="white"
        backgroundColor="purple"
        variant="solid"
        onClick={handleFunction}
        fontSize="12"
        fontFamily="Kanit"
        >
            {user.name}
            <CloseIcon paddingLeft={3}/>
        </Box>
    )
}

export default UserItemBadge
