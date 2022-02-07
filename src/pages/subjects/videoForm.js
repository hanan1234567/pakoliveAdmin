import React,{useState,useEffect} from "react"
//import {chaptersAction } from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'
const VideoForm= ({open,data, onClose,chapterID}) => {
    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
 
    const handleInputChange= (name,value) => {
        setState({...state,[name]:value})
    }
    useEffect(() => {
        if(open){
            setState({order:'0'})
        }
        if(data && open){
            setState({...data,order:'0'})            
        }
    }, [data, open])

    const handleClose = () => {
        setState({})
        setErrors(null)
        onClose()
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        console.log("state:",state)
        return;
        setSubmitting.on()
        setErrors(null)    
        let action =1
        // data ? chaptersAction.updateTopic(state,chapterID) : chaptersAction.addTopic(state,chapterID)
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
        <Drawer
                open={open}
                onClose={handleClose}
                title={ data ? 'Update Video' : 'Create New Video'}
                size='md'
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} type="submit" form="video-form">{data?'Update':'Publish'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="video-form" onSubmit={handleSubmit}>

                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Video Titles" defaultValue={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Video Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input  error={errors?.url?.message} label="Video URL" value={state?.url || ''} onChange={(e) => handleInputChange('url', e.target.value )} />
                    </HStack>
                    
                </form>

            </Drawer> 
    )
}
export default VideoForm