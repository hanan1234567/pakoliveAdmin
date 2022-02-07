import React from 'react'
import { Box, Heading, HStack, IconButton, Image} from "@chakra-ui/react"
import { Icon} from '../../ui-elements'
import { public_path } from '../../config.json'

const SubjectCard = ({data, onClick, onEdit, onDelete, active, ...props}) => {
console.log("data:",data.thumbnail)

console.log("publicpath:",public_path)
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
            <Box>
                <Image  objectFit='cover' w="100%" h="150px" rounded="0" roundedTop="md" src={public_path +"\\"+ data?.thumbnail} />
            </Box>
            <Box p="4">
                <Heading size="md">{data?.title} - {data?.class?.title}</Heading>
                {/* <Text fontSize="sm">{data?.description}</Text> */}
            </Box>
            <HStack px="4" py="2" justifyContent="space-between" borderTop="1px solid" borderColor="gray.100">
                <Box>
                    {/* <Icon name="ios-book" mr="2" /> */}
                </Box>
                <HStack spacing="3">
                    <IconButton onClick={handleOnEdit} size="xs" rounded="full" colorScheme="gray" icon={<Icon fontSize="14px" name="ios-create" color="gray.500" />} />
                    <IconButton onClick={handleOnDelete} size="xs" rounded="full" colorScheme="gray" icon={<Icon  fontSize="14px" name="ios-trash" color="red.500" />} />                    
                </HStack>
            </HStack>
        </Box>
    )
}

export default SubjectCard;