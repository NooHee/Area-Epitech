import {useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserContext } from "../providers/UserProvider";

function Application() {
    const user = useContext(UserContext);
    return (
        user ? <Panel /> :
            <Router>
                <SignUp path="signup" />
                <SignIn path="/" />
            </Router>

    );
}

export default Application;