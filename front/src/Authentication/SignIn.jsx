import { Link } from "@reach/router";
import React, { useState } from "react";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import './SignIn.css'


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            console.log(email, password)
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === 'userEmail') {
            setEmail(value);
        }
        else if (name === 'userPassword') {
            setPassword(value);
        }
    };

    return (
        <div className="login">
            <div className="login__container">
                <h1>Sign In</h1>
                <form className="login__container">
                    <label htmlFor="userEmail" className="block">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="login__textBox"
                        name="userEmail"
                        value={email}
                        placeholder="email"
                        id="userEmail"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="login__textBox"
                        name="userPassword"
                        value={password}
                        placeholder="password"
                        id="userPassword"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <button
                        className="login__btn"    
                        onClick={(event) => {
                        signInWithEmailAndPasswordHandler(event, email, password)
                    }}>
                        Sign in
                    </button>
                </form>
                <p className="text-center my-3">or</p>
                <button
                    className="login__google login__btn"
                    onClick={() => {
                        signInWithGoogle();
                    }}
                >
                    Sign in with Google
                </button>
                <p className="login__container">
                Don't have an account?
                <br />
                <Link to="signup" onClick={() => setTimeout(() => { window.location.reload(); }, 200)}>
                    Sign up here
                </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default SignIn;