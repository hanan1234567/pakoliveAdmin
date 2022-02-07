import { useState } from "react"
import { useDispatch } from 'react-redux'
import {usersAction } from '../../redux/actions'
import ChapterForm from "./ChapterForm"
import TopicForm from "./TopicForm"
import VideoForm from "./VideoForm"
import {useBoolean,useToast} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import {Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from "@chakra-ui/react"
import { ListItem, UnorderedList } from "@chakra-ui/react"
import {VStack,HStack,Text,Button,ButtonGroup,Image,Spacer} from '@chakra-ui/react'
import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow} from '@chakra-ui/react'

import { Loader} from '../../ui-elements'

function Chapters()
{
    const toast=useToast();
    const dispatch = useDispatch()
    const [loading] = useBoolean(false)
    //add chapter 
    const [open, setOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    //add topic
    const [openTopicForm, setOpenTopicForm] = useBoolean(false)
    const [topicEditable, setTopicEditable] = useState(null)
    //add video
    const [openVideoForm, setVideoForm] = useBoolean(false)
     // const {chapters} = useSelector(state => state.chapters)
     const  chapters=[
        {_id:'12345',title:"chapter 1",description:"Intro to chemistry and its branches"},
        {_id:'12342',title:"chapter 2",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"chapter 4",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"chapter 5",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"chapter 6",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"chapter 7",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"chapter 8",description:"Intro to chemistry and its branches"},
    ]
    const  topics=[
        {_id:'12345',title:"topic 1",description:"Intro to chemistry and its branches"},
        {_id:'12342',title:"topic 2",description:"Intro to chemistry and its branches"},
        {_id:'12341',title:"topic 3",description:"Intro to chemistry and its branches"}
    ]
    const handleEdit = (obj) => {
        setEditable(obj)
        setOpen.on()
    }
    const handleTopicEdit = (obj) => {
        setTopicEditable(obj)
        setOpenTopicForm.on()
    }
    const deleteItem = async(id) => {
        let result = await window.confirm('Do you really want to remove this chapter?', 'Confirm');
        if(result){
            dispatch(usersAction.remove(id))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
    } 
   return (
    <VStack w='100%' h='100vh' overflowY='auto' alignItems='flex-start' p={5} >
    {
        loading? <Loader/>:
         <Tabs w='100%'>
            <TabList>
                <Tab>Content</Tab>
                <Tab>Settings</Tab>
            </TabList>
            <TabPanels>
                <TabPanel px={0}>
                    {
                         chapters?.length===0?
                         <VStack bg='white' w='100%' p={4}>
                            {/* <Icon fontSize="50px" color="brand.500" name="ios-add" /> */}
                            <Image boxSize='150px' src='https://d31kydh6n6r5j5.cloudfront.net/uploads/sites/291/2020/02/1488104.png?resize=800,800'/>
                            <Text fontSize="xl">Start Your Subject by adding chapters</Text>
                            <Button size='sm' onClick={setOpen.on}>Add Chapters</Button>
                        </VStack>:
                        <Accordion>
                            {
                                chapters?.map((value,i)=>{
                                    return (
                                        <AccordionItem key={i} bg='white' borderWidth='thin' mb={2} draggable="true">
                                            <AccordionButton>
                                                <HStack w='100%'>
                                                    <HStack>
                                                        <ion-icon name="move-outline" onClick={()=>{alert("drag")}}></ion-icon>
                                                        <Text fontSize='md'>{value.title}</Text>
                                                    </HStack>
                                                    <Spacer/>
                                                    <HStack>
                                                        <ion-icon name="create-outline" onClick={()=>{handleEdit(value)}}></ion-icon>
                                                        <ion-icon name="remove-circle-outline" onClick={()=>{deleteItem(value._id)}}></ion-icon>
                                                        <AccordionIcon />
                                                    </HStack>
                                                </HStack>
                                            </AccordionButton>
                                            <AccordionPanel>
                                                <Accordion size='sm'>
                                                    {
                                                        topics?.map((topic,j)=>{
                                                            return (
                                                                <AccordionItem key={j} borderWidth='thin'  mb={2}>
                                                                    <AccordionButton>
                                                                        <HStack w='100%'>
                                                                            <HStack>
                                                                                <Text fontSize='md'>{topic?.title}</Text>
                                                                            </HStack>
                                                                            <Spacer/>
                                                                            <HStack>
                                                                                <ion-icon name="create-outline" onClick={()=>{handleTopicEdit(topic)}}></ion-icon>
                                                                                <ion-icon name="remove-circle-outline" onClick={()=>{deleteItem(value._id)}}></ion-icon>
                                                                                <AccordionIcon />
                                                                            </HStack>
                                                                        </HStack>
                                                                    </AccordionButton>
                                                                    <AccordionPanel borderTopWidth='thin'>
                                                                        <UnorderedList>
                                                                            <ListItem><HStack><Text fontSize='sm'>types of bio </Text><ion-icon name="create-outline"></ion-icon><ion-icon name="remove-circle-outline"></ion-icon></HStack></ListItem>                                  
                                                                            <ListItem><HStack><Text fontSize='sm'>quiz no 1 </Text><ion-icon name="create-outline"></ion-icon><ion-icon name="remove-circle-outline"></ion-icon></HStack></ListItem>                                  
                                                                        </UnorderedList>
                                                                        <Popover placement='top'>
                                                                            <PopoverTrigger>
                                                                                <Button size='sm' variant='outline' mt={2}>Add Activity</Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent>
                                                                                <PopoverArrow />
                                                                                <PopoverBody>
                                                                                    <Tabs>
                                                                                        <TabList>
                                                                                            <Tab>Media</Tab>
                                                                                            <Tab>Questionnairs</Tab>
                                                                                        </TabList>

                                                                                        <TabPanels>
                                                                                            <TabPanel>
                                                                                                <HStack spacing={5}>
                                                                                                    <VStack cursor='pointer' onClick={setVideoForm.on}>
                                                                                                        <ion-icon name="videocam-outline"></ion-icon>
                                                                                                        <Text fontSize='xs'>Video</Text>
                                                                                                    </VStack>
                                                                                                    <VStack cursor='pointer'>
                                                                                                        <ion-icon name="document-text-outline"></ion-icon>
                                                                                                        <Text fontSize='xs'>Document</Text>
                                                                                                    </VStack>
                                                                                                    <VStack cursor='pointer'>
                                                                                                        <ion-icon name="newspaper-outline"></ion-icon>
                                                                                                        <Text fontSize='xs'>Assessment</Text>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </TabPanel>
                                                                                            <TabPanel>
                                                                                                <HStack spacing={5}>
                                                                                                    <VStack>
                                                                                                        <ion-icon name="help-outline"></ion-icon>
                                                                                                        <Text fontSize='xs'>Quiz</Text>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </TabPanel>
                                                                                        </TabPanels>
                                                                                    </Tabs>
                                                                                </PopoverBody>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </AccordionPanel>
                                                                </AccordionItem>
                                                            )
                                                        })
                                                    }
                                                    <HStack py={2}>
                                                        <Spacer/>
                                                        <ButtonGroup>
                                                            <Button size='sm' onClick={setOpenTopicForm.on}>Add Topic</Button>
                                                            <Button size='sm' onClick={setOpen.on}>Chapter Activities</Button>
                                                        </ButtonGroup>
                                                        {/* <Spacer/> */}
                                                    </HStack>
                                                </Accordion>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    )
                                })
                            }
                            <HStack py={2}>
                                <Spacer/>
                                <ButtonGroup>
                                 <Button size='sm' onClick={setOpen.on}>Add Chapters</Button>
                                 <Button size='sm'>Chapter Assessment</Button>
                                 <Button size='sm'>Final Assessment</Button>
                                </ButtonGroup>
                             
                            </HStack>
                        </Accordion>
                    }
                </TabPanel>
                <TabPanel>
                   <p bg='white'>Settings</p>
                </TabPanel>
            </TabPanels>
         </Tabs>
    }
    <ChapterForm open={open} data={editable} onClose={()=>{setEditable(null);setOpen.off()}} />
    <TopicForm open={openTopicForm} data={topicEditable} onClose={()=>{setTopicEditable(null);setOpenTopicForm.off()}} />
    <VideoForm open={openVideoForm} data={null} onClose={()=>{setVideoForm.off()}} />
    </VStack>
   )
}
export default Chapters