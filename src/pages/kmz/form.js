import React,{useState,useEffect} from "react"
import {locationsAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'


const Form= ({open,data, onClose}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
    const fileRef = React.useRef()    

    const selectFile = () => {
        fileRef.current.click()
    }
    const handleFileChange = (name, e) => {
        let reader = new FileReader();
        let file = e.target.files[0];   
        reader.onloadend = () => {
            setState({
              ...state,
              [name]: {
                  file: file,
                  preview: file?.name
              }
            })            
        }
        if(file)
        reader.readAsDataURL(file)
    }
    const handleInputChange= (name,value) => {
        setState({...state,[name]:value})
    }
    useEffect(() => {
        if(data && open){
            setState({
                ...data,
                kmz: {
                    file: null,
                    preview: data?.kmz?.fileName
                }
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
        let formData = new FormData()
        formData.append('title', state?.title || '')
        formData.append('kmz', state?.kmz?.file || '')
        if(data)
        formData.append('_id', state?._id || '')
        let action = data ? locationsAction.update(formData) : locationsAction.add(formData)
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
                size='md'
                title={ data ? 'Update Location' : 'Save Location'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="form">{data?'Update':'Save'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="form" onSubmit={handleSubmit}>
                    <Box my="20px">
                        <Input error={errors?.title?.message} label="Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </Box>
                    <Box>
                        <Input d="none" file  label="Upload (.kmz) " error={errors?.kmz?.message} fileName={state?.kmz?.preview|| ''} ref={fileRef} onClick={() => selectFile()} onChange={(e) => handleFileChange('kmz', e)} />
                    </Box>
                </form>
            </Drawer> 
    )
}
export default Form