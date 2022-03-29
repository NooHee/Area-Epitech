import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppBar, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { auth } from "../firebase";
import { useEffect } from "react";

const Settings = () => {
    const user = useContext(UserContext);
    const [services, setServices] = useState([]);


    const addDiscordBot = () => {
        window.open('https://discord.com/api/oauth2/authorize?client_id=939165648553144391&permissions=8&scope=bot', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=900, height=600, top=100, left=200")
    }

    const getServices = async () => {
        var res = await fetch(`http://localhost:8081/get-keys?uid=${user.uid}`)
        var js = await res.json()
        if (!js.spotify || !js.reddit)
            return
        var arr = [js.spotify, js.reddit];
        setServices(arr);
    }

    const updateKey = async (service, key) => {
        await fetch(`http://localhost:8081/set-key?uid=${user.uid}&service=${service}&key=${key}`)
    }

    const clearKey = async (service) => {
        await fetch(`http://localhost:8081/clear-key?uid=${user.uid}&service=${service}`)
        window.location.reload(false);
    }

    useEffect(() => {
        window.addEventListener('message', event => {
            if (event.origin.startsWith('http://localhost:8080')) {
                var content = JSON.parse(event.data)
                if (!content.error_description) {
                    if (content.service === 'spotify' || content.service === 'reddit')
                        updateKey(content.service, content.access)
                    window.location.reload(false)
                } else {
                    alert('Error: ' + content.error_description)
                }
            } else {
                return;
            }
        });
        getServices();
    }, [])


    function handleSubSpotify() {
        window.open('https://accounts.spotify.com/authorize?client_id=af8bbeca37274f82bf1234b019db122b&redirect_uri=http://localhost:8080/auth/spotify&response_type=code&scope=user-read-private%20user-read-email&show_dialog=true', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=600, height=700, top=100, left=100")
    }

    function handleSubReddit() {
        window.open('https://www.reddit.com/api/v1/authorize?client_id=B4jjSHqhYnNU0Ql1YzQvGw&response_type=code&state=area&redirect_uri=http://localhost:8080/auth/reddit&duration=permanent&scope=identity mysubreddits vote read submit subscribe account', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=600, height=700, top=100, left=100")
    }



    /* const CustomButtonRoot = styled('button')`
        font-family: IBM Plex Sans, sans-serif;
        font-weight: bold;
        font-size: 0.875rem;
        background-color: ${blue[500]};
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        transition: all 150ms ease;
        cursor: pointer;
        border: none;

        &:hover {
            background-color: ${blue[600]};
        }

        &.active {
            background-color: ${blue[700]};
        }

        &.focusVisible {
            box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
            outline: none;
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
 */


    /* function getButton(name, isdisabled) {
        if (isdisabled !== '') {
            return (
                <LoadingButton
                    style={{ color: '#FFFFFF', backgroundColor: '#3D3B30' }}
                    onClick={handleClick}
                    endIcon={<DoneIcon />}
                    variant="contained"
                    disabled
                > {name + ' Linked'} </LoadingButton>

            )
        }
        return (
            <LoadingButton
                onClick={handleClick}
                style={{ backgroundColor: '#8388A5', color: '#FFFFFF' }}
                endIcon={<SendIcon />}
                variant="contained"
            > {'Login to ' + name} </LoadingButton>
        )
    } */

    return (
        <Container sx={{ width: 1 }} >
            <AppBar position="sticky" sx={{ borderRadius: 2, backgroundColor: '#3D3B30' }} >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {'Account: ' + user.displayName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Settings
                    </Typography>
                    <Button color="inherit" onClick={() => { window.location.href = '/' }} >Go to Panel</Button>
                    <Button color="inherit" onClick={() => { auth.signOut(); window.location.href = '/' }} >Logout</Button>
                </Toolbar>
            </AppBar>
            <br />
            {
                services && services.length === 2 ? (
                    
                    <Stack direction="column" spacing={1} maxWidth={'250px'}>

                        {services[0] ? (services[0].key === '' ? <LoadingButton
                            onClick={handleSubSpotify}
                            style={{ backgroundColor: '#8388A5', color: '#FFFFFF' }}
                            endIcon={<SendIcon />}
                            variant="contained"
                            > {'Login to Spotify'} </LoadingButton>
                            : <LoadingButton
                            style={{ color: '#FFFFFF', backgroundColor: '#3D3B30' }}
                            onClick={() => clearKey('spotify')}
                            endIcon={<CloseIcon />}
                            variant="contained"
                            > {'Spotify Linked'} </LoadingButton>) : ''}

                        {services[1] ? (services[1].key === '' ? <LoadingButton
                            onClick={handleSubReddit}
                            style={{ backgroundColor: '#8388A5', color: '#FFFFFF' }}
                            endIcon={<SendIcon />}
                            variant="contained"
                            > {'Login to Reddit'} </LoadingButton>
                            : <LoadingButton
                            style={{ color: '#FFFFFF', backgroundColor: '#3D3B30' }}
                            onClick={() => clearKey('reddit')}
                            endIcon={<CloseIcon />}
                            variant="contained"
                            > {'Reddit Linked'} </LoadingButton>) : ''}
                        <Button sx={{backgroundColor: '#7289DA', color: '#FFFFFF'}} onClick={() => addDiscordBot()}> Add Discord Bot</Button> 
                    </Stack>
                )
                    : 'Loading...'
            }

            <br />
        </Container>
    )
}

export default Settings;