import { combineReducers } from 'redux'
import { authReducer } from './auth.reducer';
import { rolesReducer } from './roles.reducer';
import { usersReducer } from './users.reducer';
import {subjectsReducer} from './subjects.reducer'
import {classesReducer} from './classes.reducer'
import { contentsReducer } from './contents.reducer';
import { questionBankReducer } from './questionBank.reducer';
import { galleryReducer } from './gallery.reducer';
import {newsReducer} from './news.reducer'
import { headlineReducer } from './headline.reducer';
import { tendersReducer } from './tenders.reducer';
import { jobsReducer } from './jobs.reducer';
import {downloadsReducer} from './downloads.reducer'
import { linksReducer } from './links.reducer';
import { sliderReducer } from './slider.reducer';
import { videosReducer } from './videos.reducer';
import { locationsReducer } from './locations.reducer';
import { teamReducer } from './team.reducer';
import { socialLinksReducer } from './socialLinks.reducer';
import {componentsReducer} from './components.reducer'
export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    subjects: subjectsReducer,
    classes:classesReducer,
    contents:contentsReducer,
    questionBank:questionBankReducer,
    gallery:galleryReducer,
    newses:newsReducer,
    headlines:headlineReducer,
    tenders:tendersReducer,
    jobs:jobsReducer,
    downloads:downloadsReducer,
    links:linksReducer,
    slider:sliderReducer,
    videos:videosReducer,
    locations:locationsReducer,
    team:teamReducer,
    socialLinks:socialLinksReducer,
    components:componentsReducer
});

