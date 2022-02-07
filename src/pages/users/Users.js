import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersAction } from '../../redux/actions'
import { Box, HStack, Table, Thead, Tbody, Tr, Th, Td, IconButton, useBoolean, useToast } from "@chakra-ui/react"
import { Loader, Icon } from '../../ui-elements'
import UserForm from './UserForm'

const Users = (props) => {    
    const dispatch = useDispatch()
    const toast = useToast()
    const [loading, setLoading] = useBoolean(false)
    const [open, setOpen] = useBoolean(false)    
    const [editable, setEditable] = useState(null)
    const {users} = useSelector(state => state.users)
    useEffect(() => {
        if(props?.data === 'NewUser'){
            setOpen.on()            
        }        
        props?.resetData()
        // eslint-disable-next-line
    }, [props])

   

    useEffect(() => {          
        setLoading.on()
        dispatch(usersAction.get())
            .then((res) => {
                setLoading.off()
            })
            .catch((err) => {
                toast({description: err?.error || err, status: 'error'})
                setLoading.off()
            })
            // eslint-disable-next-line
    }, [])

    const handleEdit = (obj) => {
        setEditable(obj)
        setOpen.on()
    }

    
    const deleteItem = async(id) => {
        let result = await window.confirm('Do you really want to remove this user?', 'Confirm');
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

    const getRoles = (user) => {
        let roles = []
        user?.roles?.map((role, r) =>
            roles.push(role?.name)
        )
        return roles.join(' / ')
    }
    return(
        <HStack  h='100vh' w="100%" overflowY="auto" alignItems="flex-start">
            <Box flex={1}>
            {
                loading ?
                    <Loader />
                :
                <Box px="5">
                    <Table bg="white" shadow="sm" border="0" size="sm"  rounded="md">
                        <Thead>
                            <Tr>
                                
                                <Th py="3">Name</Th>                                
                                <Th py="3">Email</Th> 
                                <Th py="3">CNIC</Th>
                                <Th py="3">Phone</Th>
                                <Th py="3">Status</Th>
                                <Th py="3">ROLES</Th>
                                <Th py="3"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user, u) => 
                            <Tr key={u}>
                                <Td>{user?.first_name} {user?.last_name}</Td>
                                <Td>{user?.email}</Td>                                
                                <Td>{user?.cnic}</Td>
                                <Td>{user?.phone}</Td>
                                <Td>{user?.status}</Td>
                                <Td>
                                    {getRoles(user)}
                                </Td>
                                <Td textAlign="right">
                                    <IconButton size="sm" onClick={() => handleEdit(user)} rounded="full" variant="ghost" colorScheme="blue"  icon={<Icon color="brand.500" name="ios-create" />} />
                                    <IconButton size="sm" onClick={() => deleteItem(user?._id)} rounded="full" variant="ghost" colorScheme="red"  icon={<Icon color="red.500" name="md-trash" />} />
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            }
            </Box>                 
            <UserForm open={open} data={editable} onClose={() => {setOpen.off(); setEditable(null)}} />    
        </HStack>
    )
}


export default Users;