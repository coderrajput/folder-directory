import React,{useState} from 'react'
import Node from '../model/node';
import { useDispatch,useSelector } from 'react-redux';
import DisplayNode from './DisplayNode';
import searchNode from '../utility/searchNode'
import {addNode,handleTraverse} from '../store/slice/nodeSlice'
import CreateNewFolderTwoToneIcon from '@material-ui/icons/CreateNewFolderTwoTone';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color:'black'
    },
    app:{
        backgroundColor:'#E5E5E5',
        height:'56px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-180px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modalTitle:{
        textAlign:'center',
    },
    button:{
        display:'flex',
        justifyContent:'space-around',
    }

}));



export default function Directory() {
    const classes = useStyles();
    let currentNodeId= useSelector(state=>state.nodeReducer.currentNode);
    let currentObj= useSelector(state=>state.nodeReducer.currentNodeObj);
    const dispatch= useDispatch();
    let [name,setName]=useState();
    const [open, setOpen]= useState(false);

    const onSubmit=()=>{
            handleClose();
            let node= new Node(name);
            dispatch(addNode({currentNodeId,node}));
            setName(null);
    }

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleForwardButton=(e)=>{
        e.preventDefault();
        dispatch(handleTraverse('forward'));
    }

    const handleBackButton=(e)=>{
        e.preventDefault();        
        dispatch(handleTraverse('back'));
    }
    

    return (
        <>
            <AppBar className={classes.app} position="static">

                <Toolbar>
                    <Tooltip title="back">
                        <IconButton onClick={(e)=>handleBackButton(e)}>
                            <ArrowBackIosTwoToneIcon/>
                        </IconButton>
                    </Tooltip>
                
                    <Tooltip title="next">
                        <IconButton onClick={(e)=>handleForwardButton(e)}>
                            <ArrowForwardIosTwoToneIcon/>
                        </IconButton>
                    </Tooltip>

                    <Typography variant="h6" className={classes.title}>
                        {currentObj.data}
                    </Typography>
                
                    <Tooltip title="Add new folder"> 
                        <IconButton onClick={handleOpen}>
                            <CreateNewFolderTwoToneIcon />
                        </IconButton>
                    </Tooltip>

                </Toolbar>
        </AppBar>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
        }}
        >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <p id="transition-modal-title" className={classes.modalTitle}>Enter the folder name</p>
                        <input required onChange={(e)=>setName(e.target.value)}></input>
                        <div className={classes.button}>
                            <IconButton aria-label="delete" onClick={handleClose}>
                                <CancelPresentationTwoToneIcon />
                            </IconButton>

                            <IconButton  disabled={!name} onClick={()=>onSubmit()}>
                                <AddBoxTwoToneIcon />
                            </IconButton>
                        </div>
                    </div>
                </Fade>
        </Modal>
        <DisplayNode obj={currentObj} />
    </>
    )
}
