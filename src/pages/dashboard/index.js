import React from "react";
import {Box} from '@chakra-ui/react'
import { Routes as Switch, Route} from "react-router-dom";
import './index.css'
import Sidebar from "./Sidebar";
import NotFound from "../errors/404";
import Home from '../home'
import Gallery from "../gallery";
import News_Events from "../news&events";
import Tenders from "../tenders";
import Jobs from "../jobs";
import Downloads from "../downloads";
import UsefulLinks from "../usefulLinks";
import Headlines from "../headlines";
import Slider from '../slider'
import Videos from "../videos";
import Locations from "../kmz";
import Team from "../team";
import SocialLinks from "../sociallinks";
import Components from "../components";
import Users from '../users'
import Subjects from "../subjects";
import SubjectDetails from "../subjects/SubjectDetails";

const Dashboard = () => {
    return(
        <Box d="flex"  h='100vh' bg="gray.100">
            <Sidebar />
            <Box  maxW="calc(100% - 260px)" flex={1}>
                <Switch>                                                        
                    <Route exact path="/"  element={<Home />} />
                    <Route path="/users/*"  element={<Users />} />      
                    <Route path='/gallery' element={<Gallery/>}/>
                    <Route path='/news-&-events' element={<News_Events/>} />   
                    <Route path='/headlines' element={<Headlines/>}/>          
                    <Route path='/tenders' element={<Tenders/>}/>
                    <Route path='/jobs' element={<Jobs/>}/>
                    <Route path='/downloads' element={<Downloads/>}/>
                    <Route path='/usefulLinks' element={<UsefulLinks/>}/>
                    <Route path='/slider' element={<Slider/>}/>
                    <Route path='/videos' element={<Videos/>}/>
                    <Route path='/locations' element={<Locations/>}/>
                    <Route path='/team' element={<Team/>}/>
                    <Route path='/social-links' element={<SocialLinks/>}/>
                    <Route path='/components' element={<Components/>}/>
                    <Route exact path="/subjects"  element={<Subjects />} />
                    <Route exact path="/subjects/:subject_id"  element={<SubjectDetails/>} />                    
                    <Route path="*" element={<NotFound/>} />
                </Switch>       
            </Box>            
        </Box>
    )
}

export default Dashboard