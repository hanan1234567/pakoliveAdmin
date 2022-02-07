import React,{useState,useEffect} from "react"
import {useSelector,useDispatch } from 'react-redux'
import {tendersAction } from '../../redux/actions'
import {useAbility} from '../../hooks'
import {useBoolean, Heading,VStack,HStack,Text,Button,IconButton,useToast, ButtonGroup} from "@chakra-ui/react"
import {Table,Thead,Tbody,Tr,Th,Td} from '@chakra-ui/react'
import { Loader,Icon, Alert} from '../../ui-elements'
import TenderForm from "./tenderForm"
const Tenders = () => {
    const ability = useAbility()
    const [loading, setLoading] = useBoolean(false)
    const [open, setOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const toast = useToast()
    const dispatch=useDispatch();
    const {tenders} = useSelector(state => state?.tenders)

    const handleEdit = (data) => {
        setEditable(data)
        setOpen.on()
    }
    useEffect(() => {          
        setLoading.on()
        dispatch(tendersAction.get())
            .then(() => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const deleteTender= async(newsID) => {
        let result = await window.confirm('Do you really want to remove this Tender?', 'Confirm');
        if(result)
        {
            dispatch(tendersAction.remove(newsID))
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
                <Heading size="md" m={0}>Tenders</Heading> 
                <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" onClick={setOpen.on} size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />               
            </HStack>
            {loading?<Loader />:
                <VStack w='100%' px={5} py={5}>
                    {
                        tenders?.length > 0 ?                        
                        <Table bg='white' fontSize='sm' size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Title</Th>
                                    <Th>Release</Th>
                                    <Th>Closing</Th>
                                    <Th>Status</Th>
                                    <Th>Operation</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    tenders?.map((tender,t) =>
                                    <Tr key={'tender-'+t}>
                                        <Td>{t+1}</Td>
                                        <Td>{tender?.title}</Td>
                                        <Td>{tender?.release}</Td>
                                        <Td>{tender?.closing}</Td>
                                        <Td>{tender?.status}</Td>
                                        <Td>
                                            <ButtonGroup size="xs" rounded="full" colorScheme="gray">
                                            <IconButton onClick={()=>{handleEdit(tender)}}  icon={<Icon fontSize="14px" name="ios-create" color="gray.500" />} />
                                            <IconButton onClick={()=>{deleteTender(tender?._id)}} icon={<Icon  fontSize="14px" name="ios-trash" color="red.500" />} />                    
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                    </Table>
                        :
                        <Alert  rounded="sm" colorScheme="white" py={4} shadow="sm" center title="You have not Upload Any Tender Yet">
                            <VStack textAlign="center" spacing={5}>
                                <Text>Let us help you getting started</Text>
                                <Button mt="4"  size='sm' rounded='sm' onClick={setOpen.on}>upload Tender</Button>
                            </VStack>
                        </Alert>
                    }
                </VStack>
            }
            <TenderForm open={open} data={editable} onClose={() => { setEditable(null); setOpen.off()}}/>
        </VStack>
    )
}
export default Tenders