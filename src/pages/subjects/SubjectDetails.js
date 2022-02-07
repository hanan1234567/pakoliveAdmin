import React, {useEffect, useState} from 'react'
import './index.css'
import { Box, useBoolean, HStack, VStack, Heading, Button, Tooltip, Text,useToast, Spacer} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { subjectsAction } from '../../redux/actions'
import { Loader, Icon, Popover, Alert } from '../../ui-elements'
import {Can} from '../../hooks'
import { useNavigate } from 'react-router-dom'
import ChapterForm from './ChapterForm';
import TopicForm from './topicForm'
import QuizForm from './quizForm';
import ViewQuizForm from './viewQuizForm';
import ContentForm from './contentForm';
const SubjectDetails = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const {subject_id} = useParams()
    const [open, setOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const [openTopic, setOpenTopic] = useBoolean(false)
    const [editableTopic, setEditableTopic] = useState(null)
    const[chapID,setChapID]=useState(null)
    const [openContent, setOpenContent] = useBoolean(false)
    const [editableContent, setEditableContent] = useState(null)
    const [contentType, setContentType] = useState(null)
    //view quiz
    const [openViewQuiz, setOpenViewQuiz] = useBoolean(false)
    const [IDs,setIDs]=useState(null)

    const [openQuiz, setOpenQuiz] = useBoolean(false)
    const [editableQuiz, setEditableQuiz] = useState(null)


    const dispatch = useDispatch()
    const [loading, setLoading] = useBoolean(false)
    const { subject } = useSelector(state => state.subjects)
    const [chapters, setChapters] = useState([])
    useEffect(() => {
        dispatch(subjectsAction.clear_subject())    
        // eslint-disable-next-line
    }, [])
    useEffect(() => {           
        setLoading.on()
        dispatch((subjectsAction.details(subject_id)))
            .then((res) => {
                setChapters(res?.subject?.chapters)
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
            })
        // eslint-disable-next-line
    }, [])
    const editChapter=(data)=>{
        setEditable(data)
        setOpen.on()
    }
    const editTopic=(data,chapterID)=>{
        setEditableTopic(data)
        setChapID(chapterID)
        setOpenTopic.on()
    }
    const deleteChapter= async(id) => {
        let result = await window.confirm('Do you really want to remove this Chapter?', 'Confirm');
        if(result){
            dispatch(subjectsAction.deleteChapter(id))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                    setChapters(subject?.chapters)
                        })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
    }    
    const deleteTopic= async(topicID,chapterID) => {
        let result = await window.confirm('Do you really want to remove this Topic?', 'Confirm');
        if(result){
            dispatch(subjectsAction.deleteTopic(topicID,chapterID))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                    setChapters(subject?.chapters)
                        })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
    }  
    const editContent=(data,contentType)=>{
        if(contentType==='QUIZ')
        {
            setEditableQuiz(data)
            setOpenQuiz.on()
            return
        }
        setEditableContent(data);
        setOpenContent.on()
    }
    const removeContent=async (chapterID,topicID,contentID)=>{
        let result = await window.confirm('Do you really want to remove this Topic Content?', 'Confirm');
        if(result){
            dispatch(subjectsAction.deleteContent(chapterID,topicID,contentID))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd=(result) => {
        if (!result.destination) {
          return;
        }
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;

        if (result.type === "droppableItem") {
            const items = reorder(chapters, sourceIndex, destIndex);
            setChapters(items)
        } else if (result.type === "droppableSubItem") {
            const itemSubItemMap = chapters.reduce((acc, item) => {
            acc[item._id] = item.topics;
            return acc;
            }, {});
        
            const sourceParentId = result.source.droppableId;
            const destParentId = result.destination.droppableId;
      
            const sourceSubItems = itemSubItemMap[sourceParentId];
            const destSubItems = itemSubItemMap[destParentId];
      
            let newItems = [...chapters];
      
            /* In this case subItems are reOrdered inside same Parent */
            if (sourceParentId === destParentId) {
                const reorderedSubItems = reorder(
                    sourceSubItems,
                    sourceIndex,
                    destIndex
                );
                newItems = newItems.map(item => {
                if (item._id === sourceParentId) {
                    item.topics = reorderedSubItems;
                }
                return item;
                });
                setChapters(newItems);
            } 
            else {
                let newSourceSubItems = [...sourceSubItems];
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);      
                let newDestSubItems = [...destSubItems];
                newDestSubItems.splice(destIndex, 0, draggedItem);
                newItems = newItems.map(item => {
                    if (item._id === sourceParentId){
                        item.topics = newSourceSubItems;
                    } else if (item._id === destParentId) {
                        item.topics = newDestSubItems;
                    }
                return item;
                });
                setChapters(newItems);
            }
        }
    }

    return(
        <Box h='100vh' overflowY='auto'>
            {loading && <Loader />}
            <HStack w='100%' px={5} py={2} position='sticky' top={0} bg='white' zIndex={99}>
                <Icon fontSize="32px" color="gray.600" mr={3} name="ios-arrow-round-back" cursor="pointer" onClick={() => navigate(-1)} />
                <Heading size="md">{subject?.title}</Heading>                                 
            </HStack>
            <Box px={5} py={2}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="dropcontainer" type="droppableItem">
                        {
                            (provided) => (
                            <Box ref={provided.innerRef}>
                                {provided.placeholder}
                                {
                                    chapters?.length<1?
                                    <Alert status="info">
                                      Please click on the Add new Chapter button to Add the subjects
                                    </Alert>
                                    :
                                    chapters?.map((chapter, c) =>
                                    <Draggable key={chapter._id} draggableId={chapter._id} index={c}>
                                        {
                                            (provided) => (
                                                <Box ref={provided.innerRef} {...provided.draggableProps} my="5" shadow="md" >
                                                    <HStack bg="white" px="5" py="1">
                                                        <Box {...provided.dragHandleProps} mr="3">
                                                            <Icon fontSize="20px" color="gray.400" name="ios-reorder"/>
                                                        </Box>
                                                        <Heading size='sm' fontWeight={500}>{chapter.title}</Heading>
                                                        <Spacer/>
                                                        <HStack>
                                                            <Icon fontSize="18px" cursor='pointer' color="green.500" name="md-add" onClick={()=>{setChapID(chapter._id);setOpenTopic.on()}}/>
                                                            <Icon fontSize="18px" color="brand.500" name="ios-create" onClick={()=>{editChapter(chapter)}}/>
                                                            <Icon fontSize="18px" color="red.400" name="ios-trash" onClick={()=>{deleteChapter(chapter._id)}}/>
                                                        </HStack>
                                                    </HStack>
                                                        <Droppable droppableId={chapter._id} type={`droppableSubItem`}>
                                                            {
                                                                (provided2) => (                                                                    
                                                                        <Box ref={provided2.innerRef} bg="gray.100">
                                                                        {provided2.placeholder}
                                                                        {
                                                                            <VStack spacing={0}>
                                                                                <Box w='100%'>
                                                                                { 
                                                                                //   chapter?.topics?.length<1?<Alert status="info" w='400px' bg='white'>Click on Add Button to Add Topic</Alert>:
                                                                                  chapter?.topics?.map((topic, t) =>
                                                                                    <Draggable key={topic._id} draggableId={topic._id} index={t}>
                                                                                        {
                                                                                            (provided3) =>(
                                                                                                <Box ref={provided3.innerRef} {...provided3.draggableProps} mx={4} my={3}> 
                                                                                                    <VStack w='100%' spacing={0}>
                                                                                                        <HStack spacing={2} w='100%' px={3} py={1} bg='white'>
                                                                                                            <Box {...provided3.dragHandleProps}>
                                                                                                                <Icon fontSize="20px" color="gray.400" name="ios-reorder"/>
                                                                                                            </Box>
                                                                                                            <HStack>
                                                                                                                <Icon name="md-paper" />
                                                                                                                <Heading size='sm' fontWeight={500}>{topic?.title}</Heading>
                                                                                                            </HStack>
                                                                                                            <Spacer/>
                                                                                                            <HStack>
                                                                                                                <Tooltip label="Add Content" placement="right">
                                                                                                                    <Popover
                                                                                                                        title="Add Contents"
                                                                                                                        actions={
                                                                                                                            <HStack flexWrap="wrap" spacing={3}>
                                                                                                                                <Button w="21%" variant="unstyled" h="auto" bg="gray.50" p="4" py="2" _hover={{ bg: 'gray.100' }} text={{ fontWeight: '400' }} onClick={()=>{setContentType({type:'VIDEO',topicID:topic._id,chapterID:chapter._id});setOpenContent.on()}}>
                                                                                                                                    <Icon name="md-videocam" />
                                                                                                                                    <Text fontSize="sm" fontWeight="normal">Video</Text>
                                                                                                                                </Button>
                                                                                                                                <Button w="21%" variant="unstyled" h="auto" bg="gray.50" p="4" py="2" _hover={{ bg: 'gray.100' }} text={{ fontWeight: '400' }} onClick={()=>{setContentType({type:'TEXT',topicID:topic._id,chapterID:chapter._id});setOpenContent.on()}}>
                                                                                                                                    <Icon name="md-paper" />
                                                                                                                                    <Text fontSize="sm" fontWeight="normal">Text</Text>
                                                                                                                                </Button>
                                                                                                                                <Button w="21%" variant="unstyled" h="auto" bg="gray.50" p="4" py="2" _hover={{ bg: 'gray.100' }} text={{ fontWeight: '400' }} onClick={()=>{setContentType({type:'QUIZ',topicID:topic._id,chapterID:chapter._id});setOpenQuiz.on()}}>
                                                                                                                                    <Icon name="ios-help-circle" />
                                                                                                                                    <Text fontSize="sm" fontWeight="normal">Quiz</Text>
                                                                                                                                </Button>
                                                                                                                                <Button w="21%" variant="unstyled" h="auto" bg="gray.50" p="4" py="2" _hover={{ bg: 'gray.100' }} text={{ fontWeight: '400' }} onClick={()=>{setContentType({type:'FILE',topicID:topic._id,chapterID:chapter._id});setOpenContent.on()}}>
                                                                                                                                    <Icon name="ios-attach" />
                                                                                                                                    <Text fontSize="sm" fontWeight="normal">File</Text>
                                                                                                                                </Button>
                                                                                                                            </HStack>
                                                                                                                        }
                                                                                                                    >
                                                                                                                    <Icon fontSize="18px" cursor='pointer' color="green.500" name="ios-more"/>
                                                                                                                    </Popover>
                                                                                                                </Tooltip>
                                                                                                                <Icon fontSize="18px" color="brand.500" name="ios-create" onClick={()=>{editTopic(topic,chapter._id)}}/>
                                                                                                                <Icon fontSize="18px" color="red.400" name="ios-trash" onClick={()=>{deleteTopic(topic._id,chapter._id)}}/>
                                                                                                            </HStack>
                                                                                                        </HStack>
                                                                                                        <VStack className='contents' bg='white' spacing={1} alignItems='flex-start' w='100%' px={5} py={1}>
                                                                                                            {
                                                                                                                topic?.contents.length<1?
                                                                                                                <Alert status="info" w='400px' bg='white'>Click on Add Button to Add Topic Contents</Alert>
                                                                                                                :
                                                                                                                topic?.contents?.map((content,c)=> <HStack key={c} spacing={3} className='content'>
                                                                                                                    {
                                                                                                                        content?.contentType==='VIDEO'?<Box width='17px'><Icon fontSize="16px" name="md-videocam" /></Box>:
                                                                                                                        content?.contentType==='FILE'?<Box  width='17px'><Icon fontSize="16px" name="md-document" /></Box>:
                                                                                                                        content?.contentType==='TEXT'?<Box  width='17px'><Icon fontSize="16px" name="md-text" /></Box>:
                                                                                                                        <Box  width='17px'><Icon fontSize="20px" name="md-help" /></Box>
                                                                                                                    }
                                                                                                                    <Heading  fontSize='sm' fontWeight={400} pr={5}>{content?.title}</Heading>
                                                                                                                    <HStack className='content-actions'>
                                                                                                                        {content?.contentType==='QUIZ' && <Icon fontSize="16px" name="md-list-box" onClick={()=>{setIDs({chapterID:chapter._id,topicID:topic._id,subjectID:subject._id,quizID:content?.content?._id});setOpenViewQuiz.on()}}/>}
                                                                                                                        <Icon fontSize="16px" color="brand.500" name="md-create" onClick={()=>{setContentType({type:content?.contentType,topicID:topic._id,chapterID:chapter._id});editContent(content,content.contentType)}} />
                                                                                                                        <Icon fontSize="16px" color="red.500" name="ios-trash" onClick={()=>{removeContent(chapter?._id,topic?._id,content?._id)}}/>
                                                                                                                    </HStack>
                                                                                                                </HStack>)
                                                                                                            }
                                                                                                        </VStack>    
                                                                                                    </VStack>
                                                                                                </Box>
                                                                                            )
                                                                                        }
                                                                                    </Draggable>
                                                                                )}
                                                                                </Box>
                                                                            </VStack>
                                                                        }
                                                                        </Box>
                                                                )
                                                            }
                                                        </Droppable>
                                                                                                     
                                                </Box>
                                            )
                                        }
                                    </Draggable>
                                    )
                                }
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
                <HStack py="5">
                    <Can I="create:own" a="subjects">
                        <Button rounded="sm" size='sm' onClick={setOpen.on}>Add New Chapter</Button>
                    </Can>
                </HStack>
            </Box>
            <ChapterForm open={open} data={editable} subject={subject?._id} onClose={() => { setEditable(null); setOpen.off();setChapters(subject?.chapters)}} />
            <TopicForm open={openTopic} data={editableTopic} chapterID={chapID}   onClose={()=>{setEditableTopic(null);setChapID(null);setOpenTopic.off();setChapters(subject?.chapters)}}/>
            <QuizForm open={openQuiz} data={editableQuiz} contentType={contentType}   onClose={()=>{setEditableQuiz(null); setOpenQuiz.off()}}/>
            <ContentForm open={openContent} data={editableContent} contentType={contentType}   onClose={()=>{setEditableContent(null); setOpenContent.off()}}/>
            <ViewQuizForm open={openViewQuiz} IDs={IDs} onClose={()=>{setIDs(null); setOpenViewQuiz.off()}}/>
          
        </Box>
    )
}

export default SubjectDetails