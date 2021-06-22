import {configureStore} from '@reduxjs/toolkit';
import nodeReducer from './slice/nodeSlice';
export default configureStore({
    reducer:{
        nodeReducer: nodeReducer
    }
})