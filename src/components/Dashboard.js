import React, { Component } from "react";
import Navbar from "./Navbar/Navbar";
import './Navbar/Navbar.scss';
import { Box, AppBar, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles"
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton'
import IconButton from '@mui/material/IconButton';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import CreateNote from "./CreateNote/CreateNote";
import Notecard from "./Notecard/Notecard";
import { GetListOfNotes } from "../services/RequestService";


const drawerWidth = '19.47vw';

const openedMixin = (theme) => ({
    width: drawerWidth,
    marginTop: '9.74vh',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: '9.74vh',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

class Dashboard extends Component {
    
    constructor() {
        super();
        this.state={
            notes: [],
            drawerOpen : false,
            modalOpen: false
        }
    }

    componentDidMount() {
        // console.log("In componentDidMount");
        this.displayNotes(); 
    }

    displayNotes = () => {
        const NotesRecord = this.state.notes;
        
        GetListOfNotes("/notes/getNotesList").then((res) =>{

            if(NotesRecord.length === 0){
                res.map((newNote)=>{
                    this.setState({
                        notes: [...this.state.notes, newNote]
                    });
                })
                console.log("Initial state");
                console.log(this.state.notes);
            }
            else if(NotesRecord.length > 0){
                const id = NotesRecord.length - 1;
                res.map((newNote, index)=>{
                    if(index > id){
                        this.setState({
                            notes: [...this.state.notes, newNote]
                        });
                    }  
                })
                console.log("After new note");
                console.log(this.state.notes);
            }         
        }).catch((err) => {
            console.log(err)
        })
    }

    handleDrawerOpen = () => {
        this.setState({drawerOpen : true});
    };

    handleDrawerClose = () => {
        this.setState({drawerOpen : false});
    };

    handleModalOpen = () => {
        this.setState({modalOpen : true});
    }

    handleModalClose = () => {
        this.setState({modalOpen : false})
    }


    itemList = [{text : "Notes", icon : <LightbulbOutlinedIcon/>}, 
    {text :"Reminders", icon : <NotificationsNoneOutlinedIcon/>}, 
    {text:"Edit labels", icon : <CreateOutlinedIcon/>}, 
    {text:"Archive", icon : <ArchiveOutlinedIcon/>}, 
    {text:"Trash", icon : <DeleteOutlineIcon/>}];



    render() {
        const NotesArray = this.state.notes;
        // console.log("NotesArray ===> ",NotesArray);
        
        return(
            <Box sx={{ display: 'flex' }}>
                <AppBar color="inherit" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Navbar />
                </AppBar>
                <Drawer variant="permanent" 
                    open={this.state.drawerOpen} 
                    onMouseEnter={()=>{this.handleDrawerOpen()}} 
                    onMouseLeave={()=>{this.handleDrawerClose()}}
                >
                    <Box sx={{paddingTop: '0.8rem'}}>
                    <List>
                        {/* {this.itemList.map((item, index) => {
                            const{ text, icon } = item;
                            return(
                                <ListItem button key={text}>
                                    {icon && <ListItemIcon sx={{fontSize: '2.6rem'}}>{icon }</ListItemIcon>} 
                                    <ListItemText primary={text} />
                                </ListItem>
                            );
                        })} */}
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LightbulbOutlinedIcon sx={{fontSize : '2.6rem'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Notes" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <NotificationsNoneOutlinedIcon sx={{fontSize : '2.6rem'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Reminders" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={()=>{this.handleModalOpen()}}>
                                <ListItemIcon>
                                    <CreateOutlinedIcon sx={{fontSize : '2.6rem'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Edit Labels" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ArchiveOutlinedIcon sx={{fontSize : '2.6rem'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Archive" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DeleteOutlineIcon sx={{fontSize : '2.6rem'}}/>
                                </ListItemIcon>
                                <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '9.74vh' }}>
                    <CreateNote getNewCard={this.displayNotes} />
                    
                    {NotesArray.map((note) =>(
                        <Notecard 
                            title={note.title}
                            content={note.description}
                        />    
                    ))}
                </Box>
            </Box>
        );
    }
}

export default Dashboard;