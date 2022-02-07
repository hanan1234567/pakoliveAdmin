import React,{useState,useEffect} from "react"
import {useSelector,useDispatch } from 'react-redux'
import {galleryAction } from '../../redux/actions'
import {useAbility} from '../../hooks'
import { useNavigate } from 'react-router-dom'
import {useBoolean, Heading,VStack,HStack,Text,Button,IconButton,useToast,SimpleGrid} from "@chakra-ui/react"
import { Loader,Icon, Alert} from '../../ui-elements'
import GalleryForm from "./galleryForm"
import BoX from "./box"
import ViewGallery from "./viewGallery"

const Gallery = () => {
    const navigate = useNavigate()
    const ability = useAbility()
    const [loading, setLoading] = useBoolean(false)
    const [openGallery, setOpenGallery] = useBoolean(false)
    const [editableGallery, setEditableGallery] = useState(null)
    const [openViewGallery, setOpenViewGallery] = useBoolean(false)
    const [editableViewGallery, setEditableViewGallery] = useState(null)
    const toast = useToast()
    const dispatch=useDispatch();
    const {gallerys} = useSelector(state => state?.gallery)
    const handleEdit = (obj) => {
        setEditableGallery(obj)
        setOpenGallery.on()
    }
    const viewGallery=(gallery)=>{
        setEditableViewGallery(gallery)
        setOpenViewGallery.on()
    }
    useEffect(() => {          
        setLoading.on()
        dispatch(galleryAction.get())
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                console.log("Error", err)
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const deleteGallery= async(galleryID) => {
        setLoading.on()
        let result = await window.confirm('Do you really want to remove this Gallery?', 'Confirm');
        if(result)
        {
            dispatch(galleryAction.remove(galleryID))
                .then((res) => {
                    setLoading.off()
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    setLoading.off()
                    toast({description: err.error, status: 'error'})
                })  
        }      
    }
    return (
        <VStack w='100%' h='100vh' overflowY='auto' spacing={0}>                        
            <HStack w='100%' px={5} py={3} position='sticky' top={0} bg='white' zIndex={99}>
                <Heading size="md" m={0}>Gallery</Heading> 
                <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" onClick={setOpenGallery.on} size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />               
            </HStack>
            {loading && <Loader />}
            <VStack w='100%' px={4} py={5}>
                {
                    gallerys.length > 0 ?                        
                    <SimpleGrid w='100%' columns={4} spacing={5}>
                        {
                            gallerys.map((gallery,g) =>
                            <BoX onEdit={() => handleEdit(gallery) } onView={()=>{viewGallery(gallery)}} onDelete={() => deleteGallery(gallery?._id)} key={g} data={gallery}/>
                        )}
                    </SimpleGrid>
                    :
                    <Alert  rounded="md" colorScheme="white" py={5} shadow="lg" center title="You have not created any gallery yet">
                        <VStack textAlign="center" spacing={5}>
                            <Text>Let us help you getting started</Text>
                            <Button mt="4"  size='sm' rounded='sm' onClick={setOpenGallery.on}>Create Gallery</Button>
                        </VStack>
                    </Alert>
                }
            </VStack>
            <GalleryForm open={openGallery} data={editableGallery} onClose={() => { setEditableGallery(null); setOpenGallery.off()}}/>
            <ViewGallery open={openViewGallery} data={editableViewGallery} onClose={()=>{ setEditableViewGallery(null); setOpenViewGallery.off() }}/>
        </VStack>
    )
}
export default Gallery