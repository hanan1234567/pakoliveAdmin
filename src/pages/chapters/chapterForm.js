import React,{useState,useEffect} from "react"
import {usersAction } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import {useBoolean,FormControl,FormLabel,FormHelperText,Input,Textarea,Button,IconButton,Box, VStack, Spacer,useToast} from '@chakra-ui/react'
import {Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton} from "@chakra-ui/react"
import { Icon} from '../../ui-elements'

const ChapterForm=function({open,data,onClose})
{
    const toast=useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)



    const handleInputChange=(name,value)=>
    {
        setState({...state,[name]:value})
    }
    useEffect(() => {
        if(data && open){
            setState(data)
        }
    }, [data, open])
    const handleSubmit = () => {  
        setSubmitting.on()
        let action = data ? usersAction.update(state) : usersAction.add(state)
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
        <Drawer isOpen={open} placement="right" size='md' onClose={()=>{onClose()}}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Add Chapter</DrawerHeader>
                <DrawerBody py={4}>
                    <VStack spacing={7}>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormHelperText  mb={2}>Keep it short, informative</FormHelperText>
                            <Input type="text" id='title' error={errors?.title?.message} defaultValue={state?.title||''} onChange={(e) => handleInputChange('title', e.target.value )}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Content Description
                            </FormLabel>
                            <FormHelperText  mb={2}>
                                Provide a concise description for the subject.Not all content templates present this description. So you may select not to provide it.
                            </FormHelperText>
                            <Textarea defaultValue={state?.description||''} error={errors?.description?.message} onChange={(e) => handleInputChange('description', e.target.value )}>
                            </Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                Upload a file
                            </FormLabel>
                            <FormHelperText mb={2}>
                                Supported Formats .doc .docx .xls .xlsx .ppt .pptx .pdf .png .jpeg .gif
                            </FormHelperText>
                            <FormLabel htmlFor="upload-file" w='100px'>
                                <Box style={{width:'60px',height:'60px',border:'1px dotted black',display:'flex',justifyContent:"center",alignItems:"center",overflow:'hidden',cursor:'pointer'}}>
                                <IconButton colorScheme="gray" variant="ghost" rounded="full" size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />
                                </Box>
                            </FormLabel>
                            <Input type="file" id='upload-file' defaultValue={state?.file||''} error={errors?.file?.message} onChange={(e) => {handleInputChange('file', e.target.value )}} style={{display:'none'}}/>
                       </FormControl>
                    </VStack>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                    <Button variant="outline" onClick={()=>{onClose()}} size='sm'>Cancel</Button>
                    <Spacer/>
                    <Button size='sm'  isLoading={submitting} onClick={handleSubmit}>{data?'Update':'Save'}</Button>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    )
}
export default ChapterForm