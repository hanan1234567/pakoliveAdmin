import React, {Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import {Splash} from '../ui-elements'
import {Fade} from '@chakra-ui/react'
import { AbilityProvider } from '../services'
import { useAuth } from '../hooks'
import { isEmpty } from '../helpers'
import NotFound from '../pages/errors/404'
const Login = lazy(() => import('./../pages/auth'))
const ForgetPassword = lazy(() => import('./../pages/auth/ForgetPassword'))
const ResetPassword = lazy(() => import('./../pages/auth/ResetPassword'))
const Dashboard = lazy(() => import('./../pages/dashboard'))



const  Routes = () => {    
    
    const auth = useAuth();

    if(auth.loading)
    {
        return(
            <Fade in={true}>
                <Splash />
            </Fade>
        )
    }

    if(isEmpty(auth.user) || !auth.token) 
    {
        return (
            <Fade in={true}>
                <Suspense fallback={<Splash />}>
                    <Router>
                        <Switch>
                            <Route exact path="/" element={<Login/>} />
                            <Route exact path="/forget-password" element={<ForgetPassword/>} />
                            <Route exact path="/reset-password/:hash/:id" element={<ResetPassword/>} />
                            <Route path="*"  element={<NotFound />} /> 
                        </Switch>
                    </Router>
                </Suspense>
            </Fade>
        )
    }

    return (                
            <Fade in={true}>
                <AbilityProvider>
                    <Suspense fallback={<Splash />}>
                        <Router>
                            <Switch>
                                <Route path="/*" element={<Dashboard/>} />
                            </Switch>
                        </Router>
                    </Suspense>
                </AbilityProvider>
            </Fade>                
    )
}

export default Routes;