import React,{useState,useEffect} from "react"
import {jobsAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input,Select,TextEditor} from '../../ui-elements'


const JobForm= ({open,data, onClose}) => {

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
        let action = data ? jobsAction.update(state) : jobsAction.add(state)
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
                title={ data ? 'Update Job' : 'Upload Job'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="job-form">{data?'Update':'Upload'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="job-form" onSubmit={handleSubmit}>
                    <HStack my="20px">
                        <Input error={errors?.position?.message} label="Position" value={state?.position || ''} onChange={(e) => handleInputChange('position', e.target.value )} />
                        <Input error={errors?.department?.message} label="Department" value={state?.department || ''} onChange={(e) => handleInputChange('department', e.target.value )} />
                    </HStack>
                    <Box my="20px">
                    <TextEditor error={errors?.detail?.message} label="Qualification & Experience" value={state?.detail || ''} onChange={(value) => handleInputChange('detail', value )}/>
                    </Box>
                    <HStack my="20px">
                        <Input date error={errors?.release?.message} label="Release Date" value={state?.release || ''} onChange={(e) => handleInputChange('release', e.target.value )} />
                        <Input date error={errors?.closing?.message} label="Closing Date" value={state?.closing || ''} onChange={(e) => handleInputChange('closing', e.target.value )} />
                    </HStack>
                    <Box  my="20px">                            
                        <Select error={errors?.status?.message}  label="Status" value={state?.status || ''} onChange={(e) => handleInputChange('status', e.target.value )}>
                            <option value="Open">Open</option>
                            <option value="Close">Close</option>
                        </Select>
                    </Box>
                </form>
            </Drawer> 
    )
}
export default JobForm