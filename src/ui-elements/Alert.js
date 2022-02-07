import React from 'react'
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'

const Alert = ({ children, center, title,  status, ...props}) => {

    return(
        <ChakraAlert status={status || 'info'}  {...props} {...(center) && { flexDirection:'column', alignItems: 'center', justifyContent: 'center'} }>
            <AlertIcon {...center && {boxSize: '40px'} } />
            {
                title &&
                <AlertTitle mt="4">{title}</AlertTitle>
            }
            <AlertDescription>
                {children}
            </AlertDescription>
        </ChakraAlert>
    )
}

export { Alert }