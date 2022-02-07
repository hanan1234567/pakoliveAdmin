import React from 'react'
import { Can } from '../../hooks'

const Home = (props) => {
    return(

        <div>
            <p>Home Page</p>
            <Can I="read:any" a="users">
            <button>Create Todo</button>
            </Can>
        </div>

        
    )
}


export default Home;