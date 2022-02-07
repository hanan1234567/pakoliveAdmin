import React from 'react'
import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    Textarea,
    FormErrorMessage,
    HStack,
    Text,
    Button,
  } from "@chakra-ui/react"
import {Icon} from './Icon'
  
const Input = React.forwardRef( ({error, label, textarea = false,date=false,file=false,leftLabel=false, ...props}, ref) => {
    return(
        <FormControl isInvalid={error}>
            {label && <FormLabel>{label}</FormLabel>}            
            { 
              textarea ? <Textarea {...props} ref={ref} /> :
              date ? <Input type='date' {...props} ref={ref} /> :
              file ?  
                <>
                <Button  variant="outline" rounded="sm" onClick={props.onClick} size="sm" leftIcon={<Icon fontSize="24px" color="brand.500" name="md-cloud-upload" />}>Upload File</Button>         
                <Text>{props?.fileName}</Text>
                <Input type='file' {...props} ref={ref} />
                </> 
              :
              leftLabel?
                <HStack>
                  <Text>{leftLabel}</Text>
                  <ChakraInput {...props} ref={ref} />
                </HStack>
              :
              <ChakraInput {...props} ref={ref} />}            
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
})
export {Input}