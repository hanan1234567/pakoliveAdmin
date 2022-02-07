import React,{useState,useEffect} from "react"
import {subjectsAction, usersAction } from '../../redux/actions'
import { useSelector,useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack, useToast, Image} from '@chakra-ui/react'
import { Drawer, Input, Select} from '../../ui-elements'
import { public_path } from '../../config.json'

const SubjectForm= ({open,data, onClose, ...props}) => {

    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
    const {classes} = useSelector(state => state.subjects)
    const {users} = useSelector(state => state.users)
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
        
        dispatch(usersAction.get())     
        
        // eslint-disable-next-line
    }, [open])

    useEffect(() => {
        if(data && open){
            setState({
                ...data,
                assignedTo: data?.assignedTo?._id || '',
                class: data?.class?._id || '',
                thumbnail: {
                    file: null,
                    preview: public_path + data?.thumbnail
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
        formData.append('description', state?.description || '')
        formData.append('class', state?.class || '')
        formData.append('assignedTo', state?.assignedTo || '')
        formData.append('thumbnail', state?.thumbnail?.file || '')
        
        let action = data ? subjectsAction.update(formData, data?._id) : subjectsAction.add(formData)
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
                title={ data ? 'Update Subject' : 'Create New Subject'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} type="submit" form="subject-form">Submit</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="subject-form" onSubmit={handleSubmit}>
                    
                    <Image objectFit='cover' boxSize='150px' rounded="0" src={ state?.thumbnail?.preview || 'https://bit.ly/broken-link'} onClick={(e) => selectFile() }  />
                    <Input d="none" type="file" ref={fileRef} onChange={(e) => handleFileChange('thumbnail', e)} />

                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Subject Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5"  my="20px"  alignItems="flex-start">                            
                        <Select error={errors?.class?.message}  label="Class" value={state?.class || ''} onChange={(e) => handleInputChange('class', e.target.value )}>
                            <option value="">Select...</option>
                            {
                                classes.map((cls, c) =>
                                <option key={c} value={cls._id}>{cls.title}</option>
                                )
                            }
                        </Select>
                        <Select error={errors?.assignedTo?.message}  label="Assigned To" value={state?.assignedTo || ''} onChange={(e) => handleInputChange('assignedTo', e.target.value )}>
                            <option value="">Select...</option>
                            {
                                users.map((user, u) =>
                                <option key={u} value={user._id}>{user.first_name} {user.last_name}</option>
                                )
                            }
                        </Select>
                    </HStack>

                </form>

            </Drawer> 
    )
}
export default SubjectForm