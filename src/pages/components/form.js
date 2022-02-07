import React,{useState,useEffect} from "react"
import {componentsAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'

const Form= ({open,data, onClose}) => {

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
        let action = data ? componentsAction.update(state) : componentsAction.add(state)
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
                title={ data ? 'Update' : 'Upload '}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="form">{data?'Update':'Upload'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="form" onSubmit={handleSubmit}>
                    <HStack my="20px">
                        <Input error={errors?.name?.message} label="Name" value={state?.name || ''} onChange={(e) => handleInputChange('name', e.target.value )} />
                        <Input error={errors?.address?.message} label="Address" value={state?.address || ''} onChange={(e) => handleInputChange('address', e.target.value )} />
                    </HStack>
                    <HStack>
                        <Input type='email' error={errors?.email?.message} label="Email" value={state?.email || ''} onChange={(e) => handleInputChange('email', e.target.value )} />
                        <Input type='number' error={errors?.phone?.message} label="Phone" value={state?.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value )} />
                    </HStack>
                </form>
            </Drawer> 
    )
}
export default Form