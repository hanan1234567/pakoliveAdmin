import React, { createContext, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Box,
} from "@chakra-ui/react"

const initialState = {
    open: false,     
    title: 'Alert',
    message: '',
    type: 'alert'
};


const AlertContext = createContext({
    ...initialState,
    init: () => Promise.resolve(),
    show: () => Promise.resolve(),     
    hide: () => Promise.resolve()
});



let resolveCallback = (val) => {
    return val;
}


export const AlertProvider = (props) => {

    const [state, setState] = useState(initialState)
    

    const show = (title=initialState.title, message="") => {
        setState({...state, open: true, title, message})
    }

    const alert = (message="", title=initialState.title) => {
        setState({...state, open: true, type: 'alert', title, message})
    }

    const onConfirm = () => {
        setState({...state, open: false})
        resolveCallback(true);
    };

    const onCancel = () => {
        setState({...state, open: false})
        resolveCallback(false);
    };

    const confirm = (message="", title='Confirm', yesCallBack, noCallBack) => {
        setState({...state, open: true, type: 'confirm', title, message})
        return new Promise((resolve, reject) => {
            return resolveCallback = resolve;
        })
    }

    

   

    const hide = () => {
        setState({...state, open: false})
        return false;
    }
  

    const setAlert = () => {                        
        window.alert = alert
        window.confirm = confirm
    }
    return (
        <AlertContext.Provider value={{show, hide, alert}}>
            <AlertDialog
                isOpen={state.open}
                onClose={hide}
                >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {state.title}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {state.message}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            {
                                state.type !== 'alert' &&
                                <Box>
                                    <Button mr="20px" onClick={onConfirm} size="sm" colorScheme="red" > 
                                        Yes
                                    </Button>

                                    <Button size="sm" colorScheme="gray" onClick={onCancel}>
                                        No
                                    </Button>
                                </Box>
                            }
                            {
                                state.type === 'alert' &&
                                <Button colorScheme="red" variant="outline" size="sm" onClick={hide} ml={3}>
                                    OK
                                </Button>
                            }
                            
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {props.children}
            {setAlert()}
        </AlertContext.Provider>
    );
}
export {AlertContext}