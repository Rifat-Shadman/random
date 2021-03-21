import firebase from 'firebase';
import React, { useContext, useState } from 'react';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';

import './Login.css'
import { useForm } from 'react-hook-form';

function Login() {
    const { errors } = useForm ();
    const [newUser, setNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: ''

    })
    if (firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser)
                console.log(email, displayName, photoURL);
                
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }


    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
            })
            .catch(err => {

            })
    }

    const handleBlur = (event) => {
        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValue = event.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValue && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    
                })
                .catch(error => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const setlogger = {
                        name: res.user.displayName,
                        email: res.user.email
                    }
                    setLoggedInUser(setlogger);
                    history.replace(from);
                    console.log(loggedInUser.email);
                    console.log('sign-in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('user name updated successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {

                var credential = result.credential;

                var user = result.user;
                var accessToken = credential.accessToken;

                console.log(user, accessToken);
            })
            .catch((error) => {
                
            });
    }

    return (
        <div className="form-body" style={{backgroundColor: 'white'}}>

            <br />
            
            

            
        <div className="login-query">
            <button htmlFor="newUser" type="submit">Welcome Aboard!!!<br/>  
            <span onClick={() => setNewUser(!newUser)} name="newUser" style={{textDecoration:'underline'}}>
                 {newUser? 'Sign In' : 'Sign Up!'}</span> 
            {/* <input type="checkbox"  onClick={() => setNewUser(!newUser)} name="newUser" id="" /> */}
            </button>
        </div>
            
                
            <h1 style={{color:'black'}}> {newUser ? 'Sign Up' : 'Sign In'}</h1>
        
            <form style={{display:newUser ? 'block': 'none'}} action="" onSubmit={handleSubmit}>
                <h4 style={{color:'darkgreen'}}>{newUser? '': 'Please sign in to your account'}</h4>
                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name.." required />
                    
                }

                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Your email" required />
                {errors.email && "Email required"}
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required />
                {errors.password && "provide passwword"}
                <br />
                <input type="submit" value={newUser ? 'Register' : 'Log In'} />
                
                <button type="submit" onClick={handleGoogleSignIn}> <AiFillGoogleCircle /> Continue with google</button>
                <button type="submit" onClick={handleFbSignIn}> <AiFillFacebook/>Continue with facebook</button>

            </form>


            <form style={{display: !newUser ? 'block': 'none'}} action="" onSubmit={handleSubmit}>
                <h4 style={{color:'darkgreen'}}>Please sign in to your account</h4>
               
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Your email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="password" required />
                <br />
                <input type="submit" value={newUser ? 'Register' : 'Log In'} />

                <button type="submit" onClick={handleGoogleSignIn}> <AiFillGoogleCircle  /> Continue with google</button>
                <button type="submit" onClick={handleFbSignIn}> <AiFillFacebook  /> Continue with facebook</button>

            </form>
            
        </div>
    );
}

export default Login;
