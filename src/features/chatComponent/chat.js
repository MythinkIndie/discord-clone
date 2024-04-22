/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from "./chatHeader.js";
import Message from "./message.js";
import "./chat.css";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { selectChannelId, selectChannelName, setChannelInfo } from "../user/appSlice.js";
import { selectUser } from "../user/userSlice.js";
import db from "../firebase.js";
// eslint-disable-next-line no-unused-vars
import { Timestamp, addDoc, collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"; 

function Chat() {

    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        if (channelId) {
            
            const collectionMessages = collection(doc(collection(db, "channels"), channelId), "messages");
            const q = query(collectionMessages, orderBy('timestamp', 'asc'));

            onSnapshot(q, (snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));

        } else {
        
            //Canal forzado, hay que dejar registro en el user para saber donde estuvo la ultima vez
            //Si es la primera vez, no apareceran servidores, pero al entrar a uno, se le pondrá el primer canal que se encuentre
            dispatch(setChannelInfo({channelId: 'BcKSlM9nzGMQSxIoox7G', channelName: 'HolaMundo'}));

        }
        
    }, [channelId]);

    

    const sendMessage = e => {
        e.preventDefault();

        addDoc(collection(doc(collection(db, "channels"), channelId), "messages"), {
            timestamp: Timestamp.fromDate(new Date()), 
            message: input,
            user: user
        });

        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader key={channelId} channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message, index) => (
                    <Message 
                        key={index}
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}/>
                ))}
            </div>

            <div className="chat__input">
                <div className="chat__inputIcons">
                    <AddCircleOutlinedIcon fontSize="large"/>
                </div>
                <form>
                    <input 
                        type="text"
                        value={input}
                        disabled={!channelId}
                        onChange={e => setInput(e.target.value)} 
                        placeholder={`Message #${channelName}`}/>
                    <button 
                        disabled={!channelId}
                        onClick={sendMessage}
                        className="chat__inputButton" 
                        type="submit">Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <GifOutlinedIcon fontSize="large"/>
                    <AddPhotoAlternateIcon fontSize="large"/>
                </div>
            </div>
        </div>
    );

}

export default Chat