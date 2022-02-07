import React,{useState,useEffect} from "react"
import {usersAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean,FormControl,FormLabel,FormHelperText,Input,Textarea,Button,ButtonGroup,HStack, VStack,Text, Spacer,useToast} from '@chakra-ui/react'
import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton} from "@chakra-ui/react"
const TopicForm=function({open,data,onClose})
{
    const toast=useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
    const handleInputChange=(name,value)=>
    {
        setState({...state,[name]:value})
        console.log(state)
    }
    useEffect(() => {
     //   dispatch(rolesAction.get())     
        // eslint-disable-next-line       
    }, [open])
    useEffect(() => {
        if(data && open){
            setState(data)
        }
    }, [data, open])
    const handleSubmit = () => {
        console.log(state)    
        setSubmitting.on()
        let action = data ? usersAction.update(state) : usersAction.add(state)
        dispatch(action)
            .then((res) => {
                setSubmitting.off()       
                toast({description: res.message, status: 'success'}) 
                onClose()        
            })
            .catch((err) => {

                setErrors(err?.error)
                toast({description: err?.message, status: 'error'})
                setSubmitting.off()
            })  
    }
    return (
        <Drawer isOpen={open} placement="right" size='md' onClose={()=>{onClose()}}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Add Topic</DrawerHeader>
                <DrawerBody py={4}>
                    <VStack spacing={7}>
                        <FormControl>
                            <FormLabel htmlFor="title">Topic Title</FormLabel>
                            <FormHelperText  mb={2}>Keep it short, informative</FormHelperText>
                            <Input type="text" id='title' error={errors?.title?.message} defaultValue={state?.title||''} onChange={(e) => handleInputChange('title', e.target.value )}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Topic Description
                            </FormLabel>
                            <FormHelperText  mb={2}>
                                Provide a concise description for the subject.Not all content templates present this description. So you may select not to provide it.
                            </FormHelperText>
                            <Textarea defaultValue={state?.description||''} error={errors?.description?.message} onChange={(e) => handleInputChange('description', e.target.value )}>
                            </Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Topic Activities</FormLabel>
                            <FormHelperText mb={2}>Activities are helpful material for topics. Which includes videos, reading material, mock assessments.</FormHelperText>
                            <HStack spacing={8}>
                                <VStack cursor='pointer'>
                                    <ion-icon name="videocam-outline"></ion-icon>
                                    <Text fontSize='xs'>Video</Text>
                                </VStack>
                                <VStack cursor='pointer'>
                                    <ion-icon name="document-text-outline"></ion-icon>
                                    <Text fontSize='xs'>Document</Text>
                                </VStack>
                                <VStack cursor='pointer'>
                                    <ion-icon name="newspaper-outline"></ion-icon>
                                    <Text fontSize='xs'>Assessment</Text>
                                </VStack>
                            </HStack>                                                                       
                        </FormControl>
                    </VStack>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                    <Spacer/>
                    <ButtonGroup>
                        <Button size='sm'  isLoading={submitting} onClick={handleSubmit}>{data?'Update':'Publish'}</Button>
                        <Button size='sm'  isLoading={submitting}>Save as Draft</Button>
                    </ButtonGroup>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    )
}
export default TopicForm