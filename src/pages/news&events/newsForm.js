import React,{useState,useEffect} from "react"
import {newsAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast, Image} from '@chakra-ui/react'
import { Drawer, Input,TextEditor} from '../../ui-elements'
import { public_path } from '../../config.json'

const NewsForm= ({open,data, onClose}) => {

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
        if(data && open){
            setState({
                ...data,
                thumbnail: {
                    file: null,
                    preview: data?.thumbnail?.url
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
        formData.append('date', state?.date || '')
        formData.append('description', state?.description || '')
        formData.append('detail', state?.detail || '')
        formData.append('thumbnail', state?.thumbnail?.file || data?.thumbnail)
        if(data)
        formData.append('_id', state?._id || '')
        let action = data ? newsAction.update(formData) : newsAction.add(formData)
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
                title={ data ? 'Update News or Event' : 'Create News or Event'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} size='sm' rounded='sm' type="submit" form="news-form">{data?'Update':'Save'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="news-form" onSubmit={handleSubmit}>
                    <Image objectFit='cover' boxSize='150px' rounded="0" src={ state?.thumbnail?.preview || 'https://cdn.icon-icons.com/icons2/1993/PNG/512/frame_gallery_image_images_photo_picture_pictures_icon_123209.png'} onClick={(e) => selectFile() }  />
                    <Input d="none" type="file" ref={fileRef} onChange={(e) => handleFileChange('thumbnail', e)} />
                    <HStack my="20px">
                       <Input error={errors?.title?.message} label="Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                       <Input date error={errors?.date?.message} label="Date" value={state?.date || ''} onChange={(e) => handleInputChange('date', e.target.value )} />
                    </HStack>
                    <HStack my="20px">
                        <Input textarea  error={errors?.description?.message} label="Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                    <HStack>
                        <TextEditor error={errors?.detail?.message} label="News or Event Detail" value={state?.detail || ''} onChange={(value) => handleInputChange('detail', value )}/>
                    </HStack>
                </form>
            </Drawer> 
    )
}
export default NewsForm