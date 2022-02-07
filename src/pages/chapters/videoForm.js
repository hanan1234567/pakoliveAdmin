import React,{useState,useEffect} from "react"
import {usersAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean,FormControl,FormLabel,FormHelperText,Input,Textarea,Button, HStack,VStack, Text, Spacer,useToast} from '@chakra-ui/react'
import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton} from "@chakra-ui/react"
const VideoForm=function({open,data,onClose})
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
                <DrawerHeader borderBottomWidth="1px">Add Video</DrawerHeader>
                <DrawerBody py={4}>
                    <VStack spacing={7}>
                        <FormControl>
                            <FormLabel htmlFor="title">Video Title</FormLabel>
                            <FormHelperText  mb={2}>Keep it short, informative</FormHelperText>
                            <Input type="text" id='title' error={errors?.title?.message} defaultValue={state?.title||''} onChange={(e) => handleInputChange('title', e.target.value )}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Video Description</FormLabel>
                            <FormHelperText  mb={2}>
                                Provide a concise description for the subject.Not all content templates present this description. So you may select not to provide it.
                            </FormHelperText>
                            <Textarea defaultValue={state?.description||''} error={errors?.description?.message} onChange={(e) => handleInputChange('description', e.target.value )}>
                            </Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Video URL</FormLabel>
                            <FormHelperText mb={2}>Enter the video detail e.g www.example.com/video-ID</FormHelperText>
                            <HStack>
                                <Text fontSize='md'>www.vimeo.com/</Text>
                                <Input type='text' placeholder='video ID' defaultValue={state?.videoID||''} error={errors?.videoID?.message} onChange={(e) => handleInputChange('videoID', e.target.value )}/>
                            </HStack>
                       </FormControl>
                    </VStack>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                    <Spacer/>
                    <Button size='sm'  isLoading={submitting} onClick={handleSubmit}>{data?'Update':'Save'}</Button>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    )
}
export default VideoForm