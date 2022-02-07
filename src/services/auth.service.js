import React, { createContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from '../redux/actions';
import {accessToken} from '../config.json'
import { authApi } from '../api';

const initialState = {
    user: null,   
    loggedIn: false,
    loading: true,
    token: sessionStorage.getItem(accessToken)
};

const AuthContext = createContext({
    ...initialState,
    init: () => Promise.resolve(),
    login: () => Promise.resolve(),     
    logout: () => Promise.resolve(),
});


export const AuthProvider = (props) => {
    const auth = useSelector(state => state.auth);
    const [state, setState] = useState({...initialState, ...auth})
    const dispatch = useDispatch()

    

    useEffect(() => {
      init()
      // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [])

    useEffect(() => {
        setState({
            ...state,
            ...auth
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    const init = async () => {     
        // setTimeout(function() { loader() }, 1500);
        await loader()
    }

    const login = (form_data) => {
        return new Promise((resolve, reject) => {
            dispatch(authAction.login(form_data))
            .then((response) => {
                resolve(response) 
            })
            .catch((error) => reject(error) )
        })

    }

    const logout = () => {
        return new Promise((resolve, reject) => {
        dispatch(authAction.logout())
            .then(() => {
                setState({...state, user:null, token: null})                
                resolve()
            })
            .catch((e) => {
                reject()
            })
        })

    }

    


    /* Check initial authentication here */
    const loader =  async () => {        
        try{
            await authApi._auth_check()
            setState({...state, loading: false})
        }
        catch(err){
            console.log("Error", err)
            console.log("State", state)
            sessionStorage.removeItem(accessToken)
            setState({...state, user: null, token: null, loading: false})
            // console.log("Error 2", err)
            
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout
            }}>
            {props.children}
            
        </AuthContext.Provider>
    );
}

export  {AuthContext}