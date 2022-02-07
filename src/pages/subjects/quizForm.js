import React,{useState,useEffect} from "react"
import {subjectsAction} from '../../redux/actions'
import {useDispatch } from 'react-redux'
import {useBoolean, Button, Box, HStack,VStack, useToast} from '@chakra-ui/react'
import { Drawer, Input,QSwitch} from '../../ui-elements'
const QuizForm= ({open,data,contentType,onClose}) => {

console.log("data:",data)
    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState(null)
    const [errors, setErrors] = useState(null)
    console.log("data:",data)
    const handleInputChange= (name,value) => {
        if(name==='Easy'||name==='Medium'||name==='Hard')
        {
            setState((state)=>{
                state.difficulty[name]=value
                return {...state}
            })
            return
        }
        setState({...state,[name]:value})
        console.log(state)
    }
    useEffect(() => {
        if(open){
            setState({type:contentType?.type,difficulty:{Easy:40,Medium:40,Hard:20},duration:'90',passingGrade:'45',random:true})     
        }   
    }, [open,contentType])
    useEffect(() => {
        if(data && open){
            setState({...data?.content,...data,content:data?.content?._id})            
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
        let action = data ? subjectsAction.updateContent(state,false,contentType.topicID,contentType.chapterID) : subjectsAction.addContent(state,false,contentType.topicID,contentType.chapterID)
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
                title={ data ? 'Update Quiz' : 'Create New Quiz'}
                footer={
                    <HStack>
                        <Box>
                            <Button rounded='sm' isLoading={submitting} type="submit" form="subject-form">{data?'Update':'Submit'}</Button>
                        </Box>
                    </HStack>
                }
                >
                <form id="subject-form" onSubmit={handleSubmit}>

                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input error={errors?.title?.message} label="Quiz Title" value={state?.title || ''} onChange={(e) => handleInputChange('title', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <Input textarea  error={errors?.description?.message} label="Quiz Description" value={state?.description || ''} onChange={(e) => handleInputChange('description', e.target.value )} />
                    </HStack>
                    <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <QSwitch input label='Quiz Duration(min)' value={state?.duration || ''} onChange={(e) => handleInputChange('duration',e.target.value )}/>
                        <QSwitch input label='Passing Grade(%)' value={state?.passingGrade || ''}  onChange={(e) => handleInputChange('passingGrade',e.target.value )}/>
                        <QSwitch radio label='Random Questions' value={state?.random || ''}  onChange={(e) => handleInputChange('random',e.target.checked )}/>
                    </HStack>
                    <VStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">
                        <QSwitch label='Difficulty Level(%)'/>
                        <HStack>
                            <QSwitch input value={state?.difficulty?.Easy} onChange={(e) => handleInputChange('Easy',e.target.value )} placeholder='Easy'/>
                            <QSwitch input value={state?.difficulty?.Medium} onChange={(e) => handleInputChange('Medium',e.target.value )} placeholder='Medium'/>
                            <QSwitch input value={state?.difficulty?.Hard} onChange={(e) => handleInputChange('Hard',e.target.value )} placeholder='Hard'/>
                        </HStack>
                    </VStack>
                </form>

            </Drawer> 
    )
}
export default QuizForm