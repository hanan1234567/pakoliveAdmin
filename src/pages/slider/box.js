import React from 'react'
import {Heading, HStack, IconButton, Image,Text,Box} from "@chakra-ui/react"
import { Icon} from '../../ui-elements'

const BoX= ({data, onEdit, onDelete, active}) => {
    const handleOnEdit = (e) => {
        e.stopPropagation()
        onEdit(data)
    }

    const handleOnDelete = async () => {
        let result = await window.confirm('Do you really want to remove this Slide?', 'Confirm');
        if(result)
            onDelete()
    }

    return(
         <Box bg="white"  border="2px solid" borderColor={active ? 'brand.500' : 'transparent' } rounded="sm" cursor="pointer" _hover={{ borderColor: 'gray.300' }}>
            <Box>
                <Image  objectFit='cover' w="100%" h="150px" rounded="0" roundedTop="sm" src={data?.image?.url} />
            </Box>
            <Box px={2} py={2}>
                <Heading size="md" isTruncated>{data?.title}</Heading>
                <Text fontSize="sm" isTruncated>{data?.description}</Text>
            </Box>
            <HStack w='100%' p={2} justifyContent='flex-end' borderTop="1px solid" borderColor="gray.100">
                <IconButton onClick={handleOnEdit} size="xs" rounded="full" colorScheme="gray" icon={<Icon fontSize="14px" name="ios-create" color="gray.500" />} />
                <IconButton onClick={handleOnDelete} size="xs" rounded="full" colorScheme="gray" icon={<Icon  fontSize="14px" name="ios-trash" color="red.500" />} />                    
            </HStack>
        </Box>
    )
}

export default BoX;