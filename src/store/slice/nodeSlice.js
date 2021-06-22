import { createSlice} from '@reduxjs/toolkit';
import searchNode from '../../utility/searchNode';

const initialState={
    rootNode:{},
    currentNode:'',
    currentNodeObj:{},
    history:{
        lists:[],
        currentNode:0
    },
}


const nodeSlice=createSlice({
    name: 'node',
    initialState,
    reducers:{
        addRootNode(state,action){

        const rootNode=action.payload;
            state.rootNode=rootNode;
            state.currentNode=rootNode.id;
            state.currentNodeObj={...rootNode};
            state.history.lists[0]=rootNode.id;
        },

        addNode(state,action){
            let {currentNodeId,node}= action.payload;
            let tree={...state.rootNode};
            let tmp= searchNode(currentNodeId, tree);
            node.parent=tmp;
            tmp.children=[...tmp.children,node];            
            state.rootNode=tree;
            state.currentNodeObj=searchNode(currentNodeId,state.rootNode);
        },

        setCurrentNode(state,action){          
            let id= action.payload;
            let obj= searchNode(id,state.rootNode);
            let listLength=state.history.lists.length;            
            state.currentNode=id;         
            state.currentNodeObj=obj;                 
            if(state.history.currentNode!==listLength-1){                
                if(state.history.lists[state.history.currentNode+1]!==id){
                    state.history.lists.splice(state.history.currentNode+1,listLength,id);
                } 
            } else{           
                state.history.lists.push(id);
            }  

            state.history.currentNode+=1;
        },

        handleTraverse(state,action){
            
            let dir= action.payload;
            let id;
            if(dir==='forward'){
                if(state.history.currentNode+1>=state.history.lists.length){
                    return
                }
                id= state.history.lists[state.history.currentNode + 1];
                state.history.currentNode+=1;
            } else if(dir==='back'){
                if(state.history.currentNode-1<0){
                    return
                }
                id= state.history.lists[state.history.currentNode-1];
                state.history.currentNode-=1;
            }
            
            let obj= searchNode(id,state.rootNode);
            state.currentNode=id;         
            state.currentNodeObj=obj;
        },       
    }
})

export default nodeSlice.reducer;
export const {addRootNode,addNode,setCurrentNode,handleTraverse}= nodeSlice.actions;