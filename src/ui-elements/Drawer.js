import React from 'react'
import { 
    Drawer as ChakraDrawer, DrawerBody, DrawerContent, 
    DrawerOverlay, DrawerCloseButton, DrawerHeader, 
    DrawerFooter 
} from '@chakra-ui/react'


const Drawer = (props) => {

    const modalRef= React.createRef()
    let {open, size, onClose, bg, transition, closeable=true, footer, title, placement} = props
    return(
        <ChakraDrawer 
            isOpen={open || false} 
            size={size || "lg"}  
            onClose={onClose} 
            motionPreset={transition || "slideInRight"}
            autoFocus={false}
            initialFocusRef={modalRef}
            placement={placement || "right"}
            blockScrollOnMount={false}
            closeOnOverlayClick={closeable}
            closeOnEsc={closeable}
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader bg="transparent">{title}</DrawerHeader>
                {
                    closeable && <DrawerCloseButton _focus={{ outline: "none" }} />
                }
                
                <DrawerBody p={props.p}   bg={bg || 'white'}>
                    {props.children}
                </DrawerBody>
                {
                    footer &&
                    <DrawerFooter>
                        {footer}
                    </DrawerFooter>
                }
                
                <div ref={modalRef}/>
            </DrawerContent>    
        </ChakraDrawer>
    )
}

export {Drawer}