import React,{useState,useEffect} from "react"
import {tendersAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast} from '@chakra-ui/react'
import { Drawer, Input,Select} from '../../ui-elements'


const TenderForm= ({open,data, onClose}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState({status:'Open'})
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
                file: {
                    file: null,
                    preview: data?.file?.fileName
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
        formData.append('release', state?.release || '')
        formData.append('closing', state?.closing || '')
        formData.append('status', state?.status || '')
        formData.append('file', state?.file?.file || '')
        if(data)
        formData.append('_id', state?._id || '')
        let action = data ? tendersAction.update(formData) : tendersAction.add(formData)
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
                title={ data ? 'Update Tender' : 'Upload Tender'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="tender-form">{data?'Update':'Save'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="tender-form" onSubmit={handleSubmit}>
                    <Box my="20px">
                        <Input error={errors?.title?.message} label="Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
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
                    <Box>
                        <Input d="none" file  label="Upload PDF" error={errors?.file?.message} fileName={state?.file?.preview|| ''} ref={fileRef} onClick={() => selectFile()} onChange={(e) => handleFileChange('file', e)} />
                    </Box>
                </form>
            </Drawer> 
    )
}
export default TenderForm