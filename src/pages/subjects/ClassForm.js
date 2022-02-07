import React,{useState,useEffect} from "react"
import {subjectsAction,usersAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'

const ClassForm = ({ open,data, onClose, ...props}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)    


    const handleInputChange= (name,value) => {
        setState({...state,[name]:value})
    }

    useEffect(() => {
        dispatch(usersAction.get())             
        // eslint-disable-next-line
    }, [open])

    useEffect(() => {
        if(data && open){
            setState({
                ...data                
            })            
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
        let action = data ? subjectsAction.update_class(state, data?._id) : subjectsAction.add_class(state)
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
                title={ data ? 'Update Class' : 'Create New Class'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} type="submit" form="class-form">Submit</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="class-form" onSubmit={handleSubmit}>
                    

                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Class Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>                    

                </form>

            </Drawer> 
    )
}
export default ClassForm