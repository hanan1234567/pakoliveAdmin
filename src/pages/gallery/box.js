import React from 'react'
import {Heading, HStack, IconButton, Image,Text,Box} from "@chakra-ui/react"
import { Icon} from '../../ui-elements'
import { public_path } from '../../config.json'

const BoX= ({data, onEdit, onView, onDelete, active}) => {
    const handleOnEdit = (e) => {
        e.stopPropagation()
        onEdit(data)
    }

    return(
         <Box bg="white"  border="2px solid" borderColor={active ? 'brand.500' : 'transparent' } rounded="sm" cursor="pointer" _hover={{ borderColor: 'gray.300' }}>
            <Box>
                <Image  objectFit='cover' w="100%" h="150px" rounded="0" roundedTop="sm" src={data?.thumbnail?.url} />
            </Box>
            <Box px={2} py={2}>
                <Heading size="md" isTruncated>{data?.title}</Heading>
                <Text fontSize="sm" isTruncated>{data?.description}</Text>
            </Box>
            <HStack w='100%' p={2} justifyContent='flex-end' borderTop="1px solid" borderColor="gray.100">
                <IconButton onClick={onView} size="xs" rounded="full" colorScheme="gray" icon={<Icon fontSize="14px" name="md-images" color="brand.500" />} />   
                <IconButton onClick={handleOnEdit} size="xs" rounded="full" colorScheme="gray" icon={<Icon fontSize="14px" name="ios-create" color="gray.500" />} />
                <IconButton onClick={onDelete} size="xs" rounded="full" colorScheme="gray" icon={<Icon  fontSize="14px" name="ios-trash" color="red.500" />} />                    
            </HStack>
        </Box>
    )
}

export default BoX;