import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from "@chakra-ui/react"
import ReactQuill from 'react-quill';
import "../../node_modules/react-quill/dist/quill.snow.css"
const TextEditor = React.forwardRef( ({error, label,  ...props}, ref) => {
    return(
        <FormControl isInvalid={error} >
            {label && <FormLabel>{label}</FormLabel>}            
            <ReactQuill {...props} innerRef={ref}/>            
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
})
export {TextEditor}