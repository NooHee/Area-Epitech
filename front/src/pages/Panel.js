import Add from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import { auth } from "../firebase";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../providers/UserProvider';
import { Widget } from './Widget';
import { Discord_Channel_Reaction, Discord_Message4All_Reaction, Discord_Message_Reaction, Discord_PM_Reaction } from '../reactions/discord_message_reaction';
import { haltTime, onTime } from '../triggers/Time_trigger';
import { Alert, Snackbar } from "@mui/material"
import { higherThan20 } from '../triggers/Weather_trigger';
import { Cocktail_Alcoholic_Reaction, Cocktail_NonAlcoholic_Reaction } from '../reactions/cocktail_reaction';
import { isLive, stream1H, top100 } from '../triggers/Twitch_trigger';
import { isPopular, moreThan50K } from '../triggers/Spotify_trigger';
import { nbSub } from '../triggers/Reddit_trigger';
import Grid from "@mui/material/Grid";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";


function getAction(id) {
    switch (id) {
        case 'T0':
            return onTime;
        case 'T1':
            return haltTime;
        case 'W0':
            return higherThan20;
        case 'TW0':
            return isLive;
        case 'TW1':
            return stream1H;
        case 'TW2':
            return top100;
        case 'R0':
            return nbSub;
         case 'S0':
            return isPopular;
        case 'S1':
            return moreThan50K;
        default:
            break;
    }
}

function getReaction(id) {
    switch (id) {
        case 'D0':
            return Discord_Message_Reaction;
        case 'D1':
            return Discord_Message4All_Reaction;
        case 'D2':
            return Discord_Channel_Reaction;
        case 'D3':
            return Discord_PM_Reaction;
        case 'C0':
            return Cocktail_Alcoholic_Reaction;
        case 'C1':
            return Cocktail_NonAlcoholic_Reaction;
        default:
            break;
    }
}

const Panel = () => {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [amsg, setMsg] = useState('')
    const [reload, setReload] = useState(false)
    const [widgets, setWidgets] = useState([])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const createAlert = (msg) => {
        setMsg(msg);
        setOpen(true)
    }

    const callback = (val) => {
        window.location.reload(false)
    }

    const AddWidget = () => {
        var w = window.open('http://localhost:8080/create', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=600, height=900, top=100, left=400")
        w.callback = callback;
    }

    function displayWidgets(list) {
        if (!list)
            return
        var arr = list.map((arg, index) => arg = (<Widget key={index} name={index} func={getAction(arg.action)} argsA={arg.argsA} react={getReaction(arg.reaction)} argsR={arg.argsR} callback={createAlert} idA={arg.action} idR={arg.reaction} />));
        return arr
    }

    const getWidgets = async () => {
        var res = await fetch(`http://localhost:8081/get-widget?uid=${user.uid}`)
        var js = await res.json()
        var arr = displayWidgets(js.widgets);
        console.log(js.widgets);
        setWidgets(arr);
    }

    useEffect(() => {
        if (reload)
            setReload(false)
        getWidgets();
    }, [reload])

    return (
        <div>
            <AppBar sx={{ borderRadius: 2, backgroundColor: '#3D3B30'}} >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {'User  : ' + user.displayName}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Panel
                    </Typography>
                    <Button color="inherit" onClick={() => AddWidget()}> <Add /> Create</Button>
                    <Button color="inherit" onClick={() => { window.location.href = '/settings' }}> <Settings/></Button>
                    <Button color="inherit" onClick={() => { auth.signOut(); window.location.href = '/' }} > <PowerSettingsNew/></Button>
                </Toolbar>
            </AppBar>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {amsg}
                </Alert>
            </Snackbar>
            <Grid container sx={{paddingTop: 10}}>
                { widgets ? widgets : '' }
            </Grid>
        </div>
    )
}

export default Panel