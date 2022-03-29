
import { Selector, SelectorBis } from './pages/Selector';
import Panel from './pages/Panel'
import Settings from './pages/Settings'
import { Router } from "@reach/router";
import { Creator } from "./pages/Creator";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { Box, LinearProgress } from '@mui/material';
import CocktailAlcoholic from './pages/Cocktail';
import Spotify from './pages/Auths/spotify_auth';
import Reddit from './pages/Auths/reddit_auth';

function Home() {
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setLoading(false)
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 80);

        return () => {
            clearInterval(timer);
        };
    }, [])

    if (user && !loading) {
        return (
            <Router>
                <Panel path="/" exact />
                <Panel path="/panel" />
                <Creator path="/create" />
                <Settings path="/settings" />
                <Selector path="/add/action" />
                <SelectorBis path="/add/reaction" />

                {<Reddit path="/auth/reddit" />}
                {<Spotify path="/auth/spotify" />}

                <CocktailAlcoholic path="/reaction/cocktail" />
            </Router>
        )
    }
    else if (!user && !loading) {
        return (
            <Router>
                <SignIn path="/" />
                <SignUp path="/signup" />
            </Router>
        )
    }
    else {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        )
    }
}

export default Home