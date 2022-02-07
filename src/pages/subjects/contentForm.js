import React,{useState,useEffect} from "react"
import {subjectsAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast,Text, VStack} from '@chakra-ui/react'
import { Drawer, Input, Icon, TextEditor} from '../../ui-elements'
//import { public_path } from '../../config.json'

const ContentForm= ({open,data, contentType, onClose}) => {
    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
    const [file,setFile]=useBoolean(false)
    const fileRef = React.useRef()    
    const selectFile = () => {
        fileRef.current.click()
    }
    const handleFileChange = (name, e) => {
        let reader = new FileReader();
        let file = e.target.files[0]; 
        setFile.on()  
        reader.onloadend = () => {
            setState({
              ...state,
              [name]: {
                  file: file,
                  preview: reader.result
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
        console.log(open)
        if(open,contentType,setFile){
            setState({type:contentType?.type})       
            setFile.off()
            console.log("yess")
        }
        
    }, [open])

    useEffect(() => {
        if(data && open){
            // setState({
            //     ...data,
            //     thumbnail: {
            //         file: null,
            //         preview: public_path + data?.thumbnail
            //     }
            // }) 
            // if(contentType.type==='FILE')
            // setFile.on()
            // else setFile.off();        
            setState({...data})
        }
    }, [data, open])

    const handleClose = () => {
        setState({})
        setErrors(null)
        setFile.off()
        onClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var formData;
        console.log("state:",state)
        console.log("file:",file)
       // return
        if(file)
        {
            formData = new FormData()
            formData.append('title', state?.title || '')
            formData.append('type', contentType.type || '')
            formData.append('description', state?.description || '')
            formData.append('content', state?.content?.file)
        }
    console.log(state)
        setSubmitting.on()
        setErrors(null)   
        let action = data ? subjectsAction.updateContent(file?formData:state,file,contentType.topicID,contentType.chapterID) : subjectsAction.addContent(file?formData:state,file,contentType.topicID,contentType.chapterID)
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
                title={ data ? 'Update '+ contentType?.type : 'Create New '+ contentType?.type}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} rounded='sm' size='sm' type="submit" form="subject-form">Submit</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="subject-form" onSubmit={handleSubmit}>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                    {
                        contentType?.type==='VIDEO'?
                        <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                          <Input  error={errors?.description?.content} label="Video URL" leftLabel='WWW.VIMEO.COM/' value={state?.content || 'XXCV23Y'} onChange={(e) => handleInputChange('content', e.target.value )} />
                        </HStack>:
                        contentType?.type==='FILE'?
                        <VStack alignItems='flex-start'>
                            <Button rounded='sm'  size='sm' variant='outline' onClick={(e) => selectFile() }><Icon name="ios-document" color='brand.500' mr={2}/>Select File</Button>
                            <Input d="none" type="file" ref={fileRef} onChange={(e) => handleFileChange('content', e)} />
                            <Text>{state?.content?.file?.name || state?.content}</Text>
                        </VStack>:
                        <HStack>
                            <TextEditor error={errors?.description?.content} label="Text Contents" value={state?.content || ''} onChange={(value) => handleInputChange('content', value )}/>
                        </HStack>
                    }
                    

                </form>

            </Drawer> 
    )
}
export default ContentForm