import React,{useState,useEffect} from "react"
import {questionBankAction } from '../../redux/actions'
import { useDispatch,useSelector} from 'react-redux'
import {useAbility} from '../../hooks'
import {useBoolean, Button,Text, Box, HStack, useToast,Heading, VStack,Tag,TagCloseButton,TagLabel,Checkbox,Spacer,Switch} from '@chakra-ui/react'
import { Drawer,Icon,TextEditor,Input,Level} from '../../ui-elements'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertDescription,
  } from '@chakra-ui/react'
const ViewQuizForm= ({open,IDs, onClose}) => {
    const ability = useAbility()
    const toast= useToast();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useBoolean(false)
    const {quizQuestions,questionBankTagQuestions}=useSelector(state => state.questionBank)
    const userID=useSelector(state => state.auth.user._id)
    console.log(ability.can('create:own', 'questions'))
    //
    const [state,setState]=useState({currentQuestion:null,questions:[]})
    const [qBTagQuestions,setQBTagQuestions]=useState([])
    const [qQuestions,setQQuestions]=useState([])
    const [tags,setTags]=useState([])


    const handleInputChange=(e,key)=>{
        if(key===188)
        {
            setTags(()=>{
                let tempTag='';
                console.log(e.target.value)
                for(let i=0;i<e.target.value.length;i++)
                 {
                     if(i===e.target.value.length-1)
                     {
                        e.target.value=''
                        break;
                     }
                     tempTag+=e.target.value[i]
                 }
                return  [...tags,tempTag]
            })
        }
        else if(key===13)
        getQuestions()
        
    }
    const changeLevel=(value)=>{
        state.questions[state?.currentQuestion].difficulty=value;
        setState({...state})
    }
    const handleQuestionTags=(e,key)=>{
        if(key===13)
        {
            state.questions=state?.questions.map((question,q)=>{
                if(q===state.currentQuestion)
                question.tags=[...question.tags,e.target.value] 
                return question
            })
            setState({...state})
            e.target.value=''
        }     
    }
    const getQuestions=()=>{
        if(ability.can('read:any', 'questions'))
        dispatch(questionBankAction.getByTags({tags},IDs.quizID))
        else if(ability.can('read:own', 'questions'))
        dispatch(questionBankAction.getByTags({tags},IDs.quizID,userID))

    }
    const addQuestionFromQB=(check,q,ID)=>{
        if(check)
            setQBTagQuestions([...qBTagQuestions,questionBankTagQuestions[q]._id])
        else
        {
            let tempArr=qBTagQuestions.filter((id,q)=> id!==ID)
            setQBTagQuestions(tempArr)
        }
    }

    const addQuestion=()=>{
        setState({...state,questions:[...state.questions,{userID,subject:IDs.subjectID,chapter:IDs?.chapterID,topic:IDs?.topicID,question:'question',explaination:'',options:[' ',' '],answers:[false,false],tags:[],difficulty:'EASY'}]})    
    }
    const changeQuestion=(q)=>{
        setState({...state,currentQuestion:null})
        setState({...state,currentQuestion:q})
    }
    const answer=(check,o)=>{
        let editedQuestions=state?.questions?.filter((question,q)=>{
            if(q===state.currentQuestion)
            question.answers[o]=check
            return question
        })
        setState({...state,questions:editedQuestions})
    }
    const addOption=()=>{
        state?.questions[state?.currentQuestion].options.push('')
        state?.questions[state?.currentQuestion].answers.push(false)
        setState({...state})
    }
    const removeOption=(i)=>{
        state.questions[state?.currentQuestion].options=state?.questions[state?.currentQuestion].options.filter((_,o)=> o!==i)
        state.questions[state?.currentQuestion].answers=state?.questions[state?.currentQuestion].answers.filter((_,a)=> a!==i)
       setState({...state})
    }
    const removeQuestion=(questionIndex)=>{
        let filterQuestions=state?.questions?.filter((question,q)=> q!==questionIndex)
        setState({...state,questions:filterQuestions})
        if(questionIndex===state.currentQuestion)
        setState({...state,currentQuestion:null})
    }
    const removeQuizQuestion=(questionIndex)=>{
        let filterQuestions=qQuestions?.filter((question,q)=> q!==questionIndex)
        setQQuestions(filterQuestions)
    }
    const editQuestion=(name,value,key)=>{
        // console.log("key:",key.ops)
        // if(key.ops[0].delete)
        // return
        let editedQuestions=state?.questions?.filter((question,q)=>{
            if(q===state.currentQuestion)
            question[name]=value
            return question
        })
        setState({...state,questions:editedQuestions})
    }
    const editAnswer=(value,o)=>{
      let editedQuestions=state?.questions?.filter((question,q)=>{
        if(q===state.currentQuestion)
        question.options[o]=value
        return question
    })
    setState({...state,questions:editedQuestions})
    }
    useEffect(() => {
        if(open,IDs){
            dispatch(questionBankAction.clearTags())    
            dispatch(questionBankAction.get(IDs.quizID))
            .then((res) => {
               setQQuestions(res.questions)
            })
        }
    }, [open,IDs,dispatch])
    const handleClose = () => {
        setState({currentQuestion:null,questions:[]})
        setQBTagQuestions([])
        setQQuestions([])
        setTags([])
        onClose()
    }

    const handleSubmit = () => {
        setSubmitting.on()   
        let action = questionBankAction.add(qBTagQuestions,state?.questions,qQuestions,IDs.quizID)
        dispatch(action)
            .then((res) => {
                setSubmitting.off()       
                toast({description: res.message, status: 'success'}) 
                handleClose()       
            })
            .catch((err) => {
                toast({description: err?.message, status: 'error'})
                setSubmitting.off()
            })  
    }

    
    return (
        <Drawer
                open={open}
                onClose={handleClose}
                title={'View Quiz'}
                size='xl'
                footer={
                    <HStack>
                        <Box>
                            <Button rounded='sm' size='sm' isLoading={submitting} onClick={handleSubmit}>Save Quiz</Button>
                        </Box>
                    </HStack>
                }
                >
                    <HStack  py={2} alignItems='start' h='100%' spacing={5}>
                        <Tabs  w='50%' h='100%'  overflowY='auto' colorScheme='brand' borderRightWidth='thin' pr={1}>
                            <TabList>
                                <Tab>Question Bank</Tab>
                                {ability.can('create:own', 'questions') && <Tab>New Questions</Tab>}
                                <Tab>Quiz</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel p={0} py={2}>
                                    <VStack alignItems='flex-start'>
                                        <Input w='50%' size='sm' placeholder='Search Question By Tag From Question Bank' onKeyUp={(e) =>{e.preventDefault();handleInputChange(e,e.keyCode )}} />
                                        <HStack flexWrap='wrap'>
                                            {
                                                tags?.map((tag,t)=> 
                                                    <Tag key={t} colorScheme='brand' borderRadius='sm'>
                                                        <TagLabel>{tag}</TagLabel>
                                                        <TagCloseButton />
                                                    </Tag>)
                                            }
                                        </HStack>
                                        <VStack spacing={1} alignItems='flex-start'>
                                            {

                                                questionBankTagQuestions?.map((question,q)=> 
                                                <Checkbox colorScheme='brand' key={'questionBankTagQuestion-'+q}
                                                onChange={(e) => addQuestionFromQB(e.target.checked,q,question?._id)}
                                                >
                                                    <HStack w='100%' borderWidth='thin' px={2} cursor='pointer' bg='gray.100' >
                                                        <Text fontSize='sm' dangerouslySetInnerHTML={{ __html: question?.question }}></Text>
                                                    </HStack>
                                                </Checkbox>)
                                            }
                                            
                                            
                                        </VStack>
                                    </VStack>
                                </TabPanel>
                                {
                                    ability.can('create:own', 'questions') &&
                                    <TabPanel p={0} py={2}>
                                        <VStack alignItems='flex-start'>
                                            <Button rounded='sm' onClick={addQuestion} size='sm' mb={2}><Icon name='md-add' fontSize='18px' color='white' mr={2}/>Question</Button>
                                            {
                                                state?.questions?.map((question,q)=> 
                                                <HStack w='100%' KEY={'question-'+q} borderWidth='thin' px={2} cursor='pointer' _hover={{bg: 'gray.100'}} bg={state?.currentQuestion===q?'gray.200':''} >
                                                    <Text fontSize='sm' onClick={()=>{changeQuestion(q)}}>Question #{q+1}</Text>
                                                    <Spacer/>
                                                    <Icon name='ios-close' fontSize='18px' color='red' onClick={()=>{removeQuestion(q)}}/>
                                                </HStack>)
                                            }
                                        </VStack>
                                    </TabPanel>
                                }
                                <TabPanel p={0} py={2}>
                                    <VStack alignItems='flex-start'>
                                        {
                                           qQuestions.length>0? qQuestions?.map((question,q)=> 
                                            <HStack w='100%' key={'qQuestion-'+q} borderWidth='thin' px={2} cursor='pointer' bg='gray.100' >
                                                <Text fontSize='sm' dangerouslySetInnerHTML={{ __html: question?.question }}></Text>
                                                <Spacer/>
                                                <Icon name='ios-close' fontSize='18px' color='red' onClick={()=>{removeQuizQuestion(q)}}/>
                                            </HStack>
                                            ):
                                            <Alert status='success'>
                                                <AlertIcon />
                                                <AlertDescription display='block'>
                                                Please Add New Question or Select Questions From Question Bank
                                                </AlertDescription>
                                            </Alert>
                                        }
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {
                            state?.currentQuestion!=null?
                            <VStack w='50%' overflowY='auto' alignItems='flex-start' h='100%'>
                                <Level onChange={(value)=>{changeLevel(value)}}/>
                                <TextEditor label={'Question #'+(state?.currentQuestion+1)} value={state?.questions[state?.currentQuestion].question} onChange={(value,e)=>{editQuestion("question",value,e)}}/>
                                <TextEditor label='Explaination' value={state?.questions[state?.currentQuestion].explaination} onChange={(value,e)=>{editQuestion("explaination",value,e)}}/>
                                <Heading size='sm' w='100%' fontWeight={500}>Options:</Heading>
                                    {
                                        state?.questions[state?.currentQuestion]?.options.map((option,o)=>{
                                            return (
                                            <VStack alignItems='flex-start' key={'option-'+o}>
                                                <TextEditor label={'Option #'+ (o+1)} value={option} onChange={(value)=>{editAnswer(value,o)}}/>
                                                <HStack>
                                                    <Switch size='sm'  colorScheme="brand" isChecked={state?.questions[state?.currentQuestion]?.answers[o]} onChange={(e)=>{answer(e.target.checked,o)}}/>
                                                    {
                                                        o>1 && <Icon name='md-trash' color='red.500' fontSize={18} onClick={()=>{removeOption(o)}}/>
                                                    }
                                                </HStack>
                                            </VStack>
                                            )
                                        })
                                    }
                                <HStack>
                                    <Button size='sm' rounded='sm' onClick={addOption}>Add Option</Button>
                                </HStack>
                                <Input  label="Tags" onKeyUp={(e) =>{e.preventDefault();handleQuestionTags(e,e.keyCode )}} />
                                <HStack flexWrap='wrap'>
                                    {
                                            state?.questions[state?.currentQuestion]?.tags.map((tag,t)=>{
                                                return (
                                                    <Tag colorScheme='brand' borderRadius='sm' key={'tag-'+t}>
                                                        <TagLabel>{tag}</TagLabel>
                                                    </Tag>
                                                )
                                            })
                                    }
                                </HStack>
                            </VStack>:
                            <Alert status='success' w='50%'>
                                <AlertIcon />
                                <AlertDescription>
                                 Please Select Question
                                </AlertDescription>
                            </Alert>
                        }
                    </HStack>
                
        </Drawer> 
    )
}
export default ViewQuizForm