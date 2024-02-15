import React from "react";
import "../App.css";
import { Typography } from "@mui/material";

const ChatMsg = (props) => {
    return (
        <Typography
            className="scenario-message"
            style={{ backgroundColor: props.color,  border: '2px solid rgba(255, 255, 255)' }}
        >
            {props.msg}
        </Typography>
    );
};

export default ChatMsg;