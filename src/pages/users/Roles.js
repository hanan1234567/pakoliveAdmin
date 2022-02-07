import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rolesAction } from '../../redux/actions'
import { Box, HStack, Table, Thead, Tbody, Tr, Th, Td, IconButton, useBoolean, useToast } from "@chakra-ui/react"
import { Loader, Icon} from '../../ui-elements'
import RoleForm from './RoleForm'

const Roles = (props) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [loading, setLoading] = useBoolean(false)
    const [editable, setEditable] = useState(null)
    const [open, setOpen] = useBoolean(false)    
    const {roles} = useSelector(state => state.roles)

    useEffect(() => {
        if(props?.data === 'NewRole'){
            setOpen.on()            
        }
        props?.resetData()
        // eslint-disable-next-line
    }, [props])

    useEffect(() => {          
        setLoading.on()
        dispatch(rolesAction.get())
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
        let result = await window.confirm('Do you really want to remove this role?', 'Confirm');
        if(result){
            dispatch(rolesAction.remove(id))
                .then((res) => {
                    toast({description: res.message, status: 'success'})
                })
                .catch((err) => {
                    toast({description: err.error, status: 'error'})
                })        
        }
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
                                
                                <Th py="3">Role</Th>                                
                                <Th py="3"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {roles.map((role, r) => 
                            <Tr key={r} onClick={() => handleEdit(role)} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                                <Td>{role?.name}</Td>                                
                                <Td textAlign="right" onClick={(e) => e.stopPropagation()}>                                    
                                    <IconButton size="sm" onClick={() => deleteItem(role._id)} rounded="full" variant="ghost" colorScheme="red"  icon={<Icon color="red.500" name="md-trash" />} />
                                </Td>
                            </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            }
            </Box>
            <RoleForm open={open} data={editable} onClose={() => {setOpen.off(); setEditable(null)}} />
            
          
        </HStack>
    )
}


export default Roles;