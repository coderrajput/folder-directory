import React from 'react'
import { useDispatch } from 'react-redux'
import {setCurrentNode} from '../store/slice/nodeSlice';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import Grid from '@material-ui/core/Grid';



export default function DisplayNode(props) {

    const dispatch=useDispatch();
    const handleSelect= (id)=>{
        dispatch(setCurrentNode(id))
    }
    return (
        <>
            <Grid container spacing={1}>            
                {props.obj.children.length>0 ? props.obj.children.map(el=>
                <React.Fragment key={el.id}>          
                <Grid style={{cursor: "pointer"}} item xs={4} sm={4} md={2} lg={2} xl={2}   onClick={()=>handleSelect(el.id)}>
                    <p><FolderOpenTwoToneIcon  fontSize="large"/></p>
                    <p style={{marginTop: "-20px"}}>{el.data}</p>
                </Grid>
                </React.Fragment>) : null
                }
            </Grid>
            {props.obj.children.length<=0 ? <p>Folder is empty</p>: null}
        </>                    
    )
}
