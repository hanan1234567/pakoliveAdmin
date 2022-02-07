import React from 'react'
import {
    FormControl,
    FormLabel,
    Select as ChakraInput,    
    FormErrorMessage,
  } from "@chakra-ui/react"
  
const Select = ({error, label, children, ...props}) => {
    return(
        <FormControl isInvalid={error}>
            {label && <FormLabel>{label}</FormLabel>}            
            <ChakraInput {...props}>{children}</ChakraInput>

            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}
export {Select}