import React from "react";
import './chatHeader.css';

import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function ChatHeader({channelName}) {



    return (
        <div className="chatHeader">
           <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">#</span>
                    { channelName }
                </h3>
           </div>

           <div className="chatHeader__right">
                <NotificationsIcon />
                <PeopleIcon />

                <div className="chatHeader__search">
                    <input placeholder="Search..." />
                    <SearchIcon />
                </div>

                <SendIcon />
                <InfoOutlinedIcon />
           </div>
        </div>
    );

}

export default ChatHeader