import React,{useState,useEffect} from "react"
import {useSelector,useDispatch } from 'react-redux'
import {socialLinksAction } from '../../redux/actions'
import {useAbility} from '../../hooks'
import {useBoolean, Heading,VStack,HStack,Text,Button,IconButton,useToast, ButtonGroup} from "@chakra-ui/react"
import {Table,Thead,Tbody,Tr,Th,Td} from '@chakra-ui/react'
import { Loader,Icon, Alert} from '../../ui-elements'
import Form from "./form"
const SocialLinks = () => {
    const ability = useAbility()
    const [loading, setLoading] = useBoolean(false)
    const [open, setOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const toast = useToast()
    const dispatch=useDispatch();
    const {socialLinks} = useSelector(state => state?.socialLinks)

    const handleEdit = (data) => {
        setEditable(data)
        setOpen.on()
    }
    useEffect(() => {          
        setLoading.on()
        dispatch(socialLinksAction.get())
            .then(() => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const deleteJob= async(linkID) => {
        let result = await window.confirm('Do you really want to remove this Link?', 'Confirm');
        if(result)
        {
            dispatch(socialLinksAction.remove(linkID))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })  
        }      
    }
    return (
        <VStack w='100%' h='100vh' overflowY='auto' spacing={0}>                        
            <HStack w='100%' px={5} py={3} position='sticky' top={0} bg='white' zIndex={99}>
                <Heading size="md" m={0}>Social Links</Heading> 
                <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" onClick={setOpen.on} size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />               
            </HStack>
            {loading?<Loader />:
                <VStack w='100%' px={5} py={5}>
                    {
                        socialLinks?.length > 0 ?                        
                        <Table bg='white' size='sm' fontSize='sm'>
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Title</Th>
                                    <Th>Link</Th>
                                    <Th>Operation</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    socialLinks?.map((link,l) =>
                                    <Tr key={'link-'+l}>
                                        <Td>{l+1}</Td>
                                        <Td>{link?.title}</Td>
                                        <Td>{link?.link}</Td>
                                        <Td>
                                            <ButtonGroup size="xs" rounded="full" colorScheme="gray">
                                            <IconButton onClick={()=>{handleEdit(link)}}  icon={<Icon fontSize="14px" name="ios-create" color="gray.500" />} />
                                            <IconButton onClick={()=>{deleteJob(link?._id)}} icon={<Icon  fontSize="14px" name="ios-trash" color="red.500" />} />                    
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                    </Table>
                        :
                        <Alert  rounded="sm" colorScheme="white" py={4} shadow="sm" center title="You have not upload any social link yet">
                            <VStack textAlign="center" spacing={5}>
                                <Text>Let us help you getting started</Text>
                                <Button mt="4"  size='sm' rounded='sm' onClick={setOpen.on}>upload Link</Button>
                            </VStack>
                        </Alert>
                    }
                </VStack>
            }
            <Form open={open} data={editable} onClose={() => { setEditable(null); setOpen.off()}}/>
        </VStack>
    )
}
export default SocialLinks