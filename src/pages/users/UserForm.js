import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rolesAction, usersAction } from '../../redux/actions'
import { Box, Button, HStack, useBoolean, useToast, Text, Heading, Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Drawer, Input} from '../../ui-elements'
import InputMask from "react-input-mask";

const UserForm = ({open, data, onClose}) => {

    const dispatch = useDispatch()
    const toast = useToast()
    const {roles} = useSelector(state => state.roles)
    const [submitting, setSubmitting] = useBoolean(false)
    const [errors, setErrors] = useState(null)
    const [state, setState] = useState({})
    

    useEffect(() => {
        dispatch(rolesAction.get())     
        // eslint-disable-next-line       
    }, [open])


    useEffect(() => {
        if(data && open){
            var roles = []
            data?.roles.map((role) => {
                return roles.push(role?._id);
            })
            setState({...data, roles: roles})
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
        let action = data ? usersAction.update(state) : usersAction.add(state)
        dispatch(action)
            .then((res) => {
                setSubmitting.off()       
                toast({description: res.message, status: 'success'}) 
                handleClose()        
            })
            .catch((err) => {

                setErrors(err?.error)
                toast({description: err?.message, status: 'error'})
                setSubmitting.off()
            })
        
    }

    const handleClose = () => {
        setState({})
        setErrors(null)
        onClose()
    }
    
    return(
        <Drawer
                open={open}
                onClose={handleClose}
                title={ data ? 'Update User' : 'Create New User'}
                footer={
                    <HStack>
                        <Box>
                            <Button isLoading={submitting} type="submit" form="user-form">Submit</Button>
                        </Box>
                    </HStack>
                }           
                >
                    <form id="user-form" onSubmit={handleSubmit}>
                        <HStack justifyContent="space-between" spacing="5" my="20px"  alignItems="flex-start">                            
                            <Input error={errors?.first_name?.message} label="First Name" value={state?.first_name || ''} onChange={(e) => handleInputChange('first_name', e.target.value )} />                        
                            <Input error={errors?.last_name?.message} label="Last Name" value={state?.last_name || ''} onChange={(e) => handleInputChange('last_name', e.target.value )} />
                        </HStack>

                        <HStack justifyContent="space-between" spacing="5"  my="20px"  alignItems="flex-start">                            
                            <Input error={errors?.email?.message}  label="Email" value={state?.email || ''} onChange={(e) => handleInputChange('email', e.target.value )} />                        
                            <Input error={errors?.phone?.message}  label="Phone Number" value={state?.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value )} />
                        </HStack>

                        <HStack justifyContent="space-between" spacing="5"  my="20px" alignItems="flex-start">                            
                            <Input as={InputMask} mask="99999-9999999-9" maskChar="0" error={errors?.cnic?.message}  label="CNIC" value={state?.cnic || ''} onChange={(e) => handleInputChange('cnic', e.target.value )} />                        
                        </HStack>

                        <HStack justifyContent="space-between" spacing="5"  my="20px" alignItems="flex-start">                            
                            <Input type="password" error={errors?.password?.message}  label="Password" value={state?.password || ''} onChange={(e) => handleInputChange('password', e.target.value )} />                        
                            <Input type="password" label="Confirm Password" value={state?.confirm_password || ''} onChange={(e) => handleInputChange('confirm_password', e.target.value )} />
                        </HStack>

                        <Box>
                            <Heading size="sm" my="4">Assign Roles</Heading>
                            {
                                errors?.roles &&
                                <Text color="red.500">{errors?.roles?.message}</Text>
                            }
                            <CheckboxGroup colorScheme="green" value={state?.roles || []} onChange={(vals) => handleInputChange('roles', vals)}>
                                <Box d="flex" flexDir="column">
                                    {
                                        roles.map((role, r) =>
                                            <Checkbox key={r} value={role?._id}>{role?.name}</Checkbox>
                                        )
                                    }
                                </Box>
                            </CheckboxGroup>
                        </Box>
                        
                    </form>
            </Drawer>
    )
}

export default UserForm