import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
// eslint-disable-next-line
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
// eslint-disable-next-line
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
// eslint-disable-next-line
import MicOffIcon from '@mui/icons-material/MicOff';
// eslint-disable-next-line
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import db, { auth } from "../firebase";

function Sidebar() {

    // eslint-disable-next-line no-unused-vars
    function checkChannelName(e) {

        var tecla = (document.all)? e.keyCode : e.which;

        if (tecla === 8) {
            return true;
        }

        var patron = /[A-Za-z0-9]/;
        var tecla_final = String.fromCharCode(tecla);
        return patron.test(tecla_final);

    }

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [seeChannels, setSeeChannels] = useState(true);

    useEffect(() => {
            onSnapshot(collection(db, "channels"), (snapshot) => (
                setChannels(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data()
                })))
            ))
    }, [seeChannels]);

    const hideChannels = () => {

        setSeeChannels(!seeChannels);

    }

    const handleAddChannel = () => {

        const channelName = prompt("Introduce un nombre");

        if (channelName) {

            addDoc(collection(db, 'channels'), {
                channelName: channelName,
            });

        }

    }

    return (
        <div className="sidebar">

            <div className="sidebar__top">
                <h3>First Server</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header" onClick={hideChannels}>
                        {seeChannels?<ExpandMoreIcon />:<ChevronRightIcon />}
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__ChannelsList">
                    {seeChannels?channels.map(({id, channel}) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    )):null}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar_voiceSignalIcon" fontSize="large"/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName?user.displayName:"@CLR"}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>

        </div>
    );
}

export default Sidebar;