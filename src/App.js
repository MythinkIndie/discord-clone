/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './features/sidebarCompnent/Sidebar';
import Chat from './features/chatComponent/chat';
import Login from './features/loginComponent/login';
import { auth } from './features/firebase.js';
import './App.css';
import { selectUser, login, logout} from './features/user/userSlice';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }));

      } else {

        dispatch(logout());

      }

    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ):(
        <>
          <Login/>
        </>
      )}
    </div>
  );
}

export default App;
