import React, { Component } from "react";
import './Notecard.scss';
import IconButton from '@mui/material/IconButton';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

class Notecard extends Component{

    constructor(){
        super();
        this.state={
            showOptions : false
        }
    }

    enableOptions = () => {
        this.setState({showOptions : true});
    }

    disableOptions = () => {
        this.setState({showOptions : false});
    }

    render(){
        return(
            <div className="note-card" onMouseEnter={()=>{this.enableOptions()}} onMouseLeave={()=>{this.disableOptions()}}>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>

                {!this.state.showOptions &&( 
                    <div className="note-card-footer"></div>
                )}
                {this.state.showOptions && (
                    <div className="note-card-footer">
                    <IconButton><AddAlertOutlinedIcon/></IconButton>
                    <IconButton><PersonAddAltOutlinedIcon/></IconButton>
                    <IconButton><PaletteOutlinedIcon/></IconButton>
                    <IconButton><InsertPhotoOutlinedIcon/></IconButton>
                    <IconButton><ArchiveOutlinedIcon/></IconButton>
                    <IconButton><MoreVertOutlinedIcon/></IconButton></div>
                )}
            </div>
        );
    }
}

export default Notecard;