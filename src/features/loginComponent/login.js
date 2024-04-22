/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import "./login.css";

function Login() {

    var [isLogin, setLoginRegister] = useState(false);

    const signIn = () => {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
  
      //signInWithCustomToken(auth, email, password)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          
        var user = userCredential.user;

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });

    }

    const register = () => {

      var email = document.getElementById('registerEmail').value;
      var nombreDeUsuario = document.getElementById('registerUserName').value;
      var password = document.getElementById('registerPassword').value;
      var confirmPassword = document.getElementById('registerConfirmedPassword').value;

      //createCustomToken(props)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        var user = userCredential.user;
        user.displayName = nombreDeUsuario;
        user.photoURL = 'https://th.bing.com/th/id/R.5afc2cf4d9d82d7e1ea2b1d540554e63?rik=Wafd4c9z6GSwNA&riu=http%3a%2f%2fpngimg.com%2fuploads%2ftwitch%2ftwitch_PNG48.png&ehk=sTvgbNZsrvckv%2fyzcsG5HVJEDgoVtzoJkJpUpepyHuQ%3d&risl=&pid=ImgRaw&r=0';

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

      });

    }

  return (
    <div className='login'>
      {isLogin?(
          <>
          <div className='login__logo'>
              <img src="https://th.bing.com/th/id/R.6c9affc6cc8665875f59f70f58631518?rik=0%2fEUkDAR6Qr70A&pid=ImgRaw&r=0" alt=""/>
          </div>
          <div className='login__form'>
            <input type='text' placeholder="Email..." id='email'/>
            <input type='password' placeholder="Password..." id='password'/>
          </div>
          <div>
            <p>You don't have account? <Button onClick={() => setLoginRegister(isLogin = !isLogin)}>Register</Button></p>
          </div>
          <Button onClick={signIn}>Sign in</Button>
          </>)
      :(<>
        <div className='login__logo'>
            <img src="https://th.bing.com/th/id/R.6c9affc6cc8665875f59f70f58631518?rik=0%2fEUkDAR6Qr70A&pid=ImgRaw&r=0" alt=""/>
        </div>
        <div className='login__form'>
          <input type='text' placeholder="Email..." id='registerEmail'/>
          <input type='password' placeholder="Password..." id='registerPassword'/>
        </div>
        <div>
            <p>You need to login? <Button onClick={() => setLoginRegister(isLogin = !isLogin)}>Sign in</Button></p>
          </div>
        <Button onClick={register}>Register</Button>
        </>
      )}
    </div>
  )
}

export default Login