import React from "react";
import "./message.css";
import { Avatar } from "@mui/material";

function Message({timestamp, user, message}) {

    return (
        <div className="message">
            <Avatar src={user.photo}/>
            <div className="message__info">
                <h4>{user.displayName}
                    <span className="message__timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    );

}

export default Message