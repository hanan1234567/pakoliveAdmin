import React from 'react'
import { Switch as ChakraSwitch, Box, FormControl } from "@chakra-ui/react"

const Switch = ({label, ...props}) => {

    return(
        <FormControl>            
            <label>
                <Box my="3" display="flex" alignItems="center">                    
                    <ChakraSwitch isFocusable={false} colorScheme="brand" {...props} mr="3" />
                    {label}
                </Box>
            </label>
        </FormControl>
    )
}

export {Switch}