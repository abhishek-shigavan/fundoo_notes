import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import './CreateNote.scss';
import { AddNotesRequest } from '../../services/RequestService';

class CreateNote extends Component {
    constructor() {
        super();
        this.state={
            isExpanded: false,
            title: "",
            content: "",
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name] : value});
    }

    handleExpanded = () => {
        this.setState({ isExpanded : true });
    }

    submitNote = (e) => {
        this.setState({ isExpanded : false });

        const UserNote = new FormData();
        UserNote.append("title", this.state.title)
        UserNote.append("description", this.state.content)            
            
        AddNotesRequest(UserNote,"/notes/addNotes").then(res => {
            console.log(res);
            this.props.getNewCard();
        })

        
        this.setState({title: "", content: ""});
        e.preventDefault();
    }
    
    render(){
        return(
            <div>
                <form>
                    {this.state.isExpanded && (
                        <div className="note-title">
                            <div>
                                <input type="text" 
                                value={this.state.title} 
                                placeholder="Title"
                                name="title"
                                onChange={(e)=>{this.handleChange(e)}}/>
                            </div>
                            <div>
                                <IconButton><PushPinOutlinedIcon fontSize="large"/></IconButton>
                            </div>
                        </div>
                    )}
                    
                    <p>
                        <textarea
                        value={this.state.content}
                        onClick={()=>{this.handleExpanded()}}
                        name="content"
                        placeholder="Take a note..."
                        onChange={(e)=>{this.handleChange(e)}}
                        rows={this.state.isExpanded ? 4 : 1}
                        ></textarea>
                    </p>
                    {this.state.isExpanded && (
                        <div className="textarea-footer">
                            <div className="textarea-footer-icon">
                                <div className="footer-icon"><IconButton><AddAlertOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton ><PersonAddAltOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton ><PaletteOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton ><ArchiveOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton ><MoreVertOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton disabled><UndoOutlinedIcon fontSize="large" /></IconButton></div>
                                <div className="footer-icon"><IconButton disabled><RedoOutlinedIcon fontSize="large" /></IconButton></div>
                            </div>
                            <div className="footer-button"><button onClick={(e)=>{this.submitNote(e)}}>Done</button></div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

export default CreateNote;