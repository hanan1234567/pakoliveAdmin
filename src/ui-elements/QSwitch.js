import React from 'react'
import { Switch as ChakraSwitch,FormLabel, FormControl, HStack,VStack } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
const QSwitch = ({label,input=false,radio=false, ...props}) => {

    return(
        <FormControl>                             
            <HStack alignItems='flex-start' spacing={1}>
                {radio && <ChakraSwitch isFocusable={false} colorScheme="brand" pt={1} value={props.value} onChange={props.onChange} size='md' mr="3" />}
                <VStack alignItems='flex-start'>
                    {
                        label && <FormLabel m={0}>{label}</FormLabel>
                    }   
                    {
                        input && <Input w='80px' size='sm' onChange={props.onChange} value={props.value} placeholder={props.placeholder}/>
                    }
                </VStack>
            </HStack>
        </FormControl>
    )
}

export {QSwitch}