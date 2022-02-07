import React,{useState,useEffect} from "react"
import {subjectsAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'
const TopicForm= ({open,data, onClose,chapterID}) => {
 
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
        setSubmitting.on()
        setErrors(null)    
        let action = data ? subjectsAction.updateTopic(state,chapterID) : subjectsAction.addTopic(state,chapterID)
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
                title={ data ? 'Update Topic' : 'Create New Topic'}
                size='sm'
                footer={
                    <HStack>
                        <Box>
                            <Button rounded='sm' size='sm' isLoading={submitting} type="submit" form="topic-form">{data?'Update':'Submit'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="topic-form" onSubmit={handleSubmit}>

                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Topic Title" defaultValue={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                </form>

            </Drawer> 
    )
}
export default TopicForm