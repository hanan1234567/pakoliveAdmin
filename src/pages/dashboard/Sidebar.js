import React, {useState, useEffect} from "react";
import {Box, Image, HStack, Button, Text, VStack} from '@chakra-ui/react'
import {NavLink, useLocation} from 'react-router-dom'
import { Icon } from "../../ui-elements";
import {useAuth, useAbility} from '../../hooks'

const sidemenu = [
    {to: '/', label: 'Dashboard ', icon: 'ios-speedometer'},   
    {to: '/gallery', label: 'Gallery', icon: 'md-photos'},    
    {to: '/slider', label: 'Slider', icon: 'ios-images'},    
    {to: '/news-&-events', label: 'News & Events', icon: 'md-paper'},    
    {to: '/team', label: 'Core Team', icon: 'ios-people'},    
    {to: '/headlines', label: 'Headlines', icon: 'ios-notifications'},    
    {to: '/tenders', label: 'Tenders', icon: 'ios-briefcase'},    
    {to: '/jobs', label: 'Jobs', icon: 'ios-construct'},    
    {to: '/downloads', label: 'Downloads', icon: 'md-download'},    
    {to: '/usefulLinks', label: 'Useful Links', icon: 'md-link'},    
    {to: '/social-links', label: 'Social Links', icon: 'md-phone-portrait'},    
    {to: '/videos', label: 'Videos', icon: 'ios-videocam'},    
    {to: '/locations', label: 'Locations', icon: 'md-pin'},    
    {to: '/components', label: 'Components', icon: 'md-podium'},    
    // {to: '/settings', label: 'Settings', icon: 'ios-cog'},
]

const Sidebar = (props) => {
    const location = useLocation()
    const ability = useAbility()
    const [active, setActive] = useState(null)
    const auth = useAuth()

    


    useEffect(() => {     
        if(ability.can('read:any', 'subjects')){
         //   sidemenu.push({to: '/subjects', label: 'Subjects', icon: 'ios-copy'})
        }
        if(ability.can('read:any', 'users')){            
            // sidemenu.push({to: '/users', label: 'User Management', icon: 'ios-people'})            
        }
        
    }, [auth, ability])
    
    useEffect(() => {
        setActive(location?.pathname)
    }, [location])

    const handleLogout = () => {
        auth.logout()
            .then(() => {
                window.location.href="/"
            })
            .catch((e) => {
                window.location.href="/"
            })
        
    }
     
    return(
        <VStack h="100%" w={"260px"} minW="260px" bg="white"  py="10px" shadow="lg"  borderRight="1px solid" borderColor="gray.100">
            <VStack w='100%' spacing={2} px={3} h="100%" overflowY="auto">
                {
                    sidemenu?.map((item, index) =>
                    <Box key={index} w='100%'>                        
                        <NavLink to={item.to} >
                            <HStack bg={active === item.to ? "brand.500" : 'white'} className="align-center" px="2" py="1.5" rounded="sm" _hover={{ bg: active !== item.to && 'gray.100' }}>
                                <Box w="28px" as="span" mr="1" h="28px" className='center' rounded="full">
                                    <Icon name={item.icon} color={active === item.to ? "white" : 'gray.400'} fontSize="18px"  />
                                </Box>
                                <Text as="span" fontWeight="medium" fontSize="sm" color={active === item.to ? "white" : "gray.500"}>{item.label} </Text>
                            </HStack>
                        </NavLink>                        
                    </Box>
                    )
                }                                 
            </VStack>
            {/* <VStack w='100%' px={3} py="2" alignItems='flex-start'>
                <Text>Logged In as <Text as="span" fontWeight="bold">{auth?.user?.first_name + " " + auth?.user?.last_name}</Text></Text>
                <Button onClick={handleLogout} rounded='sm' size="sm" my="4">Logout</Button>
            </VStack> */}
            <Box  w="100%" className="justify-center">
                    <Image  w="100%"  src="/images/logo.png" alt="Insaf Academy" height='80px' width="auto"/>
            </Box>
        </VStack>
    )
}

export default Sidebar