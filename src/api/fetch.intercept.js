import fetchIntercept from 'fetch-intercept';
import {AppStore} from '../redux'
import { tokenName, apiMaxTime } from '../config.json'
import { handleResponse, requestTimeout } from '../helpers';
import {authAction} from '../redux/actions'


const refresh_token = localStorage.getItem(tokenName);
const originalRequest = {url: null, config: null}

export const interceptor = fetchIntercept.register({    
    request: function (url, config) {
        originalRequest.url = url
        originalRequest.config = config
        return [url, config];
    },
 
    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call        
        return Promise.reject(error);
    },
 
    response: async function (response) {
        if(response.status === 401)
        {
            let {url, config} = originalRequest            
            if(url.includes('token') || !refresh_token){
                interceptor()
                return Promise.reject("Session expired");
            }
            else
            {   
                AppStore.dispatch(authAction.refresh_token(refresh_token))
                        .then((data) => {                            
                            config['headers']['Authorization'] = 'Bearer '+data.token
                            return requestTimeout(apiMaxTime,fetch(url, config))                                
                        })
                        .then(handleResponse)
                        .then((data) => {                                         
                            return data;
                        });                        
                
            }            
        }
        else
        {
            return response
        }        
    },
 
    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});