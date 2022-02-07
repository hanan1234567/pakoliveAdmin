import React, {useState} from 'react'
import { Routes as Switch, Route, useLocation, useNavigate, NavLink } from "react-router-dom";
import { Box, Heading, HStack, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Icon } from '../../ui-elements';
import AllUsers from './Users'
import Roles from './Roles'

const Users = (props) => {   
    const location = useLocation()
    const navigate = useNavigate()
    const [state, setState] = useState(null)

    const goTo = (to, data) => {
        setState(data)
        navigate(to)
    }
    return(
        <HStack  h='100vh' w="100%" overflowY="auto" alignItems="flex-start">
            <Box flex={1} px="3">
                <Box px="7" py="5">
                    <Heading size="md" m="0">User Management</Heading>
                </Box>
                <HStack px="5" py="4" justifyContent="space-between">
                    <Box  borderBottom="0px solid" borderColor="brand.500">
                        <Button h="48px" colorScheme="gray" rounded="0" borderBottom="2px solid" borderColor={location?.pathname === '/users' ? 'brand.500' : 'transparent'} variant="ghost" bg="transparent" mx="2" as={NavLink} to="/users">Users</Button>
                        <Button  h="48px" colorScheme="gray" rounded="0" borderBottom="2px solid" borderColor={location?.pathname === '/users/roles' ? 'brand.500' : 'transparent'} variant="ghost" mx="2" as={NavLink} to="/users/roles">Roles</Button>
                    </Box>
                    <Box>
                    <Menu>
                        <MenuButton size="sm" colorScheme="brand" as={Button} rightIcon={<Icon name="md-arrow-dropdown" color="white" />}>
                            Create...
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => goTo('/users', 'NewUser')}>New User</MenuItem>
                            <MenuItem onClick={() => goTo('/users/roles', 'NewRole') }>New Role</MenuItem>                            
                        </MenuList>
                        </Menu>
                    </Box>
                </HStack>

                <Switch>                                                        
                    <Route exact path="/"  element={<AllUsers resetData={() => setState(null)} data={state} />} />
                    <Route exact path="/roles" element={<Roles resetData={() => setState(null)} data={state} />} />
                </Switch>
            </Box>                 
        </HStack>
    )
}


export default Users;