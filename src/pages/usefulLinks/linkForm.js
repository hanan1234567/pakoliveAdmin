import React,{useState,useEffect} from "react"
import {linksAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'


const LinkForm= ({open,data, onClose}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState({status:'Open'})
    const [errors, setErrors] = useState(null)

    const handleInputChange= (name,value) => {
        setState({...state,[name]:value})
    }
    useEffect(() => {
        if(data && open){
            setState({
                ...data,
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
        let action = data ? linksAction.update(state) : linksAction.add(state)
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
                title={ data ? 'Update Link' : 'Upload Link'}
                size='md'
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="link-form">{data?'Update':'Save'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="link-form" onSubmit={handleSubmit}>
                    <Box my="20px">
                        <Input error={errors?.title?.message} label="Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </Box>
                    <Box my="20px">
                        <Input error={errors?.link?.message} label="Useful Link" leftLabel='http://www.' value={state?.link || ''} onChange={(e) => handleInputChange('link', e.target.value )} />
                    </Box>
                </form>
            </Drawer> 
    )
}
export default LinkForm