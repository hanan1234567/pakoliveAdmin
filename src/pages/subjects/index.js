import React,{useState,useEffect} from "react"
import {useSelector,useDispatch } from 'react-redux'
import {subjectsAction } from '../../redux/actions'
import {useAbility} from '../../hooks'
import SubjectForm from "./subjectForm"
import ClassForm from "./ClassForm"
import { useNavigate } from 'react-router-dom'
import {useBoolean, Box, Heading,VStack,HStack,Text,Button,IconButton,useToast} from "@chakra-ui/react"
import { Loader,Icon, Alert} from '../../ui-elements'
import ClassCard from "./ClassCard"
import SubjectCard from "./SubjectCard"

const Subjects = () => {
    const navigate = useNavigate()
    const ability = useAbility()
    const [loading, setLoading] = useBoolean(false)
    const [open, setOpen] = useBoolean(false)
    const [activeClass, setActiveClass] = useState(null)
    const [classOpen, setClassOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const [classEditable, setClassEditable] = useState(null)
    const toast = useToast()
    const dispatch=useDispatch();
    const {subjects, classes} = useSelector(state => state?.subjects)
    
    const handleEdit = (obj) => {
        setEditable(obj)
        setOpen.on()
    }

    useEffect(() => {
        dispatch(subjectsAction.clear_subjects())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {          
        setLoading.on()
        dispatch(subjectsAction.get_classes())
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                console.log("Error", err)
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const deleteItem = async(id) => {
        let result = await window.confirm('Do you really want to remove this Subject?', 'Confirm');
        if(result){
            dispatch(subjectsAction.remove(id))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
    }    

    const handleClassDelete = (id) => {
        dispatch(subjectsAction.remove_class(id))
        .then((res) => {
            // toast({description: res.message, status: 'success'})
        })
        .catch((err) => {
            // toast({description: err.error, status: 'error'})
        })        
    }

    const getSubjects = (id) => {
        setLoading.on()
        setActiveClass(id)
        dispatch(subjectsAction.get(id))
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
                console.log("Error", err)
            })
    }

    console.log("Subjects", subjects)
    return (
        <Box w='100%'>                        
            <HStack p="5" bg="gray.200" flexWrap="wrap" spacing="4"  alignItems="stretch" justifyContent="flex-start">
                {
                    classes.map((cls, c) =>
                        <ClassCard active={activeClass === cls._id} onClick={(id) => getSubjects(id)} onEdit={(obj) => {setClassEditable(obj); setClassOpen.on() }} onDelete={(id) => handleClassDelete(id)} key={c} data={cls} w="16.666667%" />
                    )
                }
                <Box w="16.666667%" onClick={setClassOpen.on} display="flex" alignItems="center" cursor="pointer" justifyContent="center" rounded="md"  border="2px dashed"  borderColor="gray.600" _hover={{ borderColor: 'brand.500' }}>
                    <VStack>
                        <Icon name="ios-add-circle" fontSize="24px" />
                        <Text fontSize="sm">Add New Class</Text>
                    </VStack>
                </Box>
            </HStack>
            <HStack w='100%' px="5" py="4">
                <Heading size="md">Subjects</Heading> 
                {
                    ability.can('create:own', 'subjects') &&
                    <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" onClick={setOpen.on} size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />
                }                
            </HStack>
            {loading && <Loader />}
            <Box p="5">
                {
                    subjects ? 
                        subjects.length > 0 ?                        
                        <HStack flexWrap="wrap" spacing="5"  alignItems="stretch" justifyContent="flex-start">
                            {
                                subjects.map((subject, s) =>
                                <SubjectCard onClick={(id) => navigate('/subjects/'+id)} onEdit={(obj) => handleEdit(obj) } onDelete={(id) => deleteItem(id)} key={s} data={subject} w="20%" />
                            )}
                        </HStack>
                        :
                        <Alert rounded="md" colorScheme="white" py="8" shadow="lg" center title="You have not created any subjects yet">
                            <Box textAlign="center">
                                <Text>Let us help you getting started</Text>
                                <Button mt="4"  size='sm' onClick={setOpen.on}>Create Subject</Button>
                            </Box>
                        </Alert>
                    :
                        <Alert status="info">
                            Please click on the class above to see the subjects
                        </Alert>
                }
            </Box>
            {/* {
              
                <VStack w='100%'>
                    
                    
                    

                    <Table bg="white" shadow="sm" border="0" size="sm"  rounded="md">
                        <Thead>
                            <Tr>
                                <Th w='120px'>Thumbnail</Th>
                                <Th>Title</Th>
                                <Th>Description</Th>                                
                                <Th>Class</Th>
                                <Th>Assigned To</Th>                                
                                <Th w='100px'>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {subjects?.map((data,i) => 
                            <Tr key={i}>
                                <Td><Image boxSize="56px" src={data?.thumbnail && public_path+data?.thumbnail} alt={data?.title} /></Td>
                                <Td><Link to='/subjects/12345'>{data?.title}</Link></Td>                                
                                <Td>{data?.description}</Td>
                                <Td>{data?.class?.title}</Td>
                                <Td>{data?.assignedTo?.first_name } {data?.assignedTo?.last_name }</Td>
                                <Td>
                                    {
                                         ability.can('update:any', 'subjects')?
                                         <IconButton size="sm" onClick={() => handleEdit(data)} rounded="full" variant="ghost" colorScheme="blue"  icon={<Icon color="brand.500" name="ios-create" />} />:''
                                    }
                                    {
                                        ability.can('delete:any', 'subjects')?
                                        <IconButton size="sm" onClick={() => deleteItem(data._id)} rounded="full" variant="ghost" colorScheme="red"  icon={<Icon color="red.500" name="md-trash" />} />:''
                                    }
                                    
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
               </VStack>
            } */}
            <SubjectForm open={open} data={editable} onClose={() => { setEditable(null); setOpen.off()}} />
            <ClassForm open={classOpen} data={classEditable} onClose={() => { setClassEditable(null); setClassOpen.off()}} />
        </Box>
    )
}
export default Subjects