import React, {useState, useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom'
import {
    Box, Stack, 
    Heading, Button, FormControl,
    FormErrorMessage, Image, Spinner,
    Input, InputGroup, InputLeftElement,
    useBoolean, useToast, Text
} from '@chakra-ui/react'
import { authApi } from '../../api'
import {Icon} from '../../ui-elements'


const ResetPassword = (props) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useBoolean()
    const [isValid, setValid ] = useBoolean()
    const toast = useToast()
    const params = useParams()
    let navigate = useNavigate();


    useEffect(() => {
        setLoading.on()
        authApi._check_reset(params)
            .then((res) => {
                setValid.on()
                setLoading.off()
                
            })
            .catch((err) => {
                setLoading.off()
                setValid.off()
            })
            // eslint-disable-next-line
    }, [])

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading.on()
        let formdata = {...state, id: params?.id}
        authApi._reset_password(formdata)
            .then((res) => {
                setLoading.off()
                toast({
                    title: "",
                    description: res.message,
                    status: "success",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                  })
                  navigate('/')
                  
            })
            .catch((err) => {
                setLoading.off()
                console.log("Error", err)
                toast({
                    title: "Error!",
                    description: err.error,
                    status: "error",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                  })
            })

    }
    return(
        <Box 
            d="flex" 
            h="100vh"
            minH='100vh'
            // alignItems="center" 
            // justifyContent="center" 
            bg="white"
            // bgImage='./assets/auth-bg.svg' 
            // bgSize="cover" 
            // bgAttachment="fixed"
            >
            {/* <Box w="100%" maxW="500px" flexDir="column" h="100%" d="flex" justifyContent="center"> */}
            <Box flex="1" d="flex" h="100%" flexDir="column" justifyContent="center">
                <Box p="10" w="100%" maxW="440px" mx="auto">
                    <Image src="/images/insaf-academy-logo-h.svg" h="90px" mb="10" w="auto" />
                    {
                        loading &&
                        <Spinner />
                    }
                    <Heading size="md" my="3">Reset Password</Heading>
                    {
                        isValid ?
                        <>
                            <Text mb="5">Please fill in the form below to reset your password.</Text>
                            <form onSubmit={handleSubmit} id="reset-form">
                                <Stack direction="column">                                
                                    <FormControl isInvalid={false} mb={3}>                                    
                                        <InputGroup>
                                            <InputLeftElement 
                                                pointerEvents="none"
                                                children={<Icon name="md-key" />}
                                            />                                
                                            <Input  type="password" onChange={(e) => handleInputChange('password', e.target.value)} placeholder="New Passowrd" />
                                        </InputGroup>
                                        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={false} mb={3}>                                    
                                        <InputGroup>
                                            <InputLeftElement 
                                                pointerEvents="none"
                                                children={<Icon name="md-key" />}
                                            />                                
                                            <Input  type="password" onChange={(e) => handleInputChange('confirm_password', e.target.value)} placeholder="Confirm Passowrd" />
                                        </InputGroup>
                                        <FormErrorMessage>We'll never share your email.</FormErrorMessage>
                                    </FormControl>

                                    
                                    
                                    <Stack direction="row" pt="5" justifyContent="space-between">
                                        <Button px={7} type="submit" form="reset-form" isLoading={loading}  loadingText="Please wait...">Submit</Button>
                                    </Stack>

                                </Stack>
                            </form>
                        </>
                        :
                        <>
                            <Box bg="red.100" p="4">
                                <Text color="red.500">Invalid Link</Text>
                            </Box>
                        </>
                    }
                </Box>
            </Box>
            {/* <Text fontSize={{ base: "24px", md: "40px", lg: "56px" }}> */}

            <Box flex="2" d={{ base: 'none', lg: "flex", md: 'none' }} alignItems="center" justifyContent="center" w="100%" h="100%" bg="brand.500">
                <Heading size="lg" color="white">Insaf Academy Portal</Heading>
            </Box>                  
        </Box>
    )
}

export default ResetPassword


