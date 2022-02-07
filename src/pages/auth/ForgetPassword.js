import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {
    Box, Stack, 
    Heading, Button, FormControl,
    FormErrorMessage, Image,
    Input, InputGroup, InputLeftElement,
    useBoolean, useToast, Text
} from '@chakra-ui/react'
import { authApi } from '../../api'
import {Icon} from '../../ui-elements'

const ForgetPassword = (props) => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useBoolean()
    const toast = useToast()

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading.on()
        authApi._forget_password(state)
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
            })
            .catch((err) => {
                setLoading.off()
                console.log("Error", err)
                // toast({
                //     title: "Error!",
                //     description: err.error,
                //     status: "error",
                //     position: "top",
                //     duration: 9000,
                //     isClosable: true,
                //   })
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
                    <Heading size="md" my="3">Forget Password</Heading>
                    <Text mb="5">Please enter email address below to reset your password.</Text>
                    <form onSubmit={handleSubmit} id="reset-form">
                        <Stack direction="column">                                
                            <FormControl isInvalid={false} mb={3}>                                    
                                <InputGroup>
                                    <InputLeftElement 
                                        pointerEvents="none"
                                        children={<Icon name="md-person" />}
                                    />                                
                                    <Input  type="email" onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Email Address" />
                                </InputGroup>
                                <FormErrorMessage>We'll never share your email.</FormErrorMessage>
                            </FormControl>

                            
                            
                            <Stack direction="row" pt="5" justifyContent="space-between">
                                <Button px={7} type="submit" form="reset-form" isLoading={loading}  loadingText="Please wait...">Submit</Button>
                                <Button variant="link" as={Link} to="/" colorScheme="blue">Login Here</Button>
                            </Stack>

                        </Stack>
                    </form>
                </Box>
            </Box>
            <Box flex="2" d={{ base: 'none', lg: "flex", md: 'none' }} alignItems="center" justifyContent="center" w="100%" h="100%" bg="brand.500">
                <Heading size="lg" color="white">Insaf Academy Portal</Heading>
            </Box>                  
        </Box>
    )
}

export default ForgetPassword


