import React from "react";
import {Box, Spinner} from '@chakra-ui/react'

export const Loader = (props) => {
    return(
        <Box 
            w="100%"
            h='100vh'
            position="fixed"
            left="0"
            top="0"
            bg="rgba(248, 242, 237,0.3)"
            zIndex="99"
            className="center"
        >
            <Spinner size="lg" />
        </Box>
    )
}
