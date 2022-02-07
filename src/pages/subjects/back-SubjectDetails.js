import React, {useEffect, useState} from 'react'
import { Box, useBoolean, HStack, Heading, IconButton, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux'
import { subjectsAction } from '../../redux/actions'
import { Loader, Icon } from '../../ui-elements'
import {useAbility} from '../../hooks'
import { useNavigate } from 'react-router-dom'

const SubjectDetails = () => {
    const navigate = useNavigate()
    const ability = useAbility()
    const {subject_id} = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useBoolean(false)
    const { subject } = useSelector(state => state.subjects)
    const [chapters, setChapters] = useState(subject?.chapters || [])

    useEffect(() => {        
        setLoading.on()
        dispatch((subjectsAction.details(subject_id)))
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
            })
    }, [subject_id])

    console.log("Subject", subject)

  
    const reorder = (list, startIndex, endIndex) => {
        console.log("list:",list)
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

      const onDragEnd=(result)=>{
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
          } else {
            let newSourceSubItems = [...sourceSubItems];
            const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
      
            let newDestSubItems = [...destSubItems];
            newDestSubItems.splice(destIndex, 0, draggedItem);
            newItems = newItems.map(item => {
              if (item._id === sourceParentId) {
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
        <Box>
            {loading && <Loader />}
            <HStack w='100%' px="5" py="4">
                <Icon fontSize="32px" color="gray.600" mr="5" name="ios-arrow-round-back" cursor="pointer" onClick={() => navigate(-1)} />
                <Heading size="md">{subject?.title}</Heading> 
                
                {
                    ability.can('create:own', 'subjects') &&
                    <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />
                }                
            </HStack>
            <Box p="5" pl="4em">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="dropcontainer" type="droppableItem">
                        {
                            (provided) => (
                            <Box ref={provided.innerRef}>
                                {provided.placeholder}
                                {
                                    chapters.map((chapter, c) =>
                                    <Draggable key={c} draggableId={chapter._id} index={c}>
                                        {
                                            (provided) => (
                                                <Box ref={provided.innerRef} {...provided.draggableProps} my="5" >
                                                    <HStack bg="white" px="5" py="2">
                                                        <Box {...provided.dragHandleProps} mr="3"><Icon fontSize="20px" color="gray.400" name="ios-reorder"/></Box>
                                                        <Heading size='sm'>{chapter.title}</Heading>
                                                    </HStack>
                                                    {
                                                        chapter.topics?.length > 0 &&
                                                        <Droppable droppableId={chapter._id} type={`droppableSubItem`}>
                                                            {
                                                                (provided2) => (                                                                    
                                                                        <Box ref={provided2.innerRef} bg="gray.400">
                                                                        {provided2.placeholder}
                                                                        {
                                                                            <Box>
                                                                            { chapter.topics.map((topic, t) =>
                                                                                <Draggable key={t} draggableId={topic._id} index={t}>
                                                                                    {
                                                                                        (provided3) =>(
                                                                                            <Box ref={provided3.innerRef} {...provided3.draggableProps}>
                                                                                                <HStack bg="gray.50" px="5" py="2">                                                                                                    
                                                                                                    <Box {...provided3.dragHandleProps} mr="3"><Icon fontSize="20px" color="gray.400" name="ios-reorder"/></Box>
                                                                                                    <Box>
                                                                                                        <Heading size='xs' fontWeight="400">{topic.title}</Heading>
                                                                                                    </Box>
                                                                                                </HStack>
                                                                                            </Box>
                                                                                        )
                                                                                    }
                                                                                </Draggable>
                                                                            )}
                                                                            </Box>
                                                                        }
                                                                        </Box>
                                                                )
                                                            }
                                                        </Droppable>
                                                    }                                                    
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
            </Box>
            
        </Box>
    )
}

export default SubjectDetails