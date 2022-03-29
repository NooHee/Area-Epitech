import { Link, /* , useNavigate */ } from "@reach/router";
import React, { useState } from "react";
import { auth, generateUserDocument } from "../firebase";
import { signInWithGoogle } from "../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    var error = null;

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await generateUserDocument(user, username );
            window.location.href = '/'
            return;
        }
        catch (error) {
            alert(error);
        }
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setUsername(value);
        }
    };

    /* const handleGoogleSignin = () => {
        try {
            signInWithGoogle();
            window.location.href = '/'
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    } */

    return (
        <div className="login">
            <div className="login__container">
                <h1>Sign Up</h1>
                {error ? { error } : ''}
                <form className="login__container">
                    <label htmlFor="displayName" className="block">
                        Display Name:
                    </label>
                    <input
                        type="text"
                        className="login__textBox"
                        name="displayName"
                        placeholder="Username"
                        id="displayName"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userEmail" className="block">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="login__textBox"
                        name="userEmail"
                        placeholder="Email"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="login__textBox"
                        name="userPassword"
                        placeholder="Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    <button
                        className="login__btn"
                        onClick={(event) => {
                            createUserWithEmailAndPasswordHandler(event, email, password);
                        }}>
                        Sign up
                    </button>
                </form>
                <p className="text-center my-3">or</p>
                { <button
                    className="login__google login__btn"
                    onClick={() => {
                        signInWithGoogle();
                    }} 
                    >
                    Sign In with Google
                </button> }
                {"Already got an Account ?"}
                <br />
                <Link to="/"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => setTimeout(() => { window.location.reload(); }, 200)}>
                    Go back to sign in
                </Link>
            </div>
        </div>
    );
};

export default SignUp;