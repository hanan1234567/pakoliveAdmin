import React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { AppStore, persistor } from './redux'
import { AlertProvider, AuthProvider } from './services'
import {theme} from './theme'
import Routes from './routes'

const App = () => {    
    return (
        <Provider store={AppStore}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>    
                    <AlertProvider>
                        <AuthProvider>                            
                            <Routes />                              
                        </AuthProvider>                        
                    </AlertProvider>
                </ChakraProvider>
            </PersistGate>
        </Provider>
      )
}

export default App
