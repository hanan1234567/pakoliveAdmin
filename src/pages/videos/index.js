import React,{useState,useEffect} from "react"
import {useSelector,useDispatch } from 'react-redux'
import {videosAction } from '../../redux/actions'
import {useAbility} from '../../hooks'
import {useBoolean, Heading,VStack,HStack,Text,Button,IconButton,useToast,SimpleGrid} from "@chakra-ui/react"
import { Loader,Icon, Alert} from '../../ui-elements'
import VideoForm from "./videoForm"
import BoX from "./box"
const Videos = () => {
    const ability = useAbility()
    const [loading, setLoading] = useBoolean(false)
    const [open, setOpen] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const toast = useToast()
    const dispatch=useDispatch();
    const {videos} = useSelector(state => state?.videos)

    const handleEdit = (slide) => {
        setEditable(slide)
        setOpen.on()
    }
    useEffect(() => {          
        setLoading.on()
        dispatch(videosAction.get())
            .then(() => {
                setLoading.off()
            })
            .catch((err) => {
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const deleteSlide= async(videoID) => {
            dispatch(videosAction.remove(videoID))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
    }
    return (
        <VStack w='100%' h='100vh' overflowY='auto' spacing={0}>                        
            <HStack w='100%' px={5} py={3} position='sticky' top={0} bg='white' zIndex={99}>
                <Heading size="md" m={0}>Videos</Heading> 
                <IconButton colorScheme="gray" variant="ghost" rounded="full" ml="2" onClick={setOpen.on} size="sm" icon={<Icon fontSize="24px" color="brand.500" name="ios-add" />} />               
            </HStack>
            {loading && <Loader />}
            <VStack w='100%' px={4} py={5}>
                {
                    videos?.length > 0 ?                        
                    <SimpleGrid columns={4} spacing={5} w='100%'>
                        {
                            videos?.map((video,v) =>
                            <BoX onEdit={() => handleEdit(video) } onDelete={() => deleteSlide(video._id)} key={v} data={video}/>
                        )}
                    </SimpleGrid>
                    :
                    <Alert  rounded="md" colorScheme="white" py={5} shadow="lg" center title="You have not uploaded any Video">
                        <VStack textAlign="center" spacing={5}>
                            <Text>Let us help you getting started</Text>
                            <Button mt="4"  size='sm' rounded='sm' onClick={setOpen.on}>Upload Video</Button>
                        </VStack>
                    </Alert>
                }
            </VStack>
            <VideoForm open={open} data={editable} onClose={() => { setEditable(null); setOpen.off()}}/>
        </VStack>
    )
}
export default Videos