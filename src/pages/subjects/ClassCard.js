import React from 'react'
import { Box, Heading, HStack,Text, IconButton} from "@chakra-ui/react"
import { Icon} from '../../ui-elements'

const ClassCard = ({data, onClick, onEdit, onDelete, active, ...props}) => {

    const handleOnEdit = (e) => {
        e.stopPropagation()
        onEdit(data)
    }

    const handleOnDelete = async (e) => {
        e.stopPropagation()
        let result = await window.confirm('Do you really want to remove this Class?', 'Confirm');
        if(result)
            onDelete(data?._id)
    }

    return(
        <Box bg="white" onClick={() => onClick(data?._id)} border="2px solid" borderColor={active ? 'brand.500' : 'transparent' } rounded="md" cursor="pointer" _hover={{ borderColor: 'gray.300' }}  {...props}>
            <Box p="4">
                <Heading size="md">{data?.title}</Heading>
                <Text fontSize="sm">{data?.description}</Text>
            </Box>
            <HStack px="4" py="2" justifyContent="space-between" borderTop="1px solid" borderColor="gray.100">
                <Box>
                    <Icon name="ios-book" mr="2" />
                    <Text as="span" fontSize="sm">{data?.subjects?.length || 0}</Text>
                </Box>
                <HStack spacing="3">
                    <IconButton onClick={handleOnEdit} size="xs" rounded="full" colorScheme="blue" icon={<Icon fontSize="12px" name="ios-create" color="white" />} />
                    <IconButton onClick={handleOnDelete} size="xs" rounded="full" colorScheme="red" icon={<Icon  fontSize="12px" name="ios-trash" color="white" />} />                    
                </HStack>
            </HStack>
        </Box>
    )
}

export default ClassCard;