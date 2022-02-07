export * from './resources'
export const titleCase = (str) =>{
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


export const handleResponse = (response) => {
    return response.text()
        .then(async (my_data) => {     
            // console.log("<<<<Data>>>", my_data)
            if(response.status === 500)
            {
                return Promise.reject({error: 'Error 500: Internal Server Error.'})
            }
            if(response.status === 404)
            {
                return Promise.reject({error: 'Error 404: Requested uri does not exist.'})
            }

            if(response.status === 401)
            {            
                // AppStore.dispatch(AuthActions.logout())
                return Promise.reject('Unauthorised Access')
                
            }

            if(response.status === 400)
            {                
                const data = my_data && JSON.parse(my_data);
                return Promise.reject(data)
            }

            const data = my_data && JSON.parse(my_data);
            if (!response.ok) {
                // throw Error(response.statusText);
                const error = (data && data.error) || response.statusText;
                return Promise.reject(error);
            }

            return data
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export const requestTimeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
        reject({error:'Server Request Timeout'})
        }, ms)      
        promise
        .then(value => {
            clearTimeout(timer)
            resolve(value)
        })
        .catch(reason => {
            clearTimeout(timer)            
            reject(reason)
        })
    })
}

