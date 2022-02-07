import React,{useState,useEffect} from "react"
import {galleryAction} from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast, Image, VStack,Heading,FormLabel, SimpleGrid} from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'


const ViewGallery= ({open,data, onClose}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState([])
    const [errors, setErrors] = useState(null)
    const handleFileChange = (name, e,i) => {
        let reader = new FileReader();
        let file = e.target.files[0];   
        reader.onloadend = () => {
            state[i][name]={file,preview:reader.result}
            setState([...state])       
        }
        if(file)
        reader.readAsDataURL(file)
    }
    const addImage=()=>{
        setState([...state,{image:{file:'',preview:''}}])
    }
    useEffect(() => {
        if(data && open){
            let temp=data?.images?.map((image)=>{
               return {_id:image._id,image:{file:'',preview:image.original.url}}
            })
            setState([...temp])       
        }
    }, [data, open])

    const handleClose = () => {
        setState([])
        setErrors(null)
        onClose()
    }

    const handleSubmit = (i) => {
        setSubmitting.on()
        setErrors(null)
        let formData = new FormData()
        formData.append(`_id`,state[i]._id)
        formData.append(`image`, state[i].image.file||'')
        // for (let i = 0; i < state.length; i++) {
        //     formData.append(`image`, photos[i])
        //     formData.append(`image`, photos[i])
        // }

        let action = galleryAction.addGalleryImage(formData,data?._id)
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
                title={data?.title}
                size='md'
                >
                    <Button onClick={addImage} size='sm' rounded='sm' mb={3}>Add Image</Button> 
                    <SimpleGrid w='100%' columns={3} spacing={5}>
                      {
                          state?.map((data,d)=>
                            <VStack key={'image-'+d} alignItems='center'>
                                <FormLabel className="center" htmlFor={'image-'+d} bg='gray.200' height='100px' w='120px'>
                                  <Image maxW='100%' maxH='100%' objectFit='cover' rounded="0" src={data?.image?.preview || '/images/image.png'} />
                                </FormLabel>
                                <Input id={'image-'+d} d="none" type="file" onChange={(e) => handleFileChange('image', e,d)}/>
                                <Button isLoading={submitting} size='sm' rounded='sm' onClick={()=>{handleSubmit(d)}}>{data?._id?'Update':'Save'}</Button>
                            </VStack>
                          )
                      }
                    </SimpleGrid>
            </Drawer> 
    )
}
export default ViewGallery