import React from "react";
import {  Popup } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
const PopupHelp = ({ message, trigger, header }) => (
  <Popup
    content={message}
    header={header}
    trigger={
      <span className="help-text">{trigger}<HelpOutlineOutlinedIcon fontSize="x-small"/></span> 
    }
    
  />
);


export default PopupHelp;