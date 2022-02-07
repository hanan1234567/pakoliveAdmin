import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { rolesAction } from '../../redux/actions'
import { Box, Heading, Button, HStack, useBoolean, useToast } from '@chakra-ui/react'
import { Drawer, Switch, Input} from '../../ui-elements'
import { resources } from '../../helpers'

const RoleForm = ({open, data, onClose}) => {

    const dispatch = useDispatch()
    const toast = useToast()
    const [submitting, setSubmitting] = useBoolean(false)
    const [state, setState] = useState({
        name: '',
        permissions: {}
    })

    useEffect(() => {
        if(open){
            let permissions_obj = {}
            resources.map((resource) => {
                let resource_permissions = {}
                resource.permissions.map((perm) => {
                    return resource_permissions[perm?.name] = false
                })
                return permissions_obj[resource?.name] = resource_permissions
            })
            setState({
                ...state,
                permissions: permissions_obj
            })
        }
        // eslint-disable-next-line
    }, [open])

    useEffect(() => {
        if(data && open){
            setState(data)
        }
    }, [data, open])

    const handleInputChange = (name, value) =>{
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting.on()
        let action = data ? rolesAction.update(state) : rolesAction.add(state)
        dispatch(action)
            .then((res) => {
                setSubmitting.off()       
                toast({description: res.message, status: 'success'}) 
                handleClose()        
            })
            .catch((err) => {
                console.log("Error", err)
                setSubmitting.off()
            })
        
    }

    const handleClose = () => {
        setState({
            name: '',
            permissions: {}
        })
        onClose()
    }
    const handlePermissionChange = (type, per, target) => {
        setState({
            ...state,
            permissions:{
                ...state.permissions,
                [type]: {
                    ...state?.permissions[type],
                    [per]: target.checked
                }
            }
        })
    }

    return(
        <Drawer
                open={open}
                onClose={handleClose}
                title={ data ? 'Update Role' : 'Create New Role'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} type="submit" form="role-form">Submit</Button>
                        </Box>
                    </HStack>
                }           
                >
                    <form id="role-form" onSubmit={handleSubmit}>
                        <Box my="3" p="6"  rounded="md" bg="gray.50">
                            <Input label="Role Name" value={state?.name} onChange={(e) => handleInputChange('name', e.target.value )} />
                        </Box>
                        {
                            resources.map((resource, r) =>
                            <Box my="3" key={r} rounded="md" bg="gray.50">
                                <Heading m="0" p="6" pb="0"  size="sm">{resource.label}</Heading>
                                <Box  p="6">
                                    {
                                        resource.permissions.map((permission, p) =>
                                        <Box key={p}>
                                            <Switch isChecked={state?.permissions?.[resource?.name]?.[permission?.name] || false}  onChange={(e) => handlePermissionChange(resource?.name, permission?.name, e.target) } label={permission?.description} />
                                        </Box>
                                        )
                                    }
                                </Box>
                            </Box>
                            )
                    }
                    </form>
            </Drawer>
    )
}

export default RoleForm