import React from 'react'
import {Box, Spinner, Fade } from '@chakra-ui/react'

export const Splash = () => {
    return (
        <Fade in={true}>
        <Box 
            d="flex" 
            minH={'100vh'} 
            alignItems="center" 
            justifyContent="center" 
            bg="gray.900" 
            bgImage='./assets/auth-bg.svg' 
            bgSize="cover" 
            bgAttachment="fixed"
        >
            <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.100"
                color="brand.300"
                size="xl"
            />
        </Box>
        </Fade>
    )
    
}